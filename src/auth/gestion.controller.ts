import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';

import { AuthGuards } from 'src/auth/guards/auth-guards.guard';
import { UserService } from 'src/auth/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-auth.dto';

@Controller('users')
export class GestionController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-user')
  create(@Body() createGestionDto: CreateUserDto) {
    return this.userService.create(createGestionDto);
  };

  // @UseGuards( AuthGuards ) 
  @Get()
  findAll(@Request() req: Request) {
    // const user = req['user'];
    // return user;
    return this.userService.findAll();
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGestionDto: UpdateUserDto) {
    return this.userService.update(id, updateGestionDto);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.userService.removeById(id);
  }
}
