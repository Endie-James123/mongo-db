import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SignupDocument = HydratedDocument<Signup>;

@Schema({
  timestamps: true,
})
export class Signup {
  @Prop()
  name: string;

  @Prop()                                                                                                                                                                             
  password: string;

  @Prop()
  email: string;
}

export const SignupSchema = SchemaFactory.createForClass(Signup);
