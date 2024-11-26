import { Request, Response, NextFunction } from 'express';
import { registerUserService } from '../services/registerUserService';
import { AuthResponse } from '../../../shared/types';
import { RequestError } from '../../../shared/middlewares/errorHandler';

export async function registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new RequestError('Email and password are required.', 400);
    }

    const result: AuthResponse = await registerUserService(email, password);

    res.status(201).json({
      message: 'User created successfully.',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
}