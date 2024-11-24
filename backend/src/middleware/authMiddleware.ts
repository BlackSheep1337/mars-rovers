import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized. Token missing or malformed." });
    return;
  }
  
  const token = authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error: ", error);
    res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}