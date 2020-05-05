import crypto from 'crypto';

import { datumCreate } from '../actions/datum';

import transporter from './nodemailer';

import { SITE_URL, EMAIL_VERIFICATION_ENABLED } from 'helpers/constants';
import lockPromise from 'utils/lock';

const EMAIL_WIDTH = '600px';
const FONT_SIZE_SM = '18px';
const FONT_SIZE_BASE = '24px';
const emailOuter = branding => `<html lang="en">
  <head>
    <meta charset="utf-8">
    <link href="https://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700" rel="stylesheet" />
  </head>
  <body style="font-family: 'Quattrocento Sans', sans-serif; width: 100% !important; height: 100vh !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: -1px 0 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="border: 0; border-collapse: collapse; font-size: ${FONT_SIZE_BASE}; width: 100%; margin: 0 auto;>
      <tr style="align: center;">
        <td bgcolor="${branding.primaryColorFaded}">
          <table border="0" cellpadding="0" cellspacing="0" style="border: 0; border-collapse: collapse; align: left; color: #1e1e1e; font-size: ${FONT_SIZE_BASE}; width: 100%; max-width: ${EMAIL_WIDTH}; margin: 0 auto;">`;
const EMAIL_OUTER_END = `</table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
const emailLogoHeader = branding => `<tr>
          <td bgcolor="${branding.primaryColor}" style="padding: 24px; color: white; font-size: 32px;">
            <div style="text-align: center;">
              ${branding.imageHtml}
            </div>
          </td>
        </tr>`;

export function sendMagicLinkEmail(
  userProfile,
  branding,
  buttonStyle,
  senderEmail,
  divertToAdmin,
  loginRedirect,
) {
  const now = new Date();
  const oneHoursTime = new Date(now.getTime() + 1 * 1000 * 60 * 60);
  const magicLink = {
    userId: userProfile.id,
    expiry: oneHoursTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  lockPromise('magiclinks', () =>
    datumCreate({ redisKey: 'magiclinks' }, { body: magicLink }),
  );
  let magicLinkUrl = `${SITE_URL}/magic-login?token=${magicLink.key}`;
  if (loginRedirect) {
    magicLinkUrl += `&redirect=${loginRedirect}`;
  }
  // Send the magic link URL to the email address of the user
  transporter.sendMail(
    {
      from: senderEmail,
      to: divertToAdmin
        ? 'g+diverted-to-admin@georgegillams.co.uk'
        : userProfile.email,
      subject: 'Your magic login link',
      text: `Your magic link is:
${magicLinkUrl}\n\nIt will expire ${oneHoursTime.toString()}`,
      html: `${emailOuter(branding)}
  ${emailLogoHeader(branding)}
  <tr>
    <td bgcolor="white" style="padding: 24px; text-align: center;">
      <p>
        Tap the button below to login
        <br><br><br>
        <a href="${magicLinkUrl}" style="${buttonStyle}">Log in</a>
        <br><br><br>
        <p>
          Once you're logged in, feel free to delete this email
        </p>
        <p style="font-size: ${FONT_SIZE_SM};">
          Your single-use login link will expire ${oneHoursTime.toString()}
        </p>
      </p>
    </td>
  </tr>
${EMAIL_OUTER_END}`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}

export function sendEmailVerificationEmail(
  userProfile,
  branding,
  buttonStyle,
  senderEmail,
) {
  if (!EMAIL_VERIFICATION_ENABLED) {
    return;
  }
  const now = new Date();
  const oneDaysTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  const verificationLink = {
    userId: userProfile.id,
    expiry: oneDaysTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  lockPromise('emailVerificationCodes', () =>
    datumCreate(
      { redisKey: 'emailVerificationCodes' },
      { body: verificationLink },
    ),
  );
  const emailVerificationLink = `${SITE_URL}/email-verification?token=${verificationLink.key}`;
  // Send the magic link URL to the email address of the user
  transporter.sendMail(
    {
      from: senderEmail,
      to: userProfile.email,
      subject: 'Verify your email address',
      text: `Your email verification link is:
${emailVerificationLink}\n\nIt will expire ${oneDaysTime.toString()}`,
      html: `${emailOuter(branding)}
  ${emailLogoHeader(branding)}
  <tr>
    <td bgcolor="white" style="padding: 24px; text-align: center;">
      <p>
        Please verify your email address using the button below.
        <br><br><br>
        <a href="${emailVerificationLink}" style="${buttonStyle}">Click here to verify your email address.</a>
        <br><br><br>
        <p style="font-size: ${FONT_SIZE_SM};">
          This verification link will expire ${oneDaysTime.toString()}
        </p>
      </p>
    </td>
  </tr>
${EMAIL_OUTER_END}`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}

export function sendPaymentReceiptEmail(
  payment,
  charge,
  branding,
  buttonStyle,
  senderEmail,
) {
  let success = true;
  transporter.sendMail(
    {
      from: senderEmail,
      to: payment.email,
      subject: 'Payment received',
      text: `Thank you for your recent payment of £${charge.amount / 100}.`,
      html: `${emailOuter(branding)}
        ${emailLogoHeader(branding)}
        <tr>
          <td bgcolor="white" style="padding: 24px 24px 0 24px;">
            <p>
              Thank you for making an online payment.
              <br><br>
              Please find the receipt for this transaction below.
            </p>
          </td>
        </tr>
        <tr>
          <td bgcolor="white" style="padding: 0 24px 24px 24px; font-size: ${FONT_SIZE_SM};">
            <hr/>
            <p>
              TRANSACTION RECEIPT FOR YOUR RECORDS:
              <br>
              Payment name: George Gillams - online payment ${payment.id}
              <br>
              Payment amount: £${charge.amount / 100}
              <br>
              Payment method: ${charge.payment_method_details.card.brand}-${
        charge.payment_method_details.card.last4
      }
              <br>
              Transaction ID: ${charge.id}
              <br>
              Timestamp: ${new Date(charge.created * 1000).toString()}
            </p>
          </td>
        </tr>
      ${EMAIL_OUTER_END}`,
    },
    error => {
      if (error) {
        success = false;
        return console.log(error);
      }
    },
  );
  return success;
}
