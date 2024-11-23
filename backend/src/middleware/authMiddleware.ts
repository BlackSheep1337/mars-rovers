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
    console.log('JWT_SECRET used for verification:', process.env.JWT_SECRET);
    // Verifica o token
    const decoded = jwt.verify(token, 'Khf78@1!bGhiKloP90dLs3fmnAzQ4r5T') as { userId: string };
    console.log("decoded:", decoded)
    req.userId = decoded.userId;
    next();
  } catch (error) {
      console.error("Token verification error:", error);  // Log the exact error
    res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
}