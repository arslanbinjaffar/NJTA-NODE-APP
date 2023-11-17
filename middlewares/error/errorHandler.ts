import express from "express";

// Custom error handler
const errorHandler = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).json({
    status: 500,
    success: false,
    data: null,
    message: error.message,
  });
};
export { errorHandler };
