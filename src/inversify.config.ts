import { Container } from "inversify";
import TYPES from "./constants/symbols.constants";
import { UserService } from "./service/v1/users.service";
import { UserDao } from "./service/dao/users.dao";
import UserController from "./controller/users.controller";
import { UserDto } from "./models/dto/user.dto";

const myContainer = new Container();
myContainer.bind<UserService>(TYPES.v1.Services.userService).to(UserService);
myContainer.bind<UserDao>(TYPES.v1.Dao.userDao).to(UserDao);
myContainer
  .bind<UserController>(TYPES.v1.Controllers.userController)
  .to(UserController);
myContainer.bind<UserDto>(TYPES.v1.Dto.userDto).to(UserDto);

export { myContainer };
