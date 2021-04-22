import { InvalidInputError } from 'server-utils/common/errors';

import performRestoration from './private/performRestoration';

import authentication from 'server-utils/common/authentication';
import appConfig from 'helpers/appConfig';
import { UNAUTHORISED_WRITE } from 'server-utils/common/errorConstants';

export default function create(req) {
  return authentication(req).then(user => {
    if (!user || !user.admin) {
      throw UNAUTHORISED_WRITE;
    }
    if (!req.files || !req.files.backupFile) {
      throw new InvalidInputError('A backup file must be provided to carry out the restoration.');
    }
    const dataBuffer = req.files.backupFile.data;
    const restorationObject = JSON.parse(dataBuffer.toString());
    if (restorationObject.projectName !== appConfig.projectName) {
      throw new InvalidInputError('The backup was taken from a different project.');
    }
    performRestoration(restorationObject.data);
    return true;
  });
}
