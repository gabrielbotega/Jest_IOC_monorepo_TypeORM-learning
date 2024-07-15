import { AppDataSource } from "@/data-source";
import { User } from "@/models/entities/User";
import { IUser } from "@/models/users.moldes";
import { injectable } from "inversify";

@injectable()
export class UserDao {
  public async getAllUsers(): Promise<Array<IUser>> {
    const allUsers = await AppDataSource.getRepository(User)
      .createQueryBuilder("users")
      .getMany();

    return allUsers;
  }
}
