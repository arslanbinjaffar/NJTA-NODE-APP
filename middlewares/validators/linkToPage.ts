import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create linkToPage validator
export const onCreateLinkToPageValidator = (
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
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    data: Joi.object({
      selectedPageId: Joi.string().required(),
      buttonText: Joi.string().required(),
      icon: Joi.string().required(),
      highlight: Joi.boolean().required(),
    }).required(),
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

// Update linkToPage validator
export const onEditLinkToPageValidator = (
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
      selectedPageId: Joi.string().required(),
      buttonText: Joi.string().required(),
      icon: Joi.string().required(),
      highlight: Joi.boolean().required(),
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

// Delete linkToPage validator
export const onDeleteLinkToPageValidator = (
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
