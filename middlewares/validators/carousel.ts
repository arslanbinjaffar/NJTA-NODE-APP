import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create carousel validator
export const uploadCarouselValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockOrder, blockType, data } = req.body;
  const { userId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    data: Joi.object({
      carousel: Joi.array().items(Joi.string()).min(1),
    }).required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
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

// Get carousel validator
export const getCarouselValidator = (
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

// Update carousel validator
export const updateCarouseValidator = (
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
    data: Joi.object({
      carousels: Joi.array().items(Joi.string()).min(1),
    })
      .min(1)
      .required(),
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

// Delete carousel validator
export const deleteCarouseValidator = (
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
