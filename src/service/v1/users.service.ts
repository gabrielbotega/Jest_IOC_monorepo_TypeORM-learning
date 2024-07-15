import { UserDao } from "../dao/users.dao";
import { inject, injectable } from "inversify";
import TYPES from "@/constants/symbols.constants";
import { IUser } from "@/models/users.moldes";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.v1.Dao.userDao)
    private readonly userDao: UserDao
  ) {}

  public async getAllUsers(): Promise<Array<IUser>> {
    return await this.userDao.getAllUsers();
  }

  public async createUser(req: IUser): Promise<IUser> {
    return await this.userDao.createUser(req);
  }
}
