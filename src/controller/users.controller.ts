import { UserService } from "@/service/v1/users.service";
import { inject } from "inversify";
import TYPES from "@/constants/symbols.constants";
import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { UserDto } from "@/database/dto/user.dto";

@controller("/users")
export default class UserController {
  constructor(
    @inject(TYPES.v1.Services.userService)
    private readonly userService: UserService,
    @inject(TYPES.v1.Dto.userDto)
    private readonly userDto: UserDto,
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
        req.params.id,
      );

      res.status(200).json(userGreeting);
    } catch (error) {
      console.log(error);
    }
  }

  @httpPost("/create")
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      this.userDto.firstName = req.body.firstName;
      this.userDto.lastName = req.body.lastName;
      this.userDto.age = req.body.age;

      const createdUser = await this.userService.createUser(this.userDto);
      res.json(createdUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
