const { resObj } = require("../utils/resObj");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function normalizeEmail(email) {
  const [localPart, domain] = email.split("@");
  const normalizedLocalPart = localPart.replace(/\./g, "");

  return `${normalizedLocalPart}@${domain}`;
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(401).json(resObj(false, null, "Invalid email format"));
    }
    const normalisedEmail = normalizeEmail(email);
    const oldUser = await User.findOne({ normalisedEmail });
    if (oldUser) {
      return res.status(409).json(resObj(false, null, "User already exists"));
    }
    const encryptedPassword = bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = jwt.sign(
      { user: { user_id: user._id, email } },
      process.env.TOKEN_KEY,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    return res.status(200).json(resObj(true, { user, token }, "User created"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(401).json(resObj(false, null, "Invalid email format"));
    }
    const normalisedEmail = normalizeEmail(email);
    const user = await User.findOne({ normalisedEmail });
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    if (!bcrypt.compare(password, user.password)) {
      return res.status(409).json(resObj(false, null, "User doesn't exists"));
    }
    const token = jwt.sign(
      { user: { user_id: user._id, email } },
      process.env.TOKEN_KEY,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    return res.status(200).json(resObj(true, { user, token }, "User created"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(409).json(resObj(false, null, "Invalid Credentials"));
    }
    const token = jwt.sign(
      { user: { user_id: user._id, email } },
      process.env.TOKEN_KEY,
      {
        expiresIn: 24 * 60 * 60,
      }
    );
    return res.status(200).json(resObj(true, { user, token }, "User created"));
  } catch (err) {
    return res
      .status(500)
      .json(resObj(false, err.toString(), "Server Side Error"));
  }
};

module.exports = { register, login, getUser };
