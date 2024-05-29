const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");
const path = require("path");
const Joi = require("joi");
const { v4: uuid } = require("uuid");
const { createToken } = require("../utils/jwt");

const loginSchema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(6).required(),
});

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { error } = loginSchema.validate({ username, password });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(403).json({ message: "Incorrect username or password" });
    }

    const verify = await bcrypt.compare(password, findUser.password);
    if (!verify) {
      return res.status(403).json({ message: "Incorrect username or password" });
    }

    const token = createToken({ id: findUser.id });
    res.json({ message: "You are successfully logged in", data: findUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;
    const { photo } = req.files;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "Username already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const photoName = `${uuid()}${path.extname(photo.name)}`;
    await photo.mv(`${process.cwd()}/uploads/${photoName}`);

    const newUser = new User({ username, password: hashedPassword, fullname, photoName });
    await newUser.save();

    const token = createToken({ id: newUser._id });
    res.status(201).json({ message: "User registered successfully", data: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  register,
};
