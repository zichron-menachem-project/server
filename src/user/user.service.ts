/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async AddUser(
    fireBaseUId: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string | undefined | null
  ) {
    const newUser = new this.userModel({
      fireBaseUId,
      role,
      firstName,
      lastName,
      email,
      phone
    });
    return await newUser.save();
  }

  async getUsers() {
    return await this.userModel.find();
  }

  async getUserById(fireBaseUId: string) {
    return await this.userModel.findOne({fireBaseUId : fireBaseUId}).exec();
  }

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({email: email}).exec();
  }

  async updateUser(
    fireBaseUId: string,
    role: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string | undefined | null
  ) {
    return await this.userModel
      .updateOne(
        { fireBaseUId: fireBaseUId },
        {
          $set: {
            role: role,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
          },
        },
      )
      .exec();
  }

  async deleteUser(fireBaseUId: string) {
    return await this.userModel.findByIdAndDelete(fireBaseUId).exec();
  }
}
