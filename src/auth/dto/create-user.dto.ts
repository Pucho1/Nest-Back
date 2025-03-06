import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

	@IsString()
	name: string;

	@MinLength(6)
	password: string;

	@IsEmail()
	email: string;
	
	@IsBoolean()
	@IsOptional()
	isActive?: boolean;

	@IsString()
	@IsOptional()
	imageUrl?: boolean;

	@IsString()
	@IsOptional()
	phonNunber?: boolean;

	@IsBoolean()
	@IsOptional()
	IsAdmin?: boolean;
};
