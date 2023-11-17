import Joi from "joi";
import { Request, Response, NextFunction } from "express";

//Page validator
export const createPageValidator = (
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

//Page update validator
export const pageUpdateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, visibility } = req.body;

  const { pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    title: Joi.string().allow("").optional(),
    visibility: Joi.bool().allow("").optional(),
    thumbnail: Joi.string().allow("").optional(),
    pageId: Joi.string().hex().length(24).required(),
  }).min(1);

  // Schema Validation
  const { error } = schema.validate({
    title,
    visibility,
    pageId,
  });

  if (error) next(error);
  next();
};

// Get Page validator
export const getPageValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId, userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    pageId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    pageId,
    userId,
  });

  if (error) next(error);
  next();
};

// Get web page validator
export const getSingleWebPageValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    pageId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    pageId,
  });

  if (error) next(error);
  next();
};

// Get all Page validator
export const getAllPageValidator = (
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
// Delete Page validator
export const deleteValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
  });

  if (error) next(error);
  next();
};

// Insert block validator
export const insertBlockValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  const { blockType, blockOrder, data } = req.body;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().integer().required(),
    data: Joi.object({
      id: Joi.string().hex().length(24).required(),
    })
      .min(1)
      .required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    blockType,
    blockOrder,
    data,
  });

  if (error) next(error);
  next();
};

// Insert block validator
export const reorderContentBlocksValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  const { data } = req.body;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    data: Joi.object({
      contentBlocks: Joi.array().items().min(1).required(),
    }),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    data,
  });

  if (error) next(error);
  next();
};
