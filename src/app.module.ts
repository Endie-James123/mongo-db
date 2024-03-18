import { Module } from '@nestjs/common';
import { AutomobileModule } from './automobile/automobile.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    AutomobileModule,
    AuthModule,
  ],
})
export class AppModule {}
