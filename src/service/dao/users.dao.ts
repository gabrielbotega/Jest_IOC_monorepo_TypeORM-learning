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

  public async createUser(user: IUser): Promise<IUser> {
    const createdUserResult = await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: user.firstName, lastName: user.lastName, age: user.age },
      ])
      .execute();

    const createdUserId = createdUserResult.identifiers[0].id;

    const createdUser = await AppDataSource.getRepository(User)
      .createQueryBuilder("users")
      .where("users.id = :id", { id: createdUserId })
      .getOne();

    return createdUser;
  }
}
