import loadAllData from './private/loadAllData';
import fs from 'fs';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ, PROJECT_NAME } from 'helpers/constants';
import reqSecure from 'utils/reqSecure';

const dataFilePath = 'server/server_content/data.json';

export default function load(req) {
  return new Promise((resolve, reject) => {
    authentication(req).then(
      user => {
        if (user && user.admin) {
          loadAllData().then(data => {
            const dataAnnotated = {
              projectName: PROJECT_NAME,
              timestamp: Date.now(),
              data: data,
            };
            resolve(res => {
              fs.writeFileSync(dataFilePath, JSON.stringify(dataAnnotated));
              res.download(dataFilePath);
            });
          });
        } else {
          reject(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
