import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create video validator
export const createVideoValidator = (
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
      videoUrl: Joi.string().required(),
      thumbnail: Joi.string().required(),
      type: Joi.string().required(),
      tag: Joi.string().allow("").optional(),
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

// Update video validator
export const updateVideoValidator = (
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
    data: Joi.object().required(),
    blockType: Joi.string().required(),
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

// Delete video validator
export const deleteVideoValidator = (
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
