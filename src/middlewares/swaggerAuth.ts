import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

const swaggerAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const secreteKey = 'hive017ipa-deepsegap-evih2337854DFC75APIggh';
    const apiKey = req.params.apiKey;
    if (apiKey == secreteKey) {
      next();
    } else {
      next(new HttpException(401, 'You are not authorized person'));
    }
  } catch (error) {
    next(error);
  }
};

export default swaggerAuth;
