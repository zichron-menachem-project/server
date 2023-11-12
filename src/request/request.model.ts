/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const RequestSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    systemId: { type: String, required: true },
    displayName: { type: String, required: true },
    status: { type: String, enum: ['sent', 'pending', 'approve', 'reject'], required: true },
    notes: { type: String, required: true}
})

export interface Request {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    systemId: string;
    displayName: string;
    status: string;
    notes: string;
}
