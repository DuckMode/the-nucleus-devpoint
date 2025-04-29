import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError } from './errorHandler.js';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(new AppError('Unauthorized - Invalid token', 401));
    }

    // Attach user to request object
    req.user = user;
    next();
  })(req, res, next);
};
