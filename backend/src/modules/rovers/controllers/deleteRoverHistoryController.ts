import { Request, Response, NextFunction } from "express";
import { deleteRoverHistoryService } from "../services/deleteRoverHistoryService";
import { IUser } from "../../../shared/types";

export async function deleteRoverHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.userId;

  try {
    const updatedUser: IUser = await deleteRoverHistoryService(userId);

    res.status(200).json({ history: updatedUser.roverHistory });
  } catch (error) {
    next(error);
  }
}