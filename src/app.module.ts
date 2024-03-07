import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutomobileModule } from './automobile/automobile.module';
import { databaseModule } from './database/dababase.module';

@Module({
  imports: [
    databaseModule,
    AutomobileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
