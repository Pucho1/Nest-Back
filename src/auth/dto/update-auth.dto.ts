import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

        @IsString()
        name: string;
    
        @MinLength(6)
        password: string;
    
        @IsEmail()
        email: string;

        @IsBoolean()
        isActive: boolean;
}
