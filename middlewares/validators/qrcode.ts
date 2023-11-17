import Joi from "joi";
import { Request, Response, NextFunction } from "express";

// Specific user validator
export const createQrCodeValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, qrCodeImage, style, destinationUrl } = req.body;
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().required(),
    name: Joi.string(),
    qrCodeImage: Joi.string().required(),
    style: Joi.object(),
    destinationUrl: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    name,
    qrCodeImage,
    style,
    destinationUrl,
  });

  if (error) next(error);
  next();
};

// Add qr styles validator
export const qrStylesValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { styles } = req.body;
  const { userId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().required(),
    styles: Joi.array().items(Joi.object().length(1)).length(1).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    styles,
  });

  if (error) next(error);
  next();
};

// Update qr styles validator
export const qrStylesUpdateValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, styles } = req.body;

  // Validation Schema
  const schema = Joi.object({
    id: Joi.string().required(),
    styles: Joi.array().items(Joi.object().length(1)).length(1).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    id,
    styles,
  });

  if (error) next(error);
  next();
};

// Delete a qr validator
export const userQrCode = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId: id,
  });

  if (error) next(error);
  next();
};

// Delete a qr validator
export const deleteQrValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Validation Schema
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    id,
  });

  if (error) next(error);
  next();
};

// Delete a qr-code style validator
export const deleteQRcodeStyleValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  // Validation Schema
  const schema = Joi.object({
    id: Joi.string().required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    id,
  });

  if (error) next(error);
  next();
};

// Create global validatior
export const onCreateGlobalValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { blockType, blockOrder } = req.body;

  const { pageId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    blockType: Joi.string().required(),
    blockOrder: Joi.number().required(),
    pageId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    blockType,
    blockOrder,
    pageId,
  });

  if (error) next(error);
  next();
};

// Delete a qr-code styles by userid validator
export const deleteQRCodeValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, qrCodeId } = req.params;

  // Validation Schema
  const schema = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    qrCodeId: Joi.string().hex().length(24).required(),
  });

  // Schema Validation
  const { error } = schema.validate({
    userId,
    qrCodeId,
  });

  if (error) next(error);
  next();
};

// Delete a qr-code validator
export const qrCodeByUserIdValidator = (
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

//  Delete a qr-code validator
export const qrCodeStylesByUserIdValidator = (
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
