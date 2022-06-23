import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.validateUserByPassword(loginUserDto);
  }
}
