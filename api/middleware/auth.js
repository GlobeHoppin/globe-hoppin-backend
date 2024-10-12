const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const { check, param ,body} = require('express-validator');

export const validateToken = async (req, res, next) => {
  try {
    const { headers: { authorization = "", "x-access-token": xAccessToken = "" } } = req;
    const token = xAccessToken || authorization;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded.data; 
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const checkAuthorisation = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authorized" });
  }
  next();
};



export const validatePin = [
  check('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a valid number between -90 and 90'),
  check('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a valid number between -180 and 180'),
  check('title')
    .notEmpty()
    .withMessage('Title is required'),
];


export const validateUpdatePin = [
  param('id').isMongoId().withMessage('Invalid pin ID format'),

  body('latitude').optional().isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('longitude').optional().isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  body('title').optional().isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description').optional().isString().isLength({ max: 500 }).withMessage('Description cannot be longer than 500 characters'),

];