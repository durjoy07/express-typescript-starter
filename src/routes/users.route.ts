import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authorizationRoute from '@/middlewares/authorizationRoute.middleware';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authorizationRoute, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, authorizationRoute, this.usersController.getUserById);
    this.router.post(`${this.path}/create`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/update/apikey`, authorizationRoute, this.usersController.updateApiKey);
    this.router.delete(`${this.path}/delete/:id`, authorizationRoute, this.usersController.deleteUser);
    this.router.post(`${this.path}/login`, this.usersController.login);
  }
}

export default UsersRoute;
