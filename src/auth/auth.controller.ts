import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Request } from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //route to sign up a new user
  @Post('signup')//its a post request with route 'signup'
  create(@Body() payload:SignupDto) {
    return this.authService.RegisterUser(payload);
  }

  @HttpCode(HttpStatus.OK) 
  @Post('login')
  signIn(@Body() payload:loginDto) {
    return this.authService.signIn(payload);
  }

  @UseGuards(AuthGuard)
  @Get('getAllUsers')
  getAllUsers() {
    return this.authService.getAllUsers();
  }
}
