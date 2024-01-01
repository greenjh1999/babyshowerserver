const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true}));

const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'process.env.EMAIL_USER',
    pass: 'process.env.EMAIL_PASSWORD',
  },
});

app.post('/sendrsvp', (req, res) => {
  const mailOptions = {
    from: 'no_reply_john_green@outlook.com',
    to: 'johngreenmauhs12345@gmail.com',
    subject: `New Babyshower RSVP from ${req.body.name}`,
    text: `${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email Sent!');
  });
});

app.listen(PORT, () => {
  console.log(`Server is Live on port ${PORT}`);
});