import { datumLoad, datumLoadSingle, datumCreate } from '../actions/datum';

import { find } from 'utils/find';
import { INVALID_SESSION, INVALID_CREDENTIALS } from 'helpers/constants';
import {
  calculateOutstandingBalance,
  ticketReservationIsValid,
} from 'helpers/ticketing';
import { generateKey } from 'utils/hash';
import setContentLastUpdatedTimestamp from 'utils/setContentLastUpdatedTimestamp';

export default function getRegistrationStatus(user) {
  return new Promise((resolve, reject) => {
    datumLoadSingle({
      redisKey: 'users',
      filter: u => u.id === user.id,
    }).then(
      loadedUser => {
        datumLoadSingle({
          redisKey: 'userDetails',
          resolveIfNotFound: true,
          filter: u => u.authorId === user.id,
        }).then(loadedUserDetails => {
          datumLoadSingle({
            redisKey: 'tickets',
            resolveIfNotFound: true,
            filter: u => u.reservedTo === user.id,
          }).then(loadedTicket => {
            datumLoad({
              redisKey: 'stripepayments',
              filter: u => u.userId === user.id,
            }).then(loadedPayments => {
              datumLoadSingle({
                redisKey: 'registrations',
                resolveIfNotFound: true,
                filter: u => u.userId === user.id,
              }).then(loadedRegistration => {
                let ticket;
                let overall = 'INCOMPLETE';
                let userDetails = 'NOT STARTED';
                let photoRelease = 'NOT STARTED';
                let validTicket = 'NOT STARTED';
                let hasArrivedAtConferenceDay1 = false;
                let hasArrivedAtConferenceDay2 = false;
                if (loadedRegistration) {
                  hasArrivedAtConferenceDay1 =
                    loadedRegistration.hasArrivedAtConferenceDay1;
                  hasArrivedAtConferenceDay2 =
                    loadedRegistration.hasArrivedAtConferenceDay2;
                }

                if (loadedUserDetails) {
                  userDetails = 'INCOMPLETE';
                  if (
                    loadedUserDetails.name &&
                    loadedUserDetails.surname &&
                    loadedUserDetails.university &&
                    loadedUserDetails.yearOfStudy
                  ) {
                    userDetails = 'COMPLETE';
                  }
                  if (loadedUserDetails.photoReleaseConsented) {
                    photoRelease = 'COMPLETE';
                  }
                }

                if (loadedTicket && ticketReservationIsValid(loadedTicket)) {
                  validTicket = 'INCOMPLETE';
                  if (
                    calculateOutstandingBalance(loadedTicket, loadedPayments) <
                    1
                  ) {
                    validTicket = 'COMPLETE';
                  }
                }

                if (
                  userDetails === 'NOT STARTED' &&
                  photoRelease === ' NOT STARTED' &&
                  validTicket === ' NOT STARTED'
                ) {
                  overall = 'NOT STARTED';
                }

                if (userDetails === 'COMPLETE' && validTicket === 'COMPLETE') {
                  overall = 'COMPLETE';
                  ticket = {
                    email: loadedUser.email,
                    ticketId: loadedTicket.id,
                  };
                }

                resolve({
                  userId: user.id,
                  overall,
                  userDetails,
                  photoRelease,
                  validTicket,
                  ticket,
                  hasArrivedAtConferenceDay1,
                  hasArrivedAtConferenceDay2,
                });
              });
            });
          });
        });
      },
      err => {
        resolve({ error: `No user found with id ${user.id}` });
      },
    );
  });
}
