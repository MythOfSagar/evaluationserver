const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.key);

    if (decodedToken) {
        req.body.userid=decodedToken.iat
      next()
    }
    else {
        res.send("LogIn First");
      }
  } else {
    res.send("LogIn First");
  }
};

module.exports = authenticate;
