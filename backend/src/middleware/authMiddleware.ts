import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized. Token missing." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}