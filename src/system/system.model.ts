/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const SystemSchema = new mongoose.Schema({
    topic: { type: String, required: true},
    urlName: { type: String, required: true, unique: true},
    url: { type: String, required: true },
    objectName: { type: String, required: true },
    adminUid: { type: String, required: true },
    description: { type: String, required: true },
    communicationDetails: { type: {
        email: { type: String },
        phone: { type: String }
    }, required: true }
})

export interface System {
    _id: string;
    topic: string;
    urlName: string;
    urlImg: string;
    objectName: string;
    adminUid: string;
    description: string;
    communicationDetails: object;
}
