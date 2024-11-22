import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export async function registerUser(req:Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: 'Email already registred.' });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashPassword });
  await newUser.save();

  res.status(201).json({ message: 'User created sucessfuly.' });
}

export async function name(req:Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ message: 'User not found.' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ message: 'Password Incorrect.' });
    return;
  }

  const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

  res.status(200).json({ token });
}