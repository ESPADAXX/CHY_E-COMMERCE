
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs').promises;
const loadTemplate = async (templatePath, code) => {
  const template = await fs.readFile(templatePath, 'utf-8');
  return ejs.render(template,{code});
};

exports.sendEmail = async (req, res) => {

    const emailContent = await loadTemplate(req.path, req.code );
    const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "houssamtkd03@gmail.com",
    pass: "nckutzhydzwovddj"
  },
    });

    const mailOptions = {
        from: "CHY_ECOMMERCE",
        to: req.email,
        subject: "Email Verification",
        html: emailContent
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({
              success: false,
              message: "Error sending verification email"
            });
        }
        return res
          .status(201)
          .json({
            success: true,
            message: req.successMessage,
          });
      });
}
