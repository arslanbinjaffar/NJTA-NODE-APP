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
  const { email, password } = req.body;

  // Validation Schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    email,
    password
  });

  if (error) next(error);
  next();
};

// Signup validator
export const signupValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, phoneNumber, email, referCode,
    password,
    role } = req.body;

  // Validation Schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().strict().required(),
    password: Joi.string().required(),
    firstName: Joi.string().default(null),
    lastName: Joi.string().default(null),
    referCode: Joi.string().allow(""),
    role: Joi.string().default('user').valid('admin', 'manager', 'user')
  });

  // Schema Validation
  const { error } = schema.validate({
    firstName,
    lastName,
    phoneNumber,
    email,
    referCode,
    password,
    role
  });

  if (error) next(error);
  next();
};

// update User validator
export const updateUserInfoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { gender,
    birthday,
    trainingGoals,
    bodyType: {
      height,
      heightUnit,
      weight,
      weightUnit
    }
  } = req.body;

  console.log(req.body)

  // Validation Schema
  const schema = Joi.object({
    gender: Joi.string().required(),
    birthday: Joi.string().required(),
    trainingGoals: Joi.array().required(),
    bodyType: Joi.object({
      height: Joi.string().required(),
      heightUnit: Joi.string().required(),
      weight: Joi.string().required(),
      weightUnit: Joi.string().required(),
    }),
  });

  // Schema Validation
  const { error } = schema.validate({
    gender,
    birthday,
    trainingGoals,
    bodyType: {
      height,
      weight,
      heightUnit,
      weightUnit
    },
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
