import nodemailer from 'nodemailer';

import logger from 'utils/logger';

let mailConfig = null;
let transporter = null;
if (process.env.GSUITE_EMAIL && process.env.GSUITE_APP_PASSWORD) {
  mailConfig = {
    service: 'gmail',
    auth: {
      user: process.env.GSUITE_EMAIL,
      pass: process.env.GSUITE_APP_PASSWORD,
    },
  };
  transporter = nodemailer.createTransport(mailConfig);
} else {
  transporter = {
    sendMail: (obj, cb) => {
      logger.log(obj);
      cb();
    },
  };
}

const sendMailPromise = email =>
  new Promise((resolve, reject) => {
    transporter.sendMail(email, err => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });

export default sendMailPromise;
export { sendMailPromise };
