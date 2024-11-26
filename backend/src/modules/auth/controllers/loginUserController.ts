import { Request, Response, NextFunction } from 'express';
import { loginUserService } from '../services/loginUserService';
import { AuthResponse } from '../../../shared/types/app';
import { RequestError } from '../../../shared/middlewares/errorHandler';

export async function loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new RequestError('Email and password are required.', 400);
    }

    const result: AuthResponse = await loginUserService(email, password);

    res.status(200).json({
      message: 'Login successful.',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
}