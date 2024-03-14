import { NextFunction, Request, Response } from 'express';
import { ValidationChain, body, validationResult } from 'express-validator';

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware function to set up validation rules
export const setupValidationMiddleware = (validations: ValidationChain[]) => {
  return [
    // Add custom validation rules here if needed
    ...validations,
    handleValidationErrors, // Attach error handling middleware
  ];
};
