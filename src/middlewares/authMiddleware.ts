import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = header.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.body.firebaseUid = decodedToken.uid; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};