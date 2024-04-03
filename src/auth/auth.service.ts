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
  //async: This keyword indicates that the function is asynchronous, meaning it can perform operations that may take some time to complete, such as accessing a database or making HTTP requests.
  async RegisterUser(payload:SignupDto){
    const {password, email, ...rest} = payload//The ...rest syntax gathers any remaining properties into a new object called rest
    const hashedPassword = await bcrypt.hash(password, 10)
    const findEmail = await this.SignupModel.findOne({email})
    if(findEmail){
      throw new UnauthorizedException("Email already exists")
    }
    const Register = new this.SignupModel({password:hashedPassword, email, ...rest})
    const Registered = Register.save()
    return Registered
  }

  //Sign In (logging in an already existing user)
  async signIn(payload: loginDto) {
    // Refactoring the payload
    const { email, password } = payload;

    // Using the user's email to check if the user exists in the database
    const findUser = await this.SignupModel.findOne({ email });

    // Check if user exists
    if (!findUser) {
        throw new UnauthorizedException('User not found');
    }

    // Checking if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, findUser.password);

    if (!passwordMatch) {
        // Error to throw if the password does not match the password stored in the database
        throw new UnauthorizedException('Invalid password');
    }

    // Creating a variable to hold the found user
    const tokenHolder = { email: findUser.email, userId: findUser._id };

    // Assigning the token to the user
    const access_token = await this.jwtService.signAsync(tokenHolder);

    // Returning the access token and a message
    return {
        message: `${findUser.name} is logged in successfully`,
        access_token: access_token,
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

  async blockEmail(email: string): Promise<void> {
    try {
      // Create a new user record with the provided email address and mark it as blocked
      await this.SignupModel.create({ email, blockedEmail: true });
    } catch (error) {
      // Handle any errors that occur during the process
      throw new Error(`Failed to block email: ${error.message}`);
    }
  }
}
