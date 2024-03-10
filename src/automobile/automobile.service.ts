import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutoDto } from 'src/dto/auto.dto';
import { Auto } from 'src/schema/auto.shema';

@Injectable()
export class AutomobileService {
  constructor(@InjectModel(Auto.name) private authModel: Model<Auto>) {}

  //Method to add auto
  async addAuto(payload: AutoDto) {
    const saveAuto = new this.authModel(payload);
    return await saveAuto.save();
  }

  async getAutomobileByName(productName: string) {
    // Find the product with the matching name
    const foundProduct = await this.authModel.findOne({ name: productName });
    //Error to throw if automobile is not found
    if (!foundProduct) {
      throw new NotFoundException(` ${productName} not found in the database`);
    }
    return foundProduct;
  }

  //Method to get all auto
  async getAllAuto() {
    try {
      const findAll = await this.authModel.find();
      return findAll;
    } catch (theError) {
      throw new NotFoundException('Could not find all autos');
    }
  }

  // Method to update product by name
  async updateProductByName(productName: string, updatedData: AutoDto) {
    // 1. Find the product to update
    const foundProduct = await this.authModel.findOne({ name: productName });

    // 2. Check if the product exists
    if (!foundProduct) {
      throw new NotFoundException(`Product with name ${productName} not found`);
    }

    // 3. Apply the updates to the found product
    const updatedProduct = Object.assign(foundProduct, updatedData); // Combine new and old data

    // 4. Save the updated product in the database
    return await updatedProduct.save();
  }

  //Delete an automobile by name
  async deleteByName(name: string){
    const toDelete = await this.authModel.deleteOne({ name: name });
    if(!toDelete){
      throw new NotFoundException(`${name} not found`);
    }return{
        statusCode: 200,
        message: `${name} deleted successfully`,
    }
  }
}
