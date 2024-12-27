import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// ממשק עבור המבנה של הטוקן
interface DecodedToken {
  userId: string;
  role: string;
  iat?: number; // Issued at time (אופציונלי)
  exp?: number; // Expiration time (אופציונלי)
}

// Middleware לבדיקה אם המשתמש מנהל
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Token is missing' });
    return;
  }

  const token = authHeader.split(' ')[1]; // שליפת הטוקן מהכותרת

  try {
    // אימות הטוקן
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    // בדיקת תפקיד המשתמש
    if (decoded.role !== 'manager') {
      res.status(403).json({ message: 'Access forbidden: Admins only' });
      return;
    }

    // הוספת המידע על המשתמש ל-req
    (req as any).user = decoded;
    next(); // העברת הבקשה לנתיב הבא
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
