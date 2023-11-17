import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create global validatior
export const onCreateGlobalValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { blockType, data } = req.body;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    data: Joi.object({
      heading: Joi.string().required(),
    }).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

export const onEditGlobalValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { blockType, data } = req.body;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    data: Joi.object().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// Delete a global validatior
export const onDeleteGlobalValidator = (
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

// Get a global validator
export const onGetGlobalsByUserId = (
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
