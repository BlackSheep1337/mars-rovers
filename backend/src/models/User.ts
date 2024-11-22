import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/typtes';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roverHistory: [{ x: Number, y: Number, direction: String, command: String }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;