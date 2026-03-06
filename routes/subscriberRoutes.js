const express = require('express');
const nodemailer = require('nodemailer');
const Subscriber = require('../models/Subscriber');
const SiteSettings = require('../models/SiteSettings');

const router = express.Router();
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const mailTransport = smtpUser && smtpPass
  ? nodemailer.createTransport({
    service: 'gmail',
    auth: { user: smtpUser, pass: smtpPass },
  })
  : null;

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const buildNotificationHtml = (email) => {
  const safeEmail = email ? email.trim() : 'N/A';
  const now = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'long', timeStyle: 'short' });
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Newsletter Signup</title>
  </head>
  <body style="margin:0;padding:0;background:#F4F0EA;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F0EA;padding:48px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;width:100%;">

            <!-- HEADER -->
            <tr>
              <td style="background:#ffffff;padding:48px 48px 32px;text-align:center;border-top:3px solid #1C2B1C;">
                <p style="margin:0 0 10px;font-size:8px;letter-spacing:0.55em;text-transform:uppercase;color:#9DBF9E;">A Yeeels Group Destination</p>
                <h1 style="margin:0;font-size:32px;font-weight:400;letter-spacing:0.28em;text-transform:uppercase;color:#1C2B1C;font-family:Georgia,serif;">Verde NYC</h1>
                <div style="margin:20px auto 0;width:36px;height:1px;background:#C8BFB0;"></div>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="background:#ffffff;padding:32px 48px 44px;">

                <h2 style="margin:0 0 6px;font-size:11px;font-weight:400;letter-spacing:0.45em;text-transform:uppercase;color:#9DBF9E;font-family:Georgia,serif;">Newsletter</h2>
                <h3 style="margin:0 0 28px;font-size:20px;font-weight:400;letter-spacing:0.15em;text-transform:uppercase;color:#1C2B1C;font-family:Georgia,serif;">New Subscriber</h3>

                <!-- Divider -->
                <div style="height:1px;background:#EAE5DC;margin-bottom:28px;"></div>

                <!-- Subscriber card -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F0EA;border-radius:3px;margin-bottom:28px;">
                  <tr>
                    <td style="padding:22px 26px;">
                      <p style="margin:0 0 8px;font-size:8px;letter-spacing:0.45em;text-transform:uppercase;color:#9DBF9E;">Subscriber Email</p>
                      <p style="margin:0;font-size:17px;letter-spacing:0.03em;color:#1C2B1C;">${safeEmail}</p>
                    </td>
                  </tr>
                </table>

                <!-- Date -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:28px;">
                  <tr>
                    <td>
                      <p style="margin:0 0 6px;font-size:8px;letter-spacing:0.45em;text-transform:uppercase;color:#9DBF9E;">Received</p>
                      <p style="margin:0;font-size:13px;letter-spacing:0.03em;color:#5A5550;">${now} ET</p>
                    </td>
                  </tr>
                </table>

                <!-- Divider -->
                <div style="height:1px;background:#EAE5DC;margin-bottom:20px;"></div>

                <p style="margin:0;font-size:11px;line-height:1.9;color:#A8A099;font-style:italic;">
                  This notification was generated automatically by the Verde NYC website.
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#1C2B1C;padding:22px 48px;text-align:center;">
                <p style="margin:0;font-size:8px;letter-spacing:0.42em;text-transform:uppercase;color:#9DBF9E;">
                  Verde NYC &nbsp;&middot;&nbsp; 85 10th Ave, New York NY 10011
                </p>
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
    const { email = '' } = req.body || {};
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email.' });
    }

    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'You are already subscribed.' });
    }
    let subscriber;
    if (!existing) {
      subscriber = await Subscriber.create({
        email: email.toLowerCase(),
        source: 'footer',
      });
    }
    const settings = await SiteSettings.findById('global');
    const notifyEmail = settings?.newsletterNotifyEmail?.trim();
    console.log(notifyEmail, 'notify')
    console.log('Newsletter notify email:', notifyEmail || 'not set');
    console.log('SMTP user present:', Boolean(smtpUser));
    console.log('SMTP pass present:', Boolean(smtpPass));
    if (mailTransport && smtpUser && notifyEmail) {
      try {
        await mailTransport.verify();
        console.log('SMTP transport verified');
        await mailTransport.sendMail({
          from: smtpUser,
          to: notifyEmail,
          subject: 'New Newsletter Signup - Verde NYC',
          text: `New signup: ${existing?.email ? existing?.email : subscriber.email}`,
          html: buildNotificationHtml(subscriber.email),
        });
        console.log(`Email sent successfully to ${notifyEmail}`);
      } catch (sendError) {
        console.error('Email send failed:', sendError?.message || sendError);
      }
    } else {
      console.warn('Email not sent: SMTP_USER/SMTP_PASS or NOTIFY_EMAIL missing');
    }

    return res.status(201).json({ message: 'Subscribed successfully.' });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ message: 'You are already subscribed.' });
    }
    console.error('Subscriber error:', error);
    return res.status(500).json({ message: 'Unable to subscribe right now.' });
  }
});

module.exports = router;
