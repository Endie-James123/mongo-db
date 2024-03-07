import { Module } from '@nestjs/common';
import { AutomobileService } from './automobile.service';
import { AutomobileController } from './automobile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auto, AutoSchema } from 'src/schema/auto.shema';

@Module({
  imports:[MongooseModule.forFeature([{name:Auto.name,schema:AutoSchema}])],
  providers: [AutomobileService],
  controllers:[AutomobileController]
})
export class AutomobileModule {}
