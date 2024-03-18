import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class loginDto {
  //The code we have below is the validation. The validation will help us set rules for what we want and what we dont want in our database

  @IsNotEmpty() //This ensures that we dont send empty data to the database
  password: any;

  @IsEmail({},{message:'Please enter a correct email'}) //his ensures that we dont send empty data to the database
  email: string;
}
