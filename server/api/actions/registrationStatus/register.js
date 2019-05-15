import { datumLoadSingle, datumCreate, datumUpdate } from '../datum';
import authentication from 'utils/authentication';
import reqSecure from 'utils/reqSecure';
import getRegistrationStatus from 'utils/getRegistrationStatus';
import {
  REG_EMAIL,
  UNAUTHORISED_READ,
  CONFERENCE_DAY_1_END,
  CONFERENCE_DAY_2_END,
  CONFERENCE_DAY_1_START,
  CONFERENCE_DAY_2_START,
} from 'helpers/constants';
import registratiomStatusAllowedAttributes from './registratiomStatusAllowedAttributes';
import { find } from 'utils/find';

export default function register(req) {
  const reqSecured = reqSecure(req, registratiomStatusAllowedAttributes);
  return new Promise((resolve, reject) => {
    authentication(reqSecured).then(
      user => {
        if (user && (user.admin || user.email === REG_EMAIL)) {
          datumLoadSingle({
            redisKey: 'tickets',
            resolveIfNotFound: true,
            filter: t => t.id === reqSecured.body.ticketId,
          }).then(loadedTicket => {
            datumLoadSingle({
              redisKey: 'users',
              resolveIfNotFound: true,
              filter: u => loadedTicket && u.id === loadedTicket.reservedTo,
            }).then(loadedUser => {
              datumLoadSingle({
                redisKey: 'userDetails',
                resolveIfNotFound: true,
                filter: u =>
                  loadedTicket && u.authorId === loadedTicket.reservedTo,
              }).then(loadedUserDetails => {
                datumLoadSingle({
                  redisKey: 'registrations',
                  resolveIfNotFound: true,
                  filter: r =>
                    loadedTicket && r.userId === loadedTicket.reservedTo,
                }).then(loadedRegistration => {
                  if (
                    loadedTicket &&
                    loadedUser &&
                    loadedUserDetails &&
                    loadedUser.email === reqSecured.body.email
                  ) {
                    getRegistrationStatus({ id: loadedUser.id }).then(
                      result => {
                        let {
                          hasArrivedAtConferenceDay1,
                          hasArrivedAtConferenceDay2,
                        } = result;
                        if (
                          Date.now() > CONFERENCE_DAY_1_START &&
                          Date.now() < CONFERENCE_DAY_1_END
                        ) {
                          hasArrivedAtConferenceDay1 = !reqSecured.body
                            .unregister;
                        }
                        if (
                          Date.now() > CONFERENCE_DAY_2_START &&
                          Date.now() < CONFERENCE_DAY_2_END
                        ) {
                          hasArrivedAtConferenceDay2 = !reqSecured.body
                            .unregister;
                        }

                        if (loadedRegistration) {
                          datumUpdate(
                            { redisKey: 'registrations' },
                            {
                              body: {
                                id: loadedRegistration.id,
                                userId: loadedUser.id,
                                hasArrivedAtConferenceDay1,
                                hasArrivedAtConferenceDay2,
                              },
                            },
                          );
                        } else {
                          datumCreate(
                            { redisKey: 'registrations' },
                            {
                              body: {
                                userId: loadedUser.id,
                                hasArrivedAtConferenceDay1,
                                hasArrivedAtConferenceDay2,
                              },
                            },
                          );
                        }
                        resolve({
                          ...{
                            name: `${loadedUserDetails.name} ${
                              loadedUserDetails.surname
                            }`,
                          },
                          ...result,
                          ...{
                            hasArrivedAtConferenceDay1,
                            hasArrivedAtConferenceDay2,
                          },
                        });
                      },
                    );
                  } else {
                    resolve({ error: 'Ticket email mismatch' });
                  }
                });
              });
            });
          });
        } else {
          resolve(UNAUTHORISED_READ);
        }
      },
      err => reject(err),
    );
  });
}
