import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) { 

	@IsOptional()
	StoresClient?: string[];

	@IsNumber()
	@IsOptional()
	conectedTime?: number | null;

	@IsString()
	@IsOptional()
	roles: string;
};
