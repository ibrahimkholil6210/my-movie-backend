import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
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
    const findUserByEmail = await this.usersService.findOneByEmail(loginUserDto.email)

    console.log(findUserByEmail)

    findUserByEmail.checkPassword(loginUserDto.password)
    
  }

  async validateUserByJwt(payload: JwtPayload): Promise<JwtResponse> {
    let user = await this.usersService.findOneByEmail(payload);

    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(user) {
    let data: JwtPayload = {
      email: user.email,
    };

    let jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
