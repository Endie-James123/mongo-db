import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Signup } from './Schemas/auth.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './dto/Update.dto';

@Injectable()
export class AuthService {
  private readonly blockedUsers: Signup[] = [];
  constructor(
    @InjectModel('Signup') private SignupModel: Model<Signup>,
    private jwtService: JwtService,
  ) {}
  //SIGN-UP(Registering a new user)
  //async: This keyword indicates that the function is asynchronous, meaning it can perform operations that may take some time to complete, such as accessing a database or making HTTP requests.
  async RegisterUser(payload: SignupDto) {
    //Destructuring the payload
    const { password, email, age, ...rest } = payload; //The ...rest syntax gathers any remaining properties into a new object called rest
    const hashedPassword = await bcrypt.hash(password, 10);
    const findEmail = await this.SignupModel.findOne({ email });
    //the code that checks if the user is up to 18yrs
    if (age < 18) {
      //the code below pushes the user to the blocked-users array
      this.blockedUsers.push(payload);
      //the error to throw to the user
      throw new UnauthorizedException('You must be atleast 18 years old ');
    }

    //the code belows checks if the user's email has already been registered in the database
    if (findEmail) {
      //Error to throw if the email already exists in the database
      throw new UnauthorizedException('Email already exists in the database');
    }
    //the code below checks if the user's email has been blocked
    const findEmailInBlockedUsers = this.blockedUsers.find(
      (user) => user.email === email,
    );
    if (findEmailInBlockedUsers) {
      //if found in the BlockedUsers array, deny access and throw reason for access denial
      throw new UnauthorizedException(
        'This Email is blocked due to underage, trying signing up with another email',
      );
    }
    //if user has passed all the required permissions and elligible go ahead and register the user
    const Register = new this.SignupModel({ password: hashedPassword, email, ...rest,
    }); 
    const Registered = Register.save();
    return Registered;
  }

  //Sign In (logging in an already existing user)
  async signIn(payload: loginDto) {
    // Refactoring the payload
    const { email, password } = payload;

    // Using the user's email to check if the user exists in the database
    const findUser = await this.SignupModel.findOne({ email });

    // Check if user doesn't exists
    if (!findUser) {
      //error to throw if user doesn't exist
      throw new NotFoundException('User not found');
    }

    // Checking if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, findUser.password);

    //If Password doesn't match...
    if (!passwordMatch) {
      // Error to throw if the password does not match the password stored in the database
      throw new UnauthorizedException('Incorrect password');
    }

    // Creating a variable to hold the found user
    const tokenHolder = { email: findUser.email, userId: findUser._id };

    // Assigning the token to the user
    const access_token = await this.jwtService.signAsync(tokenHolder);

    // Returning the access token and a login successful message
    return {
      message: `${findUser.name} is logged in successfully`,
      access_token: access_token,
    };
  }

  //Logic to get all Users


  //Logic to get all Blocked users from the BlockedUsers array
  async getAllBlockedUsers() {
    try {
      const findAll = this.blockedUsers;
      return findAll;
    } catch (theError) {
      throw new NotFoundException('Could not get all BlockedUsers');
    }
  }


  //Logic to Delete a user
  async deleteOneUser(name: string) {
    const deleted = await this.SignupModel.deleteOne({ name: name });
    if (!deleted) {
      throw new NotFoundException(`${name} not found`);
    }
    return { status: 200, message: `${name} was deleted successfully` };
  }

  //Method to get One user
  async getOne(name: string) {
    //code below looks for the user in the database
    const findOne = await this.SignupModel.findOne({ name: name });
    //If the user is found
    if (findOne) {
      //Returns the user
      return findOne;
    }
    //If the user is not found throw NotFoundException
    throw new NotFoundException(`${name} not found`);
  }

  //Logic to Update user by name, hashed the new password if changed, if users age less than 18 upon Update throw error
  async UpdateUserByName(name: string, payload: Partial<UpdateDto>){//The Partial type allows some fields of UpdateDto to be optional. 
    //Code below uses the users name to search for the user in the database
    const findOne = await this.SignupModel.findOne({ name: name });
    //If the user is NOT found....
    if (!findOne) {
      //Throw NotFoundException
      throw new NotFoundException(`${name} not found`);
    }//else...... continue with the rest of the logic

    //Code below updates the user's data with the new values provided in the payload.
    Object.keys(payload).forEach((key) =>  {
      findOne[key] = payload[key];
    });
    //If user updates his password....
    if (payload.password) {
      //Code below hashes the new password
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      payload.password = hashedPassword;
    }
    //If User updates his age, and its not up to 18....
    if (payload.age < 18) {
      //Throw UnauthorizedException
      throw new UnauthorizedException('User must be atleast 18 years old ');
    }//else...... Continue with the rest of the logic

    //code below merges the updated payload with the existing user data in findOne
    Object.assign(findOne, payload);
    //code below saves the updated user data in the database
    const updated = await findOne.save();
    //Code below returns successful message and the users new data
    return {
      message: `${findOne.name} updated successfully`,
      NewData: updated,
    };
  }


  async getAllUsers(){
    const users = await this.SignupModel.find()
    if(users){
      return users
    }
    throw new NotFoundException(`Could not find all users`)
  }
}

