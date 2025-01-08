import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        message: 'אין הרשאה - נדרשת התחברות מחדש',
        code: 'TOKEN_MISSING'
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      (req as any).user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          message: 'פג תוקף החיבור - נדרשת התחברות מחדש',
          code: 'TOKEN_EXPIRED'
        });
      } else {
        res.status(401).json({
          message: 'טוקן לא תקין - נדרשת התחברות מחדש',
          code: 'TOKEN_INVALID'
        });
      }
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'שגיאת שרת באימות המשתמש',
      code: 'AUTH_ERROR'
    });
  }
};