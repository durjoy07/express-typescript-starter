import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import jwt from 'jsonwebtoken';
import { LoginData } from '@/types/auth.type';

const authorizationRoute = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string;
    if (req.route.path === '/audits/update/:id' && Object.keys(req.body).length == 0) {
      next();
    } else {
      if (req.headers.authorization) {
        token = req.headers.authorization;
      }
      if (!token) {
        next(new HttpException(401, 'You are not authorized person'));
      } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as LoginData;
        req.user = decoded;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

export default authorizationRoute;
