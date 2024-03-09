import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutomobileService } from './automobile.service';
import { AutoDto } from 'src/dto/auto.dto';

@Controller('automobile')
export class AutomobileController {
    constructor(private readonly AutoService:AutomobileService) {}

    //Route to add a new automobile
    @Post('add')
  async createProduct(@Body() payload: AutoDto) {
    return await this.AutoService.addAuto(payload);
  }

  //Route to get all the automobiles
  @Get()
  findAllAutomobiles(){
    return this.AutoService.getAllAuto();
  }
}
