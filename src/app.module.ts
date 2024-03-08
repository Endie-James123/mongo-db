import { Module } from '@nestjs/common';
import { AutomobileModule } from './automobile/automobile.module';
import { databaseModule } from './database/dababase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    databaseModule,
    AutomobileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
