import { Container } from "inversify";
import TYPES from "@trainingjest/users/constants/symbols.constants";
import { UserService } from "@trainingjest/users/service/v1/users.service";
import { UserDao } from "@trainingjest/users/database/dao/users.dao";
import UserController from "@trainingjest/users/controller/users.controller";
import {
  UserDto,
  UserDtoFactory,
} from "@trainingjest/users/database/dto/user.dto";
import { UserBasicInfoTransformation } from "@trainingjest/users/service/adapters/user-dto-to-usershow";

const myContainer = new Container();
myContainer.bind<UserService>(TYPES.v1.Services.userService).to(UserService);
myContainer.bind<UserDao>(TYPES.v1.Dao.userDao).to(UserDao);
myContainer
  .bind<UserController>(TYPES.v1.Controllers.userController)
  .to(UserController);
myContainer.bind<UserDto>(TYPES.v1.Dto.userDto).to(UserDto);
myContainer
  .bind<UserDtoFactory>(TYPES.v1.Dto.userDtoFactory)
  .to(UserDtoFactory);
myContainer
  .bind<UserBasicInfoTransformation>(
    TYPES.v1.Adapters.UserBasicInfoTransformation
  )
  .to(UserBasicInfoTransformation);

export { myContainer };
