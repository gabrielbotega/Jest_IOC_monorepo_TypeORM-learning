import { Container } from "inversify";
import UserController from "./controller/users.controller";
import injectionTokensConstants from "./constants/injection.tokens.constants";
import { UserService } from "./service/v1/users.service";
import { UserDao } from "./service/dao/users.dao";

const myContainer = new Container();
myContainer
  .bind<UserService>(injectionTokensConstants.v1.Services.userService)
  .to(UserService);
myContainer
  .bind<UserController>(injectionTokensConstants.v1.Controllers.userController)
  .to(UserController);
myContainer.bind<UserDao>(injectionTokensConstants.v1.Dao.userDao).to(UserDao);
