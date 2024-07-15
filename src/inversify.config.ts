import { Container } from "inversify";
import injectionTokensConstants from "./constants/injection.tokens.constants";
import { UserService } from "./service/v1/users.service";
import { UserDao } from "./service/dao/users.dao";
import UserController from "./controller/users.controller";

const myContainer = new Container();
myContainer
  .bind<UserService>(injectionTokensConstants.v1.Services.userService)
  .to(UserService);
myContainer.bind<UserDao>(injectionTokensConstants.v1.Dao.userDao).to(UserDao);
myContainer
  .bind<UserController>(injectionTokensConstants.v1.Controllers.userController)
  .to(UserController);

export { myContainer };
