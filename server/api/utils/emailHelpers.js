import {
  sendMagicLinkTicketEmail as sendMLTE,
  sendMagicLinkEmail as sendMLE,
  sendEmailVerificationEmail as sendEVE,
  sendPaymentReceiptEmail as sendPRE,
} from './emailHelpersGeneric';

import {
  PROJECT_NAME,
  EMAIL_ADDRESS,
  EMAIL_IMAGE_HTML,
  EMAIL_HTML_BUTTON_STYLE,
  EMAIL_SENDER_EMAIL,
} from 'helpers/constants';

let imageHtml =
  '<img src="https://i.imgur.com/Fvg8HXM.png" style="width: 7rem;">';
let buttonStyle =
  'background-color: #025ca2;padding: 0.6rem 1.2rem;color: white;border-radius: 0.25rem;text-decoration: none;';
const senderEmail = EMAIL_ADDRESS;

if (PROJECT_NAME === 'EPICC') {
  imageHtml = EMAIL_IMAGE_HTML;
  buttonStyle = EMAIL_HTML_BUTTON_STYLE;
}

export function sendMagicLinkEmail(userProfile, divertToAdmin, loginRedirect) {
  return sendMLE(
    userProfile,
    imageHtml,
    buttonStyle,
    senderEmail,
    divertToAdmin,
    loginRedirect,
  );
}

export function sendMagicLinkTicketEmail(
  userProfile,
  ticketData,
  divertToAdmin,
) {
  return sendMLTE(
    userProfile,
    imageHtml,
    buttonStyle,
    senderEmail,
    ticketData,
    divertToAdmin,
  );
}

export function sendEmailVerificationEmail(userProfile) {
  return sendEVE(userProfile, imageHtml, buttonStyle, senderEmail);
}

export function sendPaymentReceiptEmail(userProfile, payment) {
  console.log(`ere`);
  return sendPRE(userProfile, payment, imageHtml, buttonStyle, senderEmail);
}
