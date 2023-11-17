import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create contact card validator
export const createContactCardValidator = (
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
      firstname: Joi.string().allow("").optional(),
      lastname: Joi.string().allow("").optional(),
      company: Joi.string().allow("").optional(),
      position: Joi.string().allow("").optional(),
      email: Joi.string().allow("").optional(),
      phone: Joi.string().allow("").optional(),
      address1: Joi.string().allow("").optional(),
      address2: Joi.string().allow("").optional(),
      city: Joi.string().allow("").optional(),
      state: Joi.string().allow("").optional(),
      zip: Joi.string().allow("").optional(),
      country: Joi.string().allow("").optional(),
      buttonText: Joi.string().allow("").optional(),
      icon: Joi.string().allow("").optional(),
      highlight: Joi.bool().allow("").optional(),
      allowDownload: Joi.bool().allow("").optional(),
      downloadButtonText: Joi.string().allow("").optional(),
    })
      .required()
      .min(1),
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

// Update contact card validator
export const updateContactCardValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, data } = req.body;
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    blockType: Joi.string().required(),
    data: Joi.object({
      firstname: Joi.string().allow("").optional(),
      lastname: Joi.string().allow("").optional(),
      company: Joi.string().allow("").optional(),
      position: Joi.string().allow("").optional(),
      email: Joi.string().allow("").optional(),
      phone: Joi.string().allow("").optional(),
      address1: Joi.string().allow("").optional(),
      address2: Joi.string().allow("").optional(),
      city: Joi.string().allow("").optional(),
      state: Joi.string().allow("").optional(),
      zip: Joi.string().allow("").optional(),
      country: Joi.string().allow("").optional(),
      buttonText: Joi.string().allow("").optional(),
      icon: Joi.string().allow("").optional(),
      highlight: Joi.bool().optional(),
      allowDownload: Joi.bool().optional(),
      downloadButtonText: Joi.string().allow("").optional(),
    })
      .required()
      .min(1),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    blockType,
    data,
  });

  if (error) next(error);
  next();
};

// Delete contact card validator
export const deleteContactCardValidator = (
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
