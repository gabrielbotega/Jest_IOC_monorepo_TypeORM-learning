import { UserService } from "@/service/v1/users.service";
import { inject, injectable } from "inversify";
import injectionTokensConstants from "@/constants/injection.tokens.constants";
import { BaseControler } from "./base.controller";
import { IUser } from "@/models/users.moldes";
import { Request, Response } from "express";

@injectable()
export default class UserController extends BaseControler {
  // private _userService: UserService;

  constructor(
    @inject(injectionTokensConstants.v1.Services.userService)
    private readonly userService: UserService
  ) {
    super();
    // this._userService = userService;
  }

  public get basePath(): string {
    return "/users";
  }

  public getRoutes(): void {
    this.router.get(`${this.basePath}/`, (req: Request, res: Response) =>
      this.getUsers(req, res)
    );
  }

  private async getUsers(req: Request, res: Response): Promise<Array<IUser>> {
    return this.userService.getAllUsers();
  }
}
