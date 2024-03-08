import { Module } from '@nestjs/common';
import { AutomobileModule } from './automobile/automobile.module';
import { databaseModule } from './database/dababase.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    AutomobileModule,
  ],
  controllers: [], 
  providers: [],
})
export class AppModule {}
