const sgMail = require("@sendgrid/mail");
const AppError = require("./AppError");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options, res, next) => {
  const msg = {
    to: object.recipient, // Change to your recipient
    from: process.env.SENDGRID_VERIFIED_SENDER, // Change to your verified sender
    subject: options.subject,
    html: options.template,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      return next(new AppError(error.message, 404));
    });
};

module.exports = sendEmail;
