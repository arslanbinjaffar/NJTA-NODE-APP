import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create audio validator
export const createAudioValidator = (
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
    blockOrder: Joi.number().required(),
    blockType: Joi.string().required(),
    data: Joi.object({
      audioUrl: Joi.string().required(),
      title: Joi.string().required(),
    }).required(),
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

// Update audio validator
export const updateAudioValidator = (
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
      audioUrl: Joi.string().required(),
      title: Joi.string().required(),
    }).required(),
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

// Delete audio validator
export const deleteAudioValidator = (
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
