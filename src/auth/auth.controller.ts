import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuards } from './guards/auth-guards.guard';
import { UserLogin } from './interfaces/user-login';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: UserService) {}

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
  @Get('/check-token')
  checkToken(@Request() req: Request): UserLogin {
    const user = req['user'];

    return {
      user:  user,
      token: this.authService.tokentPaiload( { id: user._id.toString() } ),
    };
  };

  @Post('/check-email')
  findOne(@Body() email: CheckEmailDto) {
    return this.authService.findOneEmail(email);
  };
};
