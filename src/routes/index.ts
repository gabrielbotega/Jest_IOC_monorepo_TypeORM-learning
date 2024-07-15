import { Router } from "express";
import usersRouter from "@/controller/users.controller";

const routes = Router();

routes.use("/users", usersRouter);

export default routes;
