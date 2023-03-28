import nodemailer from "nodemailer"

export const sendMail=async(emailToSend,token,name)=>{
       
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USERNAME, // replace with your own Gmail username
              pass: process.env.EMAIL_PASSWORD, // replace with your own Gmail password
            },
          });

          const message = {
            from: process.env.EMAIL_FROM, // replace with your own Gmail address
            to: email,
            subject: 'Reset your password',
            html: `
              <p>Hi ${name},</p>
              <p>You have requested to reset your password.</p>
              <p>Click <a href="http://localhost:3000?token=${token}">here</a> to reset your password.</p>
              <p>If you did not request this, please ignore this email.</p>
            `,
          };
          
          transporter.sendMail(message);

          return {status:1}
        
    } catch (error) {
        return {status:0,message:error.message}
    }


}