import { Body, Controller, Post, Get, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user';
import { User } from './users.interface';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(@Body(ValidationPipe) createUserDto:CreateUserDto): Promise<User>{
    return this.usersService.createUser(createUserDto);
  }

  @Get('testGuard')
  @UseGuards(AuthGuard('jwt'))
  testAuthRoute(@Request() req){
      return {
          message: 'You did it!'
      }
  }
}
