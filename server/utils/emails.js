/* eslint-disable max-len */
import { sendMailPromise } from 'server-utils/common/nodemailer';

import { dbCreate } from 'server-utils/common/database';
import lockPromise from 'server-utils/common/lock';

let primaryColor = '#44AEFF';
let primaryColorFaded = '#E5F4FF';
let logoHtml = '<img src="https://i.imgur.com/EBMKBux.png" style="width: 7rem;">';
let buttonColor = '#025ca2';

const EMAIL_HTML_BUTTON_STYLE = `background-color: ${buttonColor};padding: 0.6rem 1.2rem;color: white;border-radius: 0.25rem;text-decoration: none;`;

const EMAIL_WIDTH = '600px';
const FONT_SIZE_SM = '18px';
const FONT_SIZE_BASE = '24px';
const EMAIL_OUTER = `<html lang="en"> 
  <head> 
    <meta charset="utf-8"> 
    <link href="https://fonts.googleapis.com/css?family=Quattrocento+Sans:400,700" rel="stylesheet" /> 
  </head> 
  <body style="font-family: 'Quattrocento Sans', sans-serif; width: 100% !important; height: 100vh !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: -1px 0 0; padding: 0;"> 
    <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%" style="border: 0; border-collapse: collapse; font-size: ${FONT_SIZE_BASE}; width: 100%; margin: 0 auto;> 
      <tr style="align: center;"> 
        <td bgcolor="${primaryColorFaded}"> 
          <table border="0" cellpadding="0" cellspacing="0" style="border: 0; border-collapse: collapse; align: left; color: #1e1e1e; font-size: ${FONT_SIZE_BASE}; width: 100%; max-width: ${EMAIL_WIDTH}; margin: 0 auto;">`;
const EMAIL_OUTER_END = `</table> 
        </td> 
      </tr> 
    </table> 
  </body> 
</html>`;
const EMAIL_LOGO_HEADER = `<tr> 
          <td bgcolor="${primaryColor}" style="padding: 24px; color: white; font-size: 32px;"> 
            <div style="text-align: center;"> 
              ${logoHtml} 
            </div> 
          </td> 
        </tr>`;

function sendEmail(email) {
  return lockPromise('emails', () =>
    dbCreate({ redisKey: 'emails' }, { body: email }).then(() => sendMailPromise(email))
  );
}
export default sendEmail;
export {
  sendEmail,
  EMAIL_LOGO_HEADER,
  EMAIL_OUTER,
  EMAIL_OUTER_END,
  EMAIL_HTML_BUTTON_STYLE,
  FONT_SIZE_SM,
  FONT_SIZE_BASE,
  EMAIL_WIDTH,
  primaryColor as PRIMARY_COLOR,
};
