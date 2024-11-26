// src/modules/auth/services/loginUserService.ts

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../auth/models/User';
import { AuthResponse } from '../../../shared/types/app';
import { RequestError } from '../../../shared/middlewares/errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function loginUserService(email: string, password: string): Promise<AuthResponse> {

  const user = await User.findOne({ email });
  if (!user) {
    throw new RequestError('Invalid credentials.', 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new RequestError('Invalid credentials.', 400);
  }

  const token = jwt.sign({ userId: user._id?.toString() }, JWT_SECRET, { expiresIn: '1h' });

  return {
    user: { id: user._id!.toString(), email: user.email },
    token,
  };
}
