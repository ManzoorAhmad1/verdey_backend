const express = require('express');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const Subscriber = require('../models/Subscriber');

const router = express.Router();

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const buildNotificationHtml = (email) => {
  const safeEmail = email ? email.trim() : 'N/A';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Newsletter Signup</title>
  </head>
  <body style="margin:0;padding:0;background:#f3ede2;font-family:'Cormorant Garamond',Georgia,serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3ede2;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border:1px solid #e8e0d6;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;text-align:center;background:#f8f3ed;">
                <img src="https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/logo-Verde-NYC-green.png" alt="Verde NYC" width="160" style="display:block;margin:0 auto;" />
                <p style="margin:12px 0 0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8C857B;">Yeeels Group</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#3A363A;">
                <h1 style="margin:0 0 16px;font-size:20px;letter-spacing:0.18em;text-transform:uppercase;">New Newsletter Signup</h1>
                <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#6f6a63;">
                  A user has joined the Yeeels Group community from the website footer.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8f3ed;border-radius:10px;padding:14px 16px;">
                  <tr>
                    <td style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#8C857B;padding-bottom:6px;">Subscriber Email</td>
                  </tr>
                  <tr>
                    <td style="font-size:16px;letter-spacing:0.02em;color:#3A363A;">${safeEmail}</td>
                  </tr>
                </table>
                <p style="margin:16px 0 0;font-size:12px;line-height:1.7;color:#8C857B;">
                  This message was generated automatically by the Verde NYC website.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#f8f3ed;text-align:center;color:#8C857B;font-size:12px;letter-spacing:0.08em;">
                Verde NYC • 85 10th Ave • New York, NY 10011
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

router.post('/', async (req, res) => {
  try {
    const { name = '', email = '' } = req.body || {};
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email.' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: 'You are already subscribed.' });
    }

    const subscriber = await Subscriber.create({
      name: name.trim(),
      email: email.toLowerCase(),
      source: 'footer',
    });

    const fromEmail = process.env.SES_FROM_EMAIL || process.env.AWS_SES_FROM_EMAIL;
    const notifyEmail = process.env.SES_NOTIFY_EMAIL || fromEmail;
    if (fromEmail && notifyEmail) {
      const command = new SendEmailCommand({
        Source: fromEmail,
        Destination: {
          ToAddresses: [notifyEmail],
        },
        Message: {
          Subject: { Data: 'New Newsletter Signup - Verde NYC', Charset: 'UTF-8' },
          Body: {
            Html: { Data: buildNotificationHtml(subscriber.email), Charset: 'UTF-8' },
            Text: { Data: `New signup: ${subscriber.email}`, Charset: 'UTF-8' },
          },
        },
      });
      try {
        await sesClient.send(command);
        console.log(`Email sent successfully to ${notifyEmail}`);
      } catch (sendError) {
        console.error('Email send failed:', sendError?.message || sendError);
      }
    } else {
      console.warn('Email not sent: SES_FROM_EMAIL or SES_NOTIFY_EMAIL missing');
    }

    return res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(200).json({ message: 'You are already subscribed.' });
    }
    console.error('Subscriber error:', error);
    return res.status(500).json({ message: 'Unable to subscribe right now.' });
  }
});

module.exports = router;
