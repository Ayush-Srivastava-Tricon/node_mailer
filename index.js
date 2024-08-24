const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors())
app.use(express.json());
const nodemailer = require('nodemailer');
let OTP = '';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayushsrivastava1011@gmail.com',
    pass: 'ovbr qxpg epiw loxv'
  }
});

app.post("/getOtp", (req, res) => {
  sendMail(
    {
      from: 'laudalassan@gmail.com',
      to: req.body.email,
      subject: 'Sending Email using Node.js',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">MediStock</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for using MediStock. Use the following OTP to complete your Sign Up procedures</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${generateOTP()}</h2>
        <p style="font-size:0.9em;">Regards,<br />MediStock</p>
        <hr style="border:none;border-top:1px solid #eee" />`
    })
  res.send({ status: 200,value:OTP });
})

function generateOTP() {
  let optText = '';
  for (let i = 0; i < 4; i++) {
    optText += Math.floor(Math.random() * 10).toString();
  }

  OTP = optText;
  return optText;
}


function sendMail(mailOptions) {

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });

}



app.listen(3000, () => console.log("Server connected"));

