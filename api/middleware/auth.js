const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

export const validateToken = async (req, res, next) => {
  try {
    const {
      headers: { authorization = "", "x-access-token": xAccessToken = "" } = {},
    } = req;
    const token = xAccessToken || authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", status: 401 });
    }

    const decoded = jwt.verify(token, secret);
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ message: "Token expired", status: 401 });
    }
    req.user = decoded.data;
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token is expried.' })
  }
};

// TODO: Check authorization of pin to update and delete
export const checkAuthorisation = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}