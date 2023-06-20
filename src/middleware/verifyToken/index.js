const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  let token;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token provided");
      }
      req.user = decoded.user;
      next();
    });
  }

  if (!token) {
    res.status(402);
    throw new Error("Token not provided");
  }
};

module.exports = verifyToken;
