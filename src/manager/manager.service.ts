/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager } from './manager.model';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel('Manager') private readonly managerModel: Model<Manager>,
    ) { }

    async AddManager(
        userId: string,
        systemId: string,
        active: string,
        displayName: string,
        role: string,
    ) {
        const newMarker = new this.managerModel({
            userId,
            systemId,
            active,
            displayName,
            role,
        });
        return await newMarker.save();
    }

    async getManagers() {
        return await this.managerModel.find();
    }

    async getManagerById(ManagerId: string) {
        return await this.managerModel.findById(ManagerId).exec();
    }

    async getManagersOfSystem(systemId: string) {
        return await this.managerModel.find({ systemId: systemId }).exec();
    }

    async updateManager(
        _id: string,
        userId: string,
        systemId: string,
        active: string,
        displayName: string,
        role: string,
    ) {
        return await this.managerModel
            .updateOne(
                { _id: _id },
                {
                    $set: {
                        userId: userId,
                        systemId: systemId,
                        active: active,
                        displayName: displayName,
                        role: role,
                    },
                },
            )
            .exec();
    }

    async deleteManager(_id: string) {
        return await this.managerModel.findByIdAndDelete(_id).exec();
    }
}
