const Account = require('../../../models/Account');
const jwt = require("jsonwebtoken");
const session = require('express-session');

exports.verifyForEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await Account.findOneAndUpdate(
      { verificationCode: code, isVerified: false },
      { $set: { isVerified: true, verificationCode: undefined } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already verified'
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        role: user.role
      },
      process.env.JWT_KEY_SECRET,
      {
        expiresIn: "1w",
      }
    );

    req.session.userId = user._id;
    req.session.token = token;
    req.session.loggedin = true;
    req.session.role = user.role;
    await req.session.save();
    return res.status(201).send({
      success: true,
      token,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
