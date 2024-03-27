import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Signup } from './Schemas/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
 
@Injectable()
export class AuthService {
  constructor(@InjectModel("Signup") private SignupModel: Model<Signup>,
  private jwtService: JwtService) {}
 
  //SIGN-UP(Registering a new user) 
  async RegisterUser(payload:SignupDto){
    const {password, email, ...rest} = payload
    const hashedPassword = await bcrypt.hash(password, 10)
    const findEmail = await this.SignupModel.findOne({email})
    if(findEmail){
      throw new UnauthorizedException("Email already exists")
    }
    const Register = new this.SignupModel({password:hashedPassword, email, ...rest});
    Register.save();
    delete findEmail.password;
    return Register

  }

  //Sign In (logging in an already existing user)
  async signIn(payload:loginDto) {
    //refactoring the payload
    const { email, password} = payload;
    //Using the users email to Check if the user exists in the database
    const findUser = await this.SignupModel.findOne({email});
    //checking if the users password matches the password stored in the database
    if (findUser?.password !== password) {
      //error to throw if the password/email does not match the password/email stored in the database
      throw new UnauthorizedException('Invalid password or email');
    }
    //creating a variable to hold the found user
    const tokenHolder = {email:findUser.email, userId:findUser._id};
    //assigning the token to the user
    const access_token = await this.jwtService.signAsync(tokenHolder)
    //returning the access token and a mess
    return {
      message: `${findUser.name} is Logged in successfully`,
      access_token:access_token,

    };
  } 
  async getAllUsers(){
    try {
      const findAll = await this.SignupModel.find();
      return findAll;
    } catch (theError) {
      throw new NotFoundException('Could not find all users');
    }
  }
}
