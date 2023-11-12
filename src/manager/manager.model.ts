/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ManagerSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    systemId: { type: String, required: true, unique: true },
    active: { type: String, required: true },
    displayName: { type: String, required: true },
    role: { type: String, enum: ['manager', 'admin'], required: true },
})

export interface Manager {
    _id: string;
    userId: string;
    systemId: string;
    active: string;
    displayName: string;
    role: string;
}
