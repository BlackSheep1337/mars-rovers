import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../../shared/types/app';

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roverHistory: [
    {
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
        direction: { type: String, required: true },
      },
      commands: { type: String, required: true },
    },
  ],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;