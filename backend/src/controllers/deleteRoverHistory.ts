import { Request, Response } from "express";
import User from "../models/User";


export async function deleteRoverHistory(req: Request, res: Response): Promise<void> {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }
  
  try {
    user.roverHistory = [];
    
    await user.save();
  
    res.status(200).json({ history: user.roverHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete rover history.' });
  }
}