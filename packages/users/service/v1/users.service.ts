import { UserDao } from "@trainingjest/users/database/dao/users.dao";
import { inject, injectable } from "inversify";
import TYPES from "@trainingjest/users/constants/symbols.constants";
import { IUser } from "@trainingjest/users/models/users.moldes";
import { UserBasicInfoTransformation } from "../adapters/user-dto-to-usershow";
import { validate } from "class-validator";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.v1.Dao.userDao)
    private readonly userDao: UserDao,
    @inject(TYPES.v1.Adapters.UserBasicInfoTransformation)
    private readonly userBasicInfoTransform: UserBasicInfoTransformation
  ) {}

  public async getAllUsers(): Promise<Array<IUser>> {
    return await this.userDao.getAllUsers();
  }

  public async getUserGreetings(id: string): Promise<string> {
    const user = await this.userDao.getUserById(id);

    return this.userBasicInfoTransform.userGreetingsimplePhraseDisplay(user);
  }

  public async createUser(req: IUser): Promise<IUser> {
    return await this.userDao.createUser(req);
  }

  public async checkExistingEmail(emailAttempt: string): Promise<boolean> {
    return await this.userDao.checkExistingEmail(emailAttempt);
  }

  public async validateUser(userAttempt: UserDto): Promise<IResponse<IUser>> {
    const errors = await validate(userAttempt);

    if (errors.length > 0) {
      return {
        status: ResponseStatus.Fail,
        message: errors,
      };
    }
    return {
      status: ResponseStatus.Success,
    };
  }
}
