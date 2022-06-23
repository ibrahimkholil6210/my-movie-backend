import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(18)
    readonly password: string;
    @IsNotEmpty()
    readonly userName: string;
}