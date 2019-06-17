import { datumLoad, datumCreate, datumUpdate } from '../datum';

import registratiomStatusAllowedAttributes from './registratiomStatusAllowedAttributes';

import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import getRegistrationStatus from 'utils/getRegistrationStatus';
import { REG_EMAIL, UNAUTHORISED_READ } from 'helpers/constants';
import { find } from 'utils/find';
import { associate } from 'helpers/objects';

export default function register(req) {
  const reqSecured = reqSecure(req, registratiomStatusAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && user.admin) {
          datumLoad({ redisKey: 'users' }).then(loadedUsers => {
            datumLoad({ redisKey: 'registrations' }).then(
              loadedRegistrations => {
                datumLoad({ redisKey: 'userDetails' }).then(
                  loadedUserDetails => {
                    let associatedData = associate(
                      loadedUsers,
                      loadedRegistrations,
                      'id',
                      'userId',
                      'registration',
                    );
                    associatedData = associate(
                      associatedData,
                      loadedUserDetails,
                      'id',
                      'authorId',
                      'userDetails',
                    );
                    const day1 = [];
                    const day2 = [];
                    for (let i = 0; i < associatedData.length; i += 1) {
                      const currentUser = associatedData[i];
                      if (currentUser.registration && currentUser.userDetails) {
                        if (
                          currentUser.registration.hasArrivedAtConferenceDay1
                        ) {
                          day1.push(
                            `${currentUser.userDetails.name}${currentUser.userDetails.surname}`,
                          );
                        }
                        if (
                          currentUser.registration.hasArrivedAtConferenceDay2
                        ) {
                          day2.push(
                            `${currentUser.userDetails.name}${currentUser.userDetails.surname}`,
                          );
                        }
                      }
                    }
                    resolve({ day1, day2 });
                  },
                );
              },
            );
          });
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
