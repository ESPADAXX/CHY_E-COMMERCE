const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AccountModel = require("../models/Account");
require("dotenv").config();
export const register = async (req, res) => {
  // Get data from http request body
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password)
    return res.status(400).send({
      success: false,
      message: "Missing fields",
    });
  const existingUser = await AccountModel.findOne({ email: username });
  if (existingUser) {
    return res.status(409).send({
      success: false,
      message: "User already exists.",
    });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    await AccountModel.create({
      name: req.body.name,
      email: username,
      password: hashedPassword
    });
    return res.status(201).send({
      success: true,
      message: "has registred successfully",
    });
  }
};
export const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  try {
    const user = await AccountModel.findOne({ email: username });

    if (!user) {
      return res
        .status(401)
        .send({ auth: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ auth: false, message: "Invalid email or password" });
    }

    return res.status(200).send({
      auth: true,
      token: jwt.sign(
        {
          id: user._id,
          fullName: user.fullName,
          role: user.role,
        },
        process.env.JWT_KEY_SECRET,
        {
          expiresIn: "1w",
        }
      ),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ auth: false, message: "Internal server error" });
  }
};
