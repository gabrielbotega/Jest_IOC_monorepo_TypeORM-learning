import { UserService } from "@trainingjest/users/service/v1/users.service";
import { inject } from "inversify";
import TYPES from "@trainingjest/users/constants/symbols.constants";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserDtoFactory } from "@trainingjest/users/database/dto/user.dto";

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
      const users = await this.userService.getAllUsers();

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  /*
   * Here we're supposing the user is logged in and we'll retrieve the id by the session
   */
  @httpGet("/greetings/:id")
  public async getUserGreetings(req: Request, res: Response): Promise<void> {
    try {
      const userGreeting = await this.userService.getUserGreetings(
        req.params.id
      );

      res.status(200).json(userGreeting);
    } catch (error) {
      console.log(error);
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

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
