import { ValidationError } from "class-validator";

export enum ResponseStatus {
  Fail = "FAIL",
  Success = "SUCCESS",
}

export interface IResponse<T> {
  status?: ResponseStatus;

  message?: string | ValidationError[];

  data?: T;
}
