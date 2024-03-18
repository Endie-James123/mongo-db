import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() payload:SignupDto) {
    return this.authService.RegisterUser(payload);
  }

  @HttpCode(HttpStatus.OK)
  @Get('login')
  signIn(@Body() payload:loginDto) {
    return this.authService.signIn(payload);
  }
}
