import nodemailer from 'nodemailer';
import { connectMongoDB } from "../libs/MongoConnect";
import user from "../libs/models/userModel";

const sendVerificationToken = async (email) => {

    await connectMongoDB();
    const result = await user.findOne({email : email});
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL,
          pass: process.env.APP_PASSWORD,
        },
    });
    
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Verify Your ID',
        html: `<a href="http://localhost:3000/verify/${result._id}">Click Here To Verify</a>`
      };
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw new Error(error);
        } else {
          console.log("Email Sent");
          return true;
        }
    });
};

export default sendVerificationToken;