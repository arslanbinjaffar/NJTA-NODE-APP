import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// App link create validator
export const appLinkCreateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    data: Joi.object({
      ios: Joi.string().allow(""),
      android: Joi.string().allow(""),
    })
      .min(1)
      .required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockOrder,
    blockType,
    data,
    pageId,
    userId,
  });

  if (error) next(error);
  next();
};

// Update App Link validator
export const updateAppLinkValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId, blockId } = req.params;
  const { blockType, data } = req.body;
  // Validation Schema
  const schema = Joi.object({
    data: Joi.object({
      ios: Joi.string(),
      android: Joi.string(),
    })
      .min(1)
      .required(),
    blockType: Joi.string().required(),
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    pageId,
    userId,
    blockId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// Delete App Link validator
export const deleteAppLinkValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId, blockId, userId } = req.params;

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
