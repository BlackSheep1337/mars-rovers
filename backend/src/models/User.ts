import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/typtes';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roverHistory: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      direction: { type: String, required: true },
      command: { type: String, required: true },
    },
  ],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;