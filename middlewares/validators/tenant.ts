import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// OTP validator
export const otpValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  // Validation Schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  // Schema Validation
  const { error } = schema.validate({
    email,
  });

  if (error) next(error);
  next();
};

// login validator
export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  // Validation Schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
  });

  // Schema Validation
  const { error } = schema.validate({
    email,
  });

  if (error) next(error);
  next();
};

// create tenant validator
export const createTenantValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email,password} = req.body;

  // Validation Schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password:Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    email,password
  });

  if (error) next(error);
  next();
};

// Update user
export const editUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { firstname, lastname, email, company } = req.body;

  // Validation Schema
  const schema = Joi.object({
    id: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    company: Joi.string(),
  });

  // Schema Validation
  const { error } = schema.validate({
    id,
    firstname,
    lastname,
    email,
    company
  });
  if (error) next(error);
  next();
};

// Delete a user validator
export const deleteUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Validation Schema
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    id,
  });

  if (error) next(error);
  next();
};
