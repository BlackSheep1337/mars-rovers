import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestError } from '../../../shared/middlewares/errorHandler';
import { AuthResponse } from '../../../shared/types';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function registerUserService(email: string, password: string): Promise<AuthResponse> {
  
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new RequestError('Email already registered.', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ userId: newUser._id?.toString() }, JWT_SECRET, { expiresIn: '1h' });

  return {
    user: { id: newUser._id!.toString(), email: newUser.email },
    token,
  };
}
