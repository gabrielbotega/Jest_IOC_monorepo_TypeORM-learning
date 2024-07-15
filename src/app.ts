import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { myContainer } from "./inversify.config";
import "./controller/users.controller"; // Import the controller

const server = new InversifyExpressServer(myContainer);

server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build();

export default app;
