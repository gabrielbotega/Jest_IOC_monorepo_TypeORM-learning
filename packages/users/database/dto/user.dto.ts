import {
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { injectable } from "inversify";

@injectable()
export class UserDto {
  public id?: string;

  @MinLength(4)
  @MaxLength(100)
  @IsString()
  public firstName: string;

  @MinLength(3)
  @MaxLength(100)
  @IsString()
  public lastName: string;

  @IsInt()
  public age: number;

  @IsEmail()
  public email: string;

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
