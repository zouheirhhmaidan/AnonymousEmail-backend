const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()
exports.Email =  async (req, res) => {
try {
    const { email } = req.body;
    const { subject } = req.body;
    const { text } = req.body;
    const transport = nodemailer.createTransport({
      host: process.env.REACT_APP_MAIL_HOST,
      port: process.env.REACT_APP_MAIL_PORT,
      auth: {
        user: process.env.REACT_APP_MAIL_USER,
        pass: process.env.REACT_APP_MAIL_PASS,
      },
    });
    console.log(email)
    await transport.sendMail({
      from: process.env.REACT_APP_MAIL_FROM,
      to: email,
      subject: subject,
      text: text,
    });
    res.status(200).json()
  } catch(err) {
    res.send(err)
    
  }
    
  }