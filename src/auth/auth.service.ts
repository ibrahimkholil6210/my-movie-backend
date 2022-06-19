import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtResponse } from './interfaces/jwt-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(loginUserDto: LoginUserDto): Promise<JwtResponse> {
    const findUserByEmail = await this.usersService.findOneByEmail(loginUserDto)

    console.log(findUserByEmail)
    if (!findUserByEmail) {
      throw new HttpException("Credentials didn't match", HttpStatus.NOT_FOUND);
    }

    const comparePassowrd = await bcrypt.compare(loginUserDto.password, findUserByEmail.password)
    if (!comparePassowrd) {
      throw new HttpException("Credentials didn't match", HttpStatus.NOT_FOUND);
    }

    
    const token = this.jwtService.sign({ id: findUserByEmail?._id, email: findUserByEmail?.email, userName: findUserByEmail?.userName })

    return {
      expiresIn: 3600,
      token
    }
    
  }

  async validateUserByJwt(payload: JwtPayload): Promise<boolean | HttpException> {
    let user = await this.usersService.findOneById(payload?.id);

    if (user) {
      return true
    } else {
      throw new UnauthorizedException();
    }
  }

  // createJwtPayload(user) {
  //   let data: JwtPayload = {
  //     email: user.email,
  //   };

  //   let jwt = this.jwtService.sign(data);

  //   return {
  //     expiresIn: 3600,
  //     token: jwt,
  //   };
  // }
}
