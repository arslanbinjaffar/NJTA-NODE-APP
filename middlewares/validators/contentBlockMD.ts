import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Create content block meta data validatior
export const onCreateCBMDValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, subtitle, global, pro, icon, section, blockLimit, blockType } =
    req.body;

  // Validation Schema
  const schema = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    global: Joi.boolean().required(),
    pro: Joi.boolean().required(),
    icon: Joi.string().required(),
    section: Joi.string().required(),
    blockLimit: Joi.number().required(),
    blockType: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    title,
    subtitle,
    global,
    pro,
    icon,
    section,
    blockLimit,
    blockType,
  });

  if (error) next(error);
  next();
};

// Edit content block meta data validatior
export const onEditCBMDValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockId } = req.params;
  const { title, subtitle, global, pro, icon, section, blockLimit, blockType } =
    req.body;

  // Validation Schema
  const schema = Joi.object({
    blockId: Joi.string().hex().length(24).required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    global: Joi.bool().required(),
    pro: Joi.bool().required(),
    icon: Joi.string().required(),
    section: Joi.string().required(),
    blockLimit: Joi.number().required(),
    blockType: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockId,
    title,
    subtitle,
    global,
    pro,
    icon,
    section,
    blockLimit,
    blockType,
  });

  if (error) next(error);
  next();
};

// Delete content block meta data validatior
export const onDeleteCBMDValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    blockId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockId,
  });

  if (error) next(error);
  next();
};
