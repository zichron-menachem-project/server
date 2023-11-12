/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const EmailDetailsSchema = new mongoose.Schema({
    email: { type: String, required: true},
    name: { type: String, required: true }
})

export interface EmailDetails {
    email: string;
    name: string;
}
