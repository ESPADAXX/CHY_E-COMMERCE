const express = require("express");
const Account = require("../../../models/Account");
const bcrypt = require("bcrypt");
const {
  create,
  readOne,
  updateOne,
} = require("../../../middlewares/crudPattern");

const session = require("express-session");
const { sendEmail } = require("../../../middlewares/sendEmail");
require("dotenv").config();
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const generateVerificationCode = () => {
  // Generate a random 6-digit code
  return Math.floor(100000 + Math.random() * 900000);
};

exports.register = async (req, res) => {
  const { email, fullName, password, confirmPassword } = req.body;
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

      const successMessage =
        "User registered successfully. Verification email sent.";
      const path = "./src/view/verificationForEmail.ejs";
      const response = await sendEmail(
        {
          email,
          successMessage,
          code: verificationCode,
          path,
        },
        res
      );
      res.status(201).json(response);
    }
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      // duplicate key error
      return res.status(409).json({
        success: false,
        message: "Email already in use.",
      });
    } else {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Server Error",
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
    await updateOne(Account, user.data._id, {
      verificationCode,
      isActive: false,
      lastLogin: new Date(),
    });

    const successMessage = "Verification email sent for login.";
    const path = "./src/view/verificationForEmail.ejs";
    const response = await sendEmail(
      {
        email,
        successMessage,
        code: verificationCode,
        path,
      },
      res
    );
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  const verificationCode = generateVerificationCode();

  await Account.findOneAndUpdate({ email }, { $set: { verificationCode } });

  const successMessage = "Verification email sent for password reset.";
  const path = "./src/view/verificationForPassword.ejs";
  const response = await sendEmail(
    {
      email,
      successMessage,
      code: verificationCode,
      path,
    },
    res
  );
  res.status(201).json(response);
};
exports.logout = (req, res) => {
  // Check if a valid token is present in the session
  if (!req.session.token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized. No valid session.",
    });
  }

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send({ success: false, message: "Internal server error" });
    }

    return res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  });
};
exports.oAuth2 = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in your database
          const user = await readOne(Account, { googleId: profile.id });
          if (user.success) {
            user.accessToken = accessToken;
            await user.data.save();
            return done(null, user);
          } else {
            // User does not exist, create a new user
            const newUser = await create(Account, {
              email: profile.emails[0].value,
              fullName: profile.displayName,
              googleId: profile.id,
            });

            if (newUser.success) {
              newUser.accessToken = accessToken;
              return done(null, newUser);
            } else {
              // Error creating user
              return done(null, false, { message: "Error creating user." });
            }
          }
        } catch (error) {
          // Handle errors
          console.error(error);
          return done(error, false, {
            message: "Error processing Google authentication.",
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await readOne(Account, { _id: id });

      if (user.success) {
        done(null, user);
      } else {
        done(null, false, { message: "User not found." });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      done(error, false, { message: "Error deserializing user." });
    }
  });
};
