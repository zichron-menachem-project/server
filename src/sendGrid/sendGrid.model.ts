/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { EmailDetailsSchema } from './emailDetails.model';

export const SendGridSchema = new mongoose.Schema({
    personalizations: {
        type: {
            to: { type: [EmailDetailsSchema], required: true },
            subject: { type: String, required: true }
        }, required: true
    },
    from: { type: EmailDetailsSchema, required: true },
    reply_to: { type: EmailDetailsSchema, required: true },
})

export interface SendGrid {
    personalizations: object;
    from: object;
    reply_to: object;
}
