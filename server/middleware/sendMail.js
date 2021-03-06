
import nodemailer from 'nodemailer';


require('dotenv').config();

const useremail = process.env.USEREMAIL;
const userpass = process.env.USERPASS;

/**
 * function to send mail
 * @param {string} email
 * @param {string} hash
 * @param {string} headers
 * @return {void}
 */
const sendMail = (email, hash, headers) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // secure:true for port 465, secure:false for port 587
    auth: {
      user: useremail,
      pass: userpass
    }
  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"IDEA-BOX" <postit.nownow@gmail.com>', // sender address
    to: email,
    subject: 'Reset Your Password_IDEABOX', // Subject line
    html: `<body><div>
            <div style="background-color:#f2f3f5;padding:20px">
              <div style="max-width:600px;margin:0 auto">
               <div 
                style="
                  background:#fff;
                  font:14px sans-serif;
                  color:#686f7a;
                  border-top:4px solid #a6c6a6;
                  border-bottom:4px solid #a6c6a6;
                  border-right:4px solid #a6c6a6;   
                  border-left:4px solid #a6c6a6;
                  margin-bottom:20px">
                <div 
                  style="
                   border-bottom:1px solid #f2f3f5;
                   padding-bottom:20px;
                   padding-top:20px">
                  <h4 
                    style="
                      padding-top:0; 
                      padding-left:20px; 
                      margin:0; 
                      font-size:30px;">
                      <img height="40px"
                        style="margin-left: 2%; width: 20%; height: 20%"
                        src="https://res.cloudinary.com/dcpfdxsly/image/upload/v1512474925/ideaBox_copy_u4gdxd.png">
                      Idea-Box</h4>
                </div>
                <div style="padding:30px 20px;line-height:1.5em;color:#686f7a">
                  <p style="color:#737373">Hi ${email},</p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                     A password reset for your account was requested.
                  </p>
                  <p 
                    style="
                      border-bottom:1px solid #f2f3f5;
                      padding-bottom:20px;
                      margin-bottom:20px;
                      color:#686f7a">
                      Please click the button below to change your password.
                  </p>
                  <a href="http://${headers}/update-password/${hash}" 
                    style="
                      display:inline-block;
                      font-size:15px;color:#ffffff;
                      padding:10px 15px;
                      text-decoration:none;
                      background-color:#a6c6a6;
                      border-radius:3px" 
                      target="_blank">
                      Change Your Password
                  </a>
                </div>
             </div>
            </div>
          </body>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
  });
};

export default sendMail;
