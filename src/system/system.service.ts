/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { System } from './system.model';

@Injectable()
export class SystemService {
  constructor(
    @InjectModel('System') private readonly systemModel: Model<System>,
  ) { }

  async AddSystem(
    topic: string,
    urlName: string,
    urlImg: string,
    objectName: string,
    adminUid: string,
    description: string,
    communicationDetails: object,
  ) {
    const newSystem = new this.systemModel({
      topic,
      urlName,
      urlImg,
      objectName,
      adminUid,
      description,
      communicationDetails,
    });
    return await newSystem.save();
  }

  async getAllSystems() {
    return await this.systemModel.find().exec();
  }

  async getSystemById(id: string) {
    return await this.systemModel.findById(id).exec();
  }

  async getSystemByUrlName(urlName: string) {
    return await this.systemModel.findOne({ urlName: urlName }).exec();
  }

  async getSystemsOfAdmin(adminUid: string) {
    return await this.systemModel.find({ adminUid: adminUid }).exec();
  }

  async updateSystem(
    _id: string,
    topic: string,
    urlName: string,
    urlImg: string,
    objectName: string,
    adminUid: string,
    description: string,
    communicationDetails: object,
  ) {
    return await this.systemModel
      .updateOne(
        { _id: _id },
        {
          $set: {
            topic: topic,
            urlName: urlName,
            urlImg: urlImg,
            objectName: objectName,
            adminUid: adminUid,
            description: description,
            communicationDetails: communicationDetails,
          },
        },
      )
      .exec();
  }

  async deleteSystem(_id: string) {
    return await this.systemModel.findByIdAndDelete(_id).exec();
  }
}
