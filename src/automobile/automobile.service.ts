import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoDto } from 'src/dto/auto.dto';
import { Auto } from 'src/schema/auto.shema';

@Injectable()
export class AutomobileService {
  constructor(@InjectModel(Auto.name) private authModel: Model<Auto>) {}
  async addAuto(payload: AutoDto){
    const saveAuto = new this.authModel(payload);
    return await saveAuto.save();
  }
}
