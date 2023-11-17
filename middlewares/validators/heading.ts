import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create heading validator
export const createHeadingValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    data: Joi.object({
      heading: Joi.string().required(),
    }).required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    pageId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    data,
    blockType,
    blockOrder,
    pageId,
    userId,
  });

  if (error) next(error);
  next();
};

// Get heading validator
export const getHeadingValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId, blockId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    pageId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    pageId,
    blockId,
  });

  if (error) next(error);
  next();
};

// Update heading validator
export const updateHeadingValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId, pageId, blockId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    pageId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
    data: Joi.object({
      heading: Joi.string().required(),
    }).required(),
    blockType: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    pageId,
    blockId,
    userId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// delete heading validator
export const deleteHeadingValidator = (
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
    pageId,
    blockId,
    userId,
  });

  if (error) next(error);
  next();
};
