import { Request, Response, NextFunction } from "express";
import { getRoverHistoryService } from "../services/getHistoryService";
import { IUser } from "../../../shared/types";

export async function getRoverHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.userId;

  try {
    const user: IUser = await getRoverHistoryService(userId);

    res.status(200).json({ history: user.roverHistory });
  } catch (error) {
    next(error);
  }
}
