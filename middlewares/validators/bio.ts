import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Delete a bio validator
export const onDeleteBioValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, blockId, pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    blockId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
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

// Create bio validator
export const onCreateBioValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  const { blockOrder, blockType, data } = req.body;
  console.log("🚀 ~ file: bio.ts:38 ~ data:", data);

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    pageId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    data: Joi.object({
      headline: Joi.string().required(),
      bioText: Joi.string().required(),
      url: Joi.string().allow("").optional(),
    }),
    // .min(2)
    // .required(),
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

// Edit a bio validator
export const onEditBioValidator = (
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
