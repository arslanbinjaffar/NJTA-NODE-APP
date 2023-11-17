import Joi from "joi";
import { Request, Response, NextFunction } from "express";

//Links Social Link validator
export const createSocialLinkValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    blockType: Joi.string().required(),
    data: Joi.array()
      .items(
        Joi.object({
          accountUrl: Joi.string().allow("").optional(),
          icon: Joi.string().required(),
          platform: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockType,
    data,
    userId,
  });

  if (error) next(error);
  next();
};

//Social icons Links update validator
export const updateLinksValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, pageId } = req.params;
  const { blockType, blockOrder, data } = req.body;
  // Validation Schema
  const schema = Joi.object({
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    data: Joi.array().items().min(1).required(),
    pageId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockType,
    blockOrder,
    data,
    pageId,
    userId,
  });

  if (error) next(error);
  next();
};

//Social icons Links delete validator
export const deleteLinksValidator = (
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
