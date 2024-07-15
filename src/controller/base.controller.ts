import { Router } from "express";

export abstract class BaseControler {
  protected router: Router = Router();

  protected abstract get basePath(): string;

  protected getRoutes(): void {}

  protected postRoutes(): void {}

  protected putRoutes(): void {}
}
