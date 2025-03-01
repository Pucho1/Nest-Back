import { IsBoolean, IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

	@IsString()
	name: string;

	@MinLength(6)
	password: string;

	@IsEmail()
	email: string;
	
	@IsBoolean()
	isActive?: boolean;
};
