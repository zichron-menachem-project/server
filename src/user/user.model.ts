/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fireBaseUId: { type: String, required: true, unique: true },
  role: { type: String, enum: ['admin', 'customer'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  phone: { type: String },
});

export interface User {
  _id: string;
  fireBaseUId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

