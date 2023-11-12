/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const MarkerSchema = new mongoose.Schema({
    manager_id: { type: String, required: true },
    system_id: { type: String, required: true },
    locationGeolocation: {
        type: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        }, required: true
    },
    description: { type: String },
    name: { type: String, required: true },
    notes: { type: String },
    communicationDetails: {
        type: {
            email: { type: String },
            phone: { type: String }
        }, required: true
    }
});

export interface Marker {
    _id: string;
    manager_id: string;
    system_id: string;
    locationGeolocation: object;
    description: string;
    name: string;
    notes: string;
    communicationDetails: object;
}

