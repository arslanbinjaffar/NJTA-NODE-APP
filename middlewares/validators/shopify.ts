import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create session validator
export const createSessionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  console.log(userId, "userIduserId");
  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
  });

  if (error) next(error);
  next();
};

// Get store validator
export const getStoreProductsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
  });

  if (error) next(error);
  next();
};
