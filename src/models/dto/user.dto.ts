import { injectable } from "inversify";

@injectable()
export class UserDto {
  public id?: string;

  public firstName: string;

  public lastName: string;

  public age: number;

  public createdAt?: Date;

  public updatedAt?: Date;
}
