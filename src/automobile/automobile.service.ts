import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoDto } from 'src/dto/auto.dto';
import { Auto } from 'src/schema/auto.shema';

@Injectable()
export class AutomobileService {
  constructor(@InjectModel(Auto.name) private authModel: Model<Auto>) {}

  //Method to add auto
  async addAuto(payload: AutoDto){
    const saveAuto = new this.authModel(payload);
    return await saveAuto.save();
  }

  //Method to get all auto
  async getAllAuto(){
    try{
      const findAll = await this.authModel.find();
      return findAll;
    }catch(theError){
      throw new NotFoundException('Could not find all autos');
    }
  }
}
