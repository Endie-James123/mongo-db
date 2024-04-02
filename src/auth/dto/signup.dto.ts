import { IsEmail, IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
export class SignupDto {
  //The code we have below is the validation. The validation will help us set rules for what we want and what we dont want in our database

  @IsNotEmpty() //This ensures that we dont send empty data to the database
  @MinLength(3, { message: 'Name must not be less than 3 characters' }) //this ensures that mininum characters to be sent to the database is not less than 3
  @MaxLength(15, { message: 'Name must not be more than 15 characters' }) //this ensures that maximum characters to be sent to the database is not more than 15
  name: string;

  @IsNotEmpty() //This ensures that we dont send empty data to the database
  password: any;

  @IsEmail({},{message:'Please enter a correct email'}) //his ensures that we dont send empty data to the database
  email: string;

  @IsNotEmpty() //This ensures that we dont send empty data to the database
  @IsNumber() //This ensures that the price is a number(not a string or boolean)
  age: number;
}
