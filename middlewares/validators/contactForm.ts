import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create contact form validator
export const onCreateContactFormValidator = (
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
      name: Joi.boolean().required(),
      emailaddress: Joi.boolean().required(),
      phone: Joi.boolean().required(),
      message: Joi.boolean().required(),
      email: Joi.string().allow("", null),
      buttonText: Joi.string().required(),
      icon: Joi.string().required(),
      highlight: Joi.boolean().required(),
      formButtonText: Joi.string().required(),
      formConfirmationText: Joi.string().required(),
    }).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    pageId,
    blockOrder,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// Update contact form validator
export const onEditContactFormValidator = (
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
      name: Joi.boolean().required(),
      emailaddress: Joi.boolean().required(),
      phone: Joi.boolean().required(),
      message: Joi.boolean().required(),
      email: Joi.string().allow("", null),
      buttonText: Joi.string().required(),
      icon: Joi.string().required(),
      highlight: Joi.boolean().required(),
      formButtonText: Joi.string().required(),
      formConfirmationText: Joi.string().required(),
    }).required(),
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

// Delete contact form validator
export const onDeleteContactFormValidator = (
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
