import { UserService } from "@trainingjest/users/service/v1/users.service";
import { inject } from "inversify";
import TYPES from "@trainingjest/users/constants/symbols.constants";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserDtoFactory } from "@trainingjest/users/database/dto/user.dto";

import { ResponseStatus } from "../models/response.model";

@controller("/users")
export default class UserController {
  constructor(
    @inject(TYPES.v1.Services.userService)
    private readonly userService: UserService,
    @inject(TYPES.v1.Dto.userDtoFactory)
    private userDtoFactory: UserDtoFactory
  ) {}

  @httpGet("/getall")
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.userService.getAllUsers();
      if (response.status === ResponseStatus.Fail) {
        res.status(404).json(response);
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.Fail,
        message: error.message,
      });
    }
  }

  @httpGet("/greetings/:id")
  public async getUserGreetings(req: Request, res: Response): Promise<void> {
    try {
      const userGreeting = await this.userService.getUserGreetings(
        req.params.id
      );

      res.status(200).json(userGreeting);
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.Fail,
        message: error.message,
      });
    }
  }

  @httpPost("/create")
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, age, email } = req.body || {};

      /*
       * Needed to use the factory here because the "class-validator" needs the actual instance of the class
       *thus this was the easiest way to achieve it without harding instatiating it.
       */
      const userDto = this.userDtoFactory.createUserDto({
        firstName,
        lastName,
        age,
        email,
      });

      const validatedUser = await this.userService.validateUser(userDto);

      if (validatedUser.status === ResponseStatus.Fail) {
        res.status(400).json({ message: validatedUser.message });
        return;
      }

      const existingEmail = await this.userService.checkExistingEmail(
        userDto.email
      );

      if (existingEmail) {
        res.status(409).json({
          status: ResponseStatus.Fail,
          message: "Email already exists",
        });
        return;
      }

      const createdUser = await this.userService.createUser(userDto);
      res.status(201).json({
        status: ResponseStatus.Success,
        data: createdUser,
      });
    } catch (error) {
      res.status(500).json({
        status: ResponseStatus.Fail,
        message: error.message,
      });
    }
  }
}
