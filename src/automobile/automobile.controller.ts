import { Body, Controller, Post } from '@nestjs/common';
import { AutomobileService } from './automobile.service';
import { AutoDto } from 'src/dto/auto.dto';

@Controller('automobile')
export class AutomobileController {
    constructor(private readonly AutoService:AutomobileService) {}
    @Post('add')
  async createProduct(@Body() payload: AutoDto) {
    return await this.AutoService.addAuto(payload);
  }
}
