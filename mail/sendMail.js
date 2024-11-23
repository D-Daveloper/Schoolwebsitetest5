import { config } from 'dotenv';
import nodemailer from 'nodemailer';

// const nodemailer = require("nodemailer");

config();

//It's time to send the incoming user a mail with a verification code we generated earlier on
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASS,
  },
});

const sendEmail = async (email, subject,file, html) => {
  
  try {
    let info;
    if (file && file != ''){
      const fileBuffer = fs.readFileSync(file.tempFilePath); // Read the temp file as Buffer
      info = await transporter.sendMail({
        from: `"Orkids"`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject
        html: html, // html body
        attachments:[
          {
            filename:file.name,
            content: fileBuffer
          }
        ],
      });
    }else{
      info = await transporter.sendMail({
        from: `"Orkids"`, // sender address
        to: email, // list of receivers
        subject: subject, // Subject
        html: html, // html body
      });
    }
    // .catch(console.error);
    // console.log(info)
    return info ? info.messageId : null;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail ;
