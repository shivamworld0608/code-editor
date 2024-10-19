import { body, validationResult } from 'express-validator';

export const validateRegistration = [
  body('username').isString().trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateLogin = [
  body('username').isString().trim().notEmpty(),
  body('password').isString().trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateCommand = (socket, next) => {
  const { command } = socket.data;
  if (typeof command !== 'string' || command.trim().length === 0) {
    return next(new Error('Invalid command'));
  }
  // Add more specific command validation here if needed
  next();
};