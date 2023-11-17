import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create text validator
export const createTextValidator = (
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
      text: Joi.string().required(),
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

// Update text validator
export const updateTextValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId, pageId, blockId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    data: Joi.object({
      text: Joi.string().required(),
    }).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    blockId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// Delete text validator
export const deleteTextValidator = (
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
