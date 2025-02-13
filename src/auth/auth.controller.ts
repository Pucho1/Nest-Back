import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuards } from './guards/auth-guards.guard';
import { UserLogin } from './interfaces/user-login';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  };

  @Post('/login')
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  };

  @Post('/register')
  register(@Body() RegisterDto: RegisterDto) {
    return this.authService.register(RegisterDto);
  };

  @UseGuards( AuthGuards ) 
  @Get()
  findAll(@Request() req: Request) {
    // const user = req['user'];
    // return user;

    return this.authService.findAll();
  };

  @UseGuards( AuthGuards )
  @Get('check-token')
  checkToken(@Request() req: Request): UserLogin {
    const user = req['user'];

    return {
      user:  user,
      token: this.authService.tokentPaiload( { id: user.id } ),
    };
  };

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // };

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // };

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // };
};
