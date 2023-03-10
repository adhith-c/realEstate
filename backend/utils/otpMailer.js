require("dotenv").config();
const nodemailer = require("nodemailer");
const Otp = require("../models/otp");
const { hashOtp, compareOtp } = require("./helper");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,

  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendOtpVerification = async ({ _id, email }, req, res) => {
  try {
    console.log(
      "email to",
      email,
      process.env.MAIL_EMAIL,
      process.env.MAIL_PASSWORD
    );
    const otp = `${Math.floor(100000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.MAIL_EMAIL,
      to: email,
      //   subject: "Otp Verification",
      //   html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up </p><p> This code <b> Expires in 2 Minutes</b>.</p>`,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>", // html body
    };
    const hashedOtp = hashOtp(otp);
    const newOtpRecord = new Otp({
      userId: _id,
      userEmail: email,
      otp: hashedOtp,
      expiresAt: Date.now() + 120000,
    });

    await newOtpRecord.save();
    console.log("saved otp");
    await transporter.sendMail(mailOptions);
    console.log("saved");
    res.status(200).json({ newOtpRecord });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendOtpVerification };
