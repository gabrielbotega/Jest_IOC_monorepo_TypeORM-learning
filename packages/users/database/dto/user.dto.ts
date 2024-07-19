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

@injectable()
export class UserDtoFactory {
  createUserDto(data: Partial<UserDto>): UserDto {
    const userDto = new UserDto();
    Object.assign(userDto, data);
    return userDto;
  }
}
