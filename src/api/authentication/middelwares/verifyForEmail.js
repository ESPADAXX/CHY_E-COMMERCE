const Account = require('../../../models/Account')
const jwt = require("jsonwebtoken")
exports.verifyForEmail = async (req, res) => {
     const { code } = req.body;

  try {
    const user = await Account.findOne({ verificationCode: code });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already verified'
      });
    }
    // Mark the user as verified and clear the verification code
    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

      const token = jwt.sign(
      {
        id: user._id,
        fullName: user.fullName,
        role: user.role,
      },
      process.env.JWT_KEY_SECRET,
      {
        expiresIn: "1w",
      }
    );
      return res.status(201).send({
        success: true,
        token,
        message: "email verified successfully",
      });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}
