import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AutomobileService } from './automobile.service';
import { AutoDto } from 'src/dto/auto.dto';

@Controller('automobile')
export class AutomobileController {
  constructor(private readonly AutoService: AutomobileService) {}

  //Route to add a new automobile
  @Post('add')
  async createProduct(@Body() payload: AutoDto) {
    return await this.AutoService.addAuto(payload);
  }

  //Get product by name
  @Get('getAutomobileByName/:name')
  async findName(@Param('name') name: string) {
    return await this.AutoService.getAutomobileByName(name);
  }

  //Route to get all the automobiles
  @Get()
  findAllAutomobiles() {
    return this.AutoService.getAllAuto();
  }

  //Route to update an existing automobile
  @Patch(':name/updateAutomobile')
  async updateProductByName(
    @Param('name') name: string,
    @Body() payload: AutoDto,
  ) {
    return await this.AutoService.updateProductByName(name, payload);
  }

  //Route to delete an automobile by name
  @Delete('deleteautomobile/:name')
  async deleteProductByName(@Param('name') name: string) {
    await this.AutoService.deleteByName(name);
  }
}
