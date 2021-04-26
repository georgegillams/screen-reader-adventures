import crypto from 'crypto';

import appConfig from 'helpers/appConfig';
import {
  EMAIL_OUTER,
  EMAIL_LOGO_HEADER,
  EMAIL_HTML_BUTTON_STYLE,
  sendEmail,
  EMAIL_OUTER_END,
  FONT_SIZE_SM,
} from 'server-utils/emails';
import lockPromise from 'server-utils/common/lock';
import { dbCreate } from 'server-utils/common/database';

export default function sendEmailVerificationEmail(user) {
  const now = new Date();
  const oneDaysTime = new Date(now.getTime() + 24 * 1000 * 60 * 60);
  const verificationLink = {
    userId: user.id,
    expiry: oneDaysTime,
    key: crypto.randomBytes(20).toString('hex'),
  };
  const emailVerificationLink = `${appConfig.siteUrl}/email-verification?token=${verificationLink.key}`;
  // Send the magic link URL to the email address of the user
  const email = {
    from: `auth@${appConfig.emailDomain}`,
    to: user.email,
    subject: 'Verify your email address',
    text: `Your email verification link is: 
${emailVerificationLink}\n\nIt will expire ${oneDaysTime.toString()}`,
    html: `${EMAIL_OUTER} 
  ${EMAIL_LOGO_HEADER} 
  <tr> 
    <td bgcolor="white" style="padding: 24px; text-align: center;"> 
      <p> 
        Please verify your email address using the button below. 
        <br><br><br> 
        <a href="${emailVerificationLink}" style="${EMAIL_HTML_BUTTON_STYLE}"> 
          Click here to verify your email address. 
        </a> 
        <br><br><br> 
        <p style="font-size: ${FONT_SIZE_SM};"> 
          This verification link will expire ${oneDaysTime.toString()} 
        </p> 
      </p> 
    </td> 
  </tr> 
${EMAIL_OUTER_END}`,
  };

  return lockPromise('emailVerificationCodes', () =>
    dbCreate({ redisKey: 'emailVerificationCodes' }, { body: verificationLink }).then(() => sendEmail(email))
  );
}
