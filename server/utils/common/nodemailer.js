import appConfig from 'helpers/appConfig';
import nodemailer from 'nodemailer';

import logger from 'server-utils/common/logger';

let mailConfig = null;
let transporter = null;

const user = process.env[`${appConfig.projectName}_GSUITE_EMAIL`];
const pass = process.env[`${appConfig.projectName}_GSUITE_APP_PASSWORD`];

if (user && pass) {
  mailConfig = {
    service: 'gmail',
    auth: {
      user,
      pass,
    },
  };
  transporter = nodemailer.createTransport(mailConfig);
} else {
  transporter = {
    sendMail: (email, cb) => {
      if (!email.to) {
        cb(new Error('No recipient set'));
        return;
      }
      logger.log(email);
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
