const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


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


