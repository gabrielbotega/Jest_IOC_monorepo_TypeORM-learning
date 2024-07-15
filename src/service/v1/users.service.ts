import { UserDao } from "../dao/users.dao";
import { inject, injectable } from "inversify";
import injectionTokensConstants from "@/constants/injection.tokens.constants";
import { IUser } from "@/models/users.moldes";

@injectable()
export class UserService {
  constructor(
    @inject(injectionTokensConstants.v1.Dao.userDao)
    private readonly userDao: UserDao
  ) {}
  public async getAllUsers(): Promise<Array<IUser>> {
    return await this.userDao.getAllUsers();
  }
}
