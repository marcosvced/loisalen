require('dotenv').config()

const express = require('express')
const serverless = require('serverless-http')
const nodemailer = require('nodemailer')
const app = express()
const router = express.Router()
const TRANSPORTER = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
})

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/email', urlencodedParser, (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  //Send an email here but currently dummy email
  console.log('Data:', req.body)
  const {
    name,
    email,
    text
  } = req.body
  const options = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `From: ${name}`,
    html: `<p><b>Email:</b> ${email}</p><br/><p><b>Message:</b> ${text}</p>`
  }
  res.end(JSON.stringify(options))

  TRANSPORTER.sendMail(options).then(response => {
    res.end(JSON.stringify(response))
  })

})
app.use('/.netlify/functions/server', router)
module.exports.handler = serverless(app)
