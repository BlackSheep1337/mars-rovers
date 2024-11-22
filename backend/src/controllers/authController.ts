import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validação básica de entrada
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    // Verifica se o e-mail já está registrado
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'Email already registered.' });
      return;
    }

    // Gera o hash da senha
    const hashPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
    const newUser = new User({ email, password: hashPassword });
    await newUser.save();

    // Gera um token JWT (se necessário)
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    // Resposta de sucesso com token
    res.status(201).json({
      message: 'User created successfully.',
      user: { email: newUser.email, id: newUser._id },
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
}


export async function loginUser(req:Request, res: Response): Promise<void> {
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