import crypto from 'crypto';

import appConfig from 'helpers/appConfig';
import {
  EMAIL_OUTER,
  EMAIL_LOGO_HEADER,
  EMAIL_HTML_BUTTON_STYLE,
  sendEmail,
  EMAIL_SENDER_ADDRESS,
  EMAIL_OUTER_END,
  FONT_SIZE_SM,
} from 'utils/emails';
import lockPromise from 'utils/lock';
import { dbCreate } from 'utils/database';

export default function sendMagicLinkEmail(
  userProfile,
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
  let magicLinkUrl = `${appConfig.siteUrl}/magic-login?token=${magicLink.key}`;
  if (loginRedirect) {
    magicLinkUrl += `&redirect=${loginRedirect}`;
  }
  // Send the magic link URL to the email address of the user
  const email = {
    from: EMAIL_SENDER_ADDRESS,
    to: divertToAdmin
      ? 'g+diverted-to-admin@georgegillams.co.uk'
      : userProfile.email,
    subject: 'Your magic login link',
    text: `Your magic link is:
${magicLinkUrl}\n\nIt will expire ${oneHoursTime.toString()}`,
    html: `${EMAIL_OUTER}
  ${EMAIL_LOGO_HEADER}
  <tr>
    <td bgcolor="white" style="padding: 24px; text-align: center;">
      <p>
        Tap the button below to login
        <br><br><br>
        <a href="${magicLinkUrl}" style="${EMAIL_HTML_BUTTON_STYLE}">Log in</a>
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
  };

  return lockPromise('magicLinks', () =>
    dbCreate({ redisKey: 'magiclinks' }, { body: magicLink }).then(() =>
      sendEmail(email),
    ),
  );
}
