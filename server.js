require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

const path = require('path');
const PORT = process.env.PORT || 8080;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'html')
  .get('/', (req, res) => res.render('index'))
  .post('/email', urlencodedParser, (req, res) => {
    //Send an email here but currently dummy email
    console.log('Data:', req.body);


    const email = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `From: ${req.body.name}`,
      html:`<p><b>Email:</b> ${req.body.email}</p><br/><p><b>Message:</b> ${req.body.text}</p>`
    };

    TRANSPORTER.sendMail(email, (error, info) => {
      if (error) {
        res.end({ message: 'Message received!' })
        console.log(error);
      } else {
        res.end('ko')
        console.log('Email sent: ' + info.response);
      }
    });

  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
