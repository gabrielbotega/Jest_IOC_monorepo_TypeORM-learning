// users.spec.ts

import TYPES from "@trainingjest/users/constants/symbols.constants";
import UserController from "@trainingjest/users/controller/users.controller";
import { myContainer } from "@trainingjest/users/inversify.config";
import { Request, Response } from "express";
import { AppDataSource } from "@trainingjest/users/data-source";
import * as dotenv from "dotenv";
import { ValidationError } from "class-validator";

dotenv.config();

describe("Users", () => {
  jest.setTimeout(2 * 60 * 1000);

  const userController = myContainer.get<UserController>(
    TYPES.v1.Controllers.userController
  );

  const mockRequest = (data?: any): Request => {
    return {
      body: data,
      params: data,
    } as unknown as Request;
  };

  const mockResponse = (): Response => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  });

  afterAll(async () => {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it("Should return all users", async () => {
    const req = mockRequest();
    const res = mockResponse();

    const result = await userController.getUsers(req, res);
    console.log("Result from getUsers:", result);
    console.log(res.statusCode);

    expect(res.statusCode).toBe(200);
    expect(result).toBeDefined();
  });

  /*
   * I'm persisting data into my DB. Need to find a way to mock the DB
   *but still use the DAO (end of the line)
   */
  it("Should create a new user", async () => {
    const res = mockResponse();
    const req = mockRequest({
      firstName: "John",
      lastName: "Doe",
      age: 34,
      email: "john@example.com",
    });

    const result = await userController.createUser(req, res);

    expect(res.statusCode).toBe(201);
    expect(result).toBeDefined();
  });

  it("Should reject user creation by validation", async () => {
    const res = mockResponse();
    const req = mockRequest({
      firstName: 55,
      lastName: "Doe",
      age: 34,
      email: "john@example.com",
    });

    const result = await userController.createUser(req, res);

    expect(res.statusCode).toBe(400);
    console.log(result.message); // should be the error object from class-validator
    expect(result.message[0]).toMatchObject({ ...ValidationError });
  });
});
