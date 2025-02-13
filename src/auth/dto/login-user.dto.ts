import { IsEmail, MinLength } from "class-validator";

export class LoginUserDto {

    @MinLength(6)
    password: string;

    @IsEmail()
    email: string;
};