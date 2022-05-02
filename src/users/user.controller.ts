import { NextFunction, Request, Response } from "express";

import UserService from "./user.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.create(req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.findOne(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.update(req.params.id, req.body);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await UserService.delete(req.params.id);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};
