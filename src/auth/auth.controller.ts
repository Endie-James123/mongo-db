import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Delete, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { loginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Request } from "express";
import { AgeGuard } from './guards/age.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //route to sign up a new user
  @Post('signup')//its a post request with route 'signup'
  async create(@Body() payload:SignupDto) {
    return this.authService.RegisterUser(payload);
  }

  //route to login an existing user
  @HttpCode(HttpStatus.OK) 
  @Post('login')//its a post request with route 'login'
  signIn(@Body() payload:loginDto) {
    return this.authService.signIn(payload);
  }

  //route to get all users from the database
  @UseGuards()
  @Get('getAllUsers') //It's a get request to get all users from the database
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  //route to get all blocked users from the blocked users array
  @Get('getAllBlockedUsers') //It's a get request to get all blocked users from the blocked users array
  getAllBlockedUsers() {
    return this.authService.getAllBlockedUsers();
  }

  @Get('getOne/:name')
  async findName(@Param('name') name: string) {
    return await this.authService.getOne(name);
  }
  @Patch('UpdateUser/:name')
  async UpdateUserByName(@Param('name') name: string, @Body() payload:SignupDto) {
    return await this.authService.UpdateUserByName(name, payload);
  }

  @Delete('deleteUser/:name')
  async deleteProductByName(@Param('name') name: string) {
    return await this.authService.deleteOneUser(name);
  }
}
