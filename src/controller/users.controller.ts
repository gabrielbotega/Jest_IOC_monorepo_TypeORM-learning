import { UserService } from "@/service/v1/users.service";
import { inject } from "inversify";
import injectionTokensConstants from "@/constants/injection.tokens.constants";
import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";

@controller("/users")
export default class UserController {
  constructor(
    @inject(injectionTokensConstants.v1.Services.userService)
    private readonly userService: UserService
  ) {}

  @httpGet("/getall")
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
}
