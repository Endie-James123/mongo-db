import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoDocument = HydratedDocument<Auto>;

@Schema()
export class Auto {
  @Prop()
  name: string;

  @Prop()                                                                                                                                                                             
  brand: string;

  @Prop()
  engineType: string;

  @Prop()
  isManual: boolean;

  @Prop()
  price: number;
}

export const AutoSchema = SchemaFactory.createForClass(Auto);
