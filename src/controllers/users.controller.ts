import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '@/config';
import { LoginData } from '@/types/auth.type';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ success: true, data: findAllUsersData });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ success: true, data: findOneUserData });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ success: true, data: createUserData });
    } catch (error) {
      next(error);
    }
  };

  public updateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: string = req?.user?.userId;
      const apiKey: string = req.body.apiKey;

      const updatedUserData: User = await this.userService.updateApiKey({ user, apiKey });
      res.status(200).json({ success: true, data: updatedUserData });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ success: true, data: deleteUserData });
    } catch (error) {
      next(error);
    }
  };

  // auth related controller
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authId: string = req.body.authId;
      const findOneUserData: User = await this.userService.findUserById(authId);
      const userData: LoginData = {
        apiKey: findOneUserData.apiKey,
        userId: findOneUserData._id,
        email: findOneUserData.notificationEmail,
        sendEmailNotifications: findOneUserData.sendEmailNotifications,
        productId: findOneUserData.subscription?.productId,
      };
      const token = jwt.sign(userData, JWT_SECRET_KEY);
      res.status(200).json({ success: true, data: token });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
