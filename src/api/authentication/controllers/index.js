const express = require("express");
const Account = require("../../../models/Account");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const { create, readOne, updateOne } = require("../../../middlewares/crudPattern");
const { sendEmail } = require("../../../middlewares/sendEmail");
require("dotenv").config();

const generateVerificationCode = () => {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000);
};

exports.register = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const existingUser = await readOne(Account, { email });
    if (existingUser.success) {
      return res.status(409).send({
        success: false,
        message: "User already exists.",
      });
    } else {
      const verificationCode = generateVerificationCode();
      const hashedPassword = await bcrypt.hash(password, 10);
      await create(Account, {
        fullName,
        email,
        password: hashedPassword,
        verificationCode,
      });

      const successMessage = "User registered successfully. Verification email sent.";
      const path = './src/view/verificationForEmail.ejs';
       await sendEmail({
        email,
        successMessage,
        code: verificationCode,
        path
      }, res);

      res.status(202).json({
        success: true,
        message: "Registration successful. Check your email for verification.",
      });
    }
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      // duplicate key error
      return res.status(409).json({
        success: false,
        message: "Email already in use."
      });
    } else {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server Error"
      });
    }
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await readOne(Account, { email });
    if (!user.data) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.data.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid email or password" });
    }
    
    const verificationCode = generateVerificationCode();
    await updateOne(Account, user.data._id, { verificationCode, isActive: false , lastLogin:new Date()});

    const successMessage = "Verification email sent for login.";
    const path = './src/view/verificationForEmail.ejs';
    await sendEmail({
      email,
      successMessage,
      code: verificationCode,
      path
    }, res);

    const token = jwt.sign(
      {
        id: user.data._id,
        fullName: user.data.fullName,
        role: user.data.role,
      },
      process.env.JWT_KEY_SECRET,
      {
        expiresIn: "1w",
      }
    );
    return res.status(200).send({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

exports.ressetPassword = (req, res) => {
  const { email } = req.body;

  const verificationCode = generateVerificationCode();

  Account.findOneAndUpdate({ email }, { $set: { verificationCode } });

  const successMessage = "Verification email sent for password reset.";
  const path = './src/view/verificationForPassword.ejs';
  sendEmail({
    email,
    successMessage,
    code: verificationCode,
    path
  }, res);
};
