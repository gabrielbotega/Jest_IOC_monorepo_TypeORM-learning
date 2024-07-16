import { UserDao } from "@/database/dao/users.dao";
import { inject, injectable } from "inversify";
import TYPES from "@/constants/symbols.constants";
import { IUser } from "@/models/users.moldes";
import { UserBasicInfoTransformation } from "../adapters/user-dto-to-usershow";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.v1.Dao.userDao)
    private readonly userDao: UserDao,
    @inject(TYPES.v1.Adapters.UserBasicInfoTransformation)
    private readonly userBasicInfoTransform: UserBasicInfoTransformation,
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
}
