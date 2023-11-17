import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create logo validator
export const createLogoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    data: Joi.object({
      logoUrl: Joi.string().required(),
    }).required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    data,
    blockType,
    blockOrder,
  });

  if (error) next(error);
  next();
};

// Update logo validator
export const updateLogoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    data: Joi.object({
      logoUrl: Joi.string().required(),
    }).required(),
    blockType: Joi.string().required(),
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

// Delete logo validator
export const deleteLogoValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    blockId,
  });

  if (error) next(error);
  next();
};
