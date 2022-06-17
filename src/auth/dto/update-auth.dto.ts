import { PartialType } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class UpdateAuthDto extends PartialType(LoginUserDto) {}
