import crypto from 'crypto';

import { datumCreate } from '../actions/datum';

import transporter from './nodemailer';

import { SITE_URL, EMAIL_VERIFICATION_ENABLED } from 'helpers/constants';

export function sendMagicLinkEmail(
  userProfile,
  imageHtml,
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
  datumCreate({ redisKey: 'magiclinks' }, { body: magicLink });
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
      html: `<div style="text-align: center;color: #1e1e1e;">
      ${imageHtml}
  <p>
    Tap the button below to login
    <br><br><br>
    <a href="${magicLinkUrl}" style="${buttonStyle}">Log in</a>
    <br><br><br>
    <p>
      Once you're logged in, feel free to delete this email
    </p>
    <p>
      Your single-use login link will expire ${oneHoursTime.toString()}
    </p>
  </p>
</div>`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}

export function sendMagicLinkTicketEmail(
  userProfile,
  imageHtml,
  buttonStyle,
  senderEmail,
  ticketData,
  divertToAdmin,
) {
  const now = new Date();
  const twentyFourHoursTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  const magicLink = {
    userId: userProfile.id,
    expiry: twentyFourHoursTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  datumCreate({ redisKey: 'magiclinks' }, { body: magicLink });
  let magicLinkUrl = `${SITE_URL}/magic-login?token=${magicLink.key}`;
  magicLinkUrl += `&redirect=ticket`;
  // Send the magic link URL to the email address of the user
  transporter.sendMail(
    {
      from: senderEmail,
      to: divertToAdmin
        ? 'g+diverted-to-admin@georgegillams.co.uk'
        : userProfile.email,
      subject: 'Your EPICC 2019 ticket',
      text: `Your ticket link is:
${magicLinkUrl}\n\nIt will expire ${twentyFourHoursTime.toString()}`,
      html: `<div style="text-align: center;color: #1e1e1e;">
      ${imageHtml}
  <p>
    Tap the button below to login and access your EPICC 2019 ticket
    <br><br><br>
    <a href="${magicLinkUrl}" style="${buttonStyle}">Log in</a>
    <br><br><br>
    <p>
      Once you're logged in, feel free to delete this email.
    </p>
    <p>
      This link will only work once, but if you need to login again, you can do so at <a href="https://www.epicc-tickets.org/ticket">epicc-tickets.org/ticket</a>.
    </p>
    <p>
      Your single-use login link will expire ${twentyFourHoursTime.toString()}
    </p>
  </p>
  <a href="https://qrcode.online/img/?type=text&size=10&data=${JSON.stringify(
    ticketData,
  )
    .split('"')
    .join("'")}">Alternative ticket code</a>
</div>`,
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
  imageHtml,
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
  datumCreate(
    { redisKey: 'emailVerificationCodes' },
    { body: verificationLink },
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
      html: `<div style="text-align: center;color: #1e1e1e;">
      ${imageHtml}
  <p>
    Please verify your email address using the button below.
    <br><br><br>
    <a href="${emailVerificationLink}" style="${buttonStyle}">Click here to verify your email address.</a>
    <br><br><br>
    <p>
      This verification link will expire ${oneDaysTime.toString()}
    </p>
  </p>
</div>`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}

export function sendPaymentReceiptEmail(
  userProfile,
  payment,
  imageHtml,
  buttonStyle,
  senderEmail,
) {
  console.log(`sending payment receipt email`);
  transporter.sendMail(
    {
      from: senderEmail,
      to: userProfile.email,
      subject: 'Payment received',
      text: `Thank you for your recent payment of £${payment.amount / 100}.`,
      html: `<div style="text-align: center;color: #1e1e1e;">
      ${imageHtml}
  <p>
    Thank you for purchasing a ticket to EPICC 2019.
    <br><br>
    Please find the receipt for this transaction below.
    <br><br>
    <hr>
    <p style="text-align: left;margin-left: 1rem;">
    TRANSACTION RECEIPT FOR YOUR RECORDS:
    <br>
Payment amount: £${payment.amount / 100}
    <br>
Payment method: ${payment.source.brand}-${payment.source.last4}
    <br>
Transaction ID: ${payment.source.id}
    <br>
Timestamp: ${new Date(payment.timestamp).toString()}
    </p>
  </p>
</div>`,
    },
    error => {
      if (error) {
        return console.log(error);
      }
    },
  );
}
