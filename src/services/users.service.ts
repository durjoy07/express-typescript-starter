import { CreateUserDto, UpdateApiKeyDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(authId: string): Promise<User> {
    if (isEmpty(authId)) throw new HttpException(400, 'UserId not found');

    const findUser: User = await this.users.findOne({ authId: authId });
    if (!findUser) throw new HttpException(409, 'User not found');

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User Data missing');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Email ${userData.email} already exists`);

    const createUserData: User = await this.users.create({ ...userData, notificationEmail: userData.email });

    return createUserData;
  }

  public async updateApiKey(userData: UpdateApiKeyDto): Promise<User> {
    let updatedUser: User;
    if (userData) {
      updatedUser = await this.users.findOneAndUpdate(
        { _id: userData.user },
        {
          $set: {
            apiKey: userData.apiKey,
          },
        },
      );
    } else throw new HttpException(400, 'User Data missing');
    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete({ _id: userId });
    if (!deleteUserById) throw new HttpException(409, 'User not found');

    return deleteUserById;
  }
}

export default UserService;
