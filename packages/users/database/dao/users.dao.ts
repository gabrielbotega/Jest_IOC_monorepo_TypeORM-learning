import { AppDataSource } from "@trainingjest/users/data-source";
import { User } from "@trainingjest/users/database/entities/User";
import { IUser } from "@trainingjest/users/models/users.moldes";
import { injectable } from "inversify";

@injectable()
export class UserDao {
  public async getAllUsers(): Promise<Array<IUser>> {
    try {
      const allUsers = await AppDataSource.getRepository(User)
        .createQueryBuilder("users")
        .getMany();

      return allUsers;
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserById(id: string): Promise<IUser> {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOneOrFail();

      return user;
    } catch (error) {
      console.log(error);
    }
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
