import { UserService } from "@trainingjest/users/service/v1/users.service";
import { inject } from "inversify";
import TYPES from "@trainingjest/users/constants/symbols.constants";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserDto } from "@trainingjest/users/database/dto/user.dto";
import { IResponse, ResponseStatus } from "../models/response.model";
import { IUser } from "../models/users.moldes";

@controller("/users")
export default class UserController {
  constructor(
    @inject(TYPES.v1.Services.userService)
    private readonly userService: UserService,
    // @inject(TYPES.v1.Dto.userDtoFactory)
    // private userDtoFactory: UserDtoFactory
    @inject(TYPES.v1.Dto.userDto) private userDto: UserDto
  ) {}

  @httpGet("/getall")
  public async getUsers(
    req: Request,
    res: Response
  ): Promise<IResponse<Array<IUser>>> {
    try {
      const response = await this.userService.getAllUsers();
      if (response.status === ResponseStatus.Fail) {
        res.statusCode = 404;
        return response;
      } else {
        res.statusCode = 200;
        return response;
      }
    } catch (error) {
      res.statusCode = 500;
      return error.message;
    }
  }

  @httpGet("/greetings/:id")
  public async getUserGreetings(
    req: Request,
    res: Response
  ): Promise<IResponse<IUser>> {
    try {
      const userGreeting = await this.userService.getUserGreetings(
        req.params.id
      );

      res.statusCode = 200;

      return { message: userGreeting };
    } catch (error) {
      res.statusCode = 500;
      return error.message;
    }
  }

  @httpPost("/create")
  public async createUser(
    req: Request,
    res: Response
  ): Promise<IResponse<IUser>> {
    try {
      const { firstName, lastName, age, email } = req.body || {};

      /*
       * Needed to use the factory here because the "class-validator" needs the actual instance of the class
       *thus this was the easiest way to achieve it without harding instatiating it.
       */
      this.userDto = { ...this.userDto, firstName, lastName, age, email };

      const validatedUser = await this.userService.validateUser(this.userDto);

      if (validatedUser.status === ResponseStatus.Fail) {
        res.statusCode = 400;
        return {
          message: validatedUser.message,
        };
      }

      const existingEmail = await this.userService.checkExistingEmail(
        this.userDto.email
      );

      if (existingEmail) {
        res.statusCode = 409;
        return {
          message: "Email already exists",
        };
      }

      const createdUser = await this.userService.createUser(this.userDto);
      res.statusCode = 201;
      return {
        data: createdUser,
      };
    } catch (error) {
      res.statusCode = 500;
      return {
        message: error.message,
      };
    }
  }
}
