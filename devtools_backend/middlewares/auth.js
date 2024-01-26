const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.header("xauthtoken");
  if (!token) {
    return res.status(401).send("No token. Auhtorisation denied");
  }
  try {
    const decode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = { ...decode.user };
    if (!req.user.user_id) {
      return res.status(400).send("No such user exists");
    }
    const user = await User.findById(req.user.user_id);
    if (!user || user.isDelete) {
      return res.status(400).send("No such user exists");
    }
    next();
  } catch (err) {
    res.status(401).send("Token is invalid");
  }
};