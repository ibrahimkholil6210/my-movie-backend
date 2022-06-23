import {  IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @MaxLength(16)
    @MinLength(6)
    password: string;
}
