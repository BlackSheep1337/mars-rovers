import { Request, Response, NextFunction } from "express";
import { processRoverCommandsService } from "../services/processRoverCommandsService";
import { RequestError } from "../../../shared/middlewares/errorHandler";

export async function processCommands(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { position, commands } = req.body;
  const userId = req.userId;

  try {
    if (!commands || position.x === undefined || position.y === undefined || !position.direction) {
      throw new RequestError("Missing required fields.", 400);
    }

    if (!userId) {
      throw new RequestError("Unauthorized. User ID missing.", 401);
    }

    const result = await processRoverCommandsService(userId, position, commands);

    res.status(200).json({
      message: "Command processed successfully and saved to history.",
      finalPosition: result.finalPosition,
      commandsExecuted: result.commandsExecuted,
      historyCount: result.historyCount,
    });

  } catch (error) {
    next(error);
  }
}
