import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://endiejames123:pass1@cluster0.od5upzb.mongodb.net/Automobiles',
    ),
  ],
})
export class databaseModule {}
 