/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './request.model';

@Injectable()
export class RequestService {
    constructor(
        @InjectModel('Request') private readonly requestModel: Model<Request>,
    ) { }

    async AddRequest(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        systemId: string,
        displayName: string,
        status: string,
        notes: string,
    ) {
        const newMarker = new this.requestModel({
            firstName,
            lastName,
            email,
            phone,
            systemId,
            displayName,
            status,
            notes,
        });
        return await newMarker.save();
    }

    async getRequests() {
        return await this.requestModel.find();
    }

    async getRequestById(requestId: string) {
        return await this.requestModel.findById(requestId).exec();
    }

    async getRequestsOfSystem(systemId: string) {
        return await this.requestModel.find({ systemId: systemId }).exec();
    }

    async updateRequest(
        _id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        systemId: string,
        displayName: string,
        status: string,
        notes: string,
    ) {
        return await this.requestModel
            .updateOne(
                { _id: _id },
                {
                    $set: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phone: phone,
                        systemId: systemId,
                        displayName: displayName,
                        status: status,
                        notes: notes,
                    },
                },
            )
            .exec();
    }

    async deleteRequest(_id: string) {
        return await this.requestModel.findByIdAndDelete(_id).exec();
    }
}
