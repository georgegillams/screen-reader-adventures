import { LOAD_USERS, REQUEST_MAGIC_LINK_FOR_USER } from './constants';
import { loadUsersSuccess, loadUsersError } from './actions';
import { makeSelectMagicLinkUser } from './selectors';

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { pushMessage } from 'containers/RequestStatusWrapper/actions';
import { API_ENDPOINT, COMMUNICATION_ERROR_MESSAGE } from 'helpers/constants';
import { calculateOutstandingBalance } from 'helpers/ticketing';
import { associate } from 'helpers/objects';
import request from 'utils/request';

const usersLoadedMessage = { type: 'success', message: 'Users loaded!' };
const usersLoadedErrorMessage = {
  type: 'error',
  message: 'Could not load users.',
};
const magicLinkSuccessMessage = {
  type: 'success',
  message: 'Magic link for user sent!',
};
const magicLinkErrorMessage = {
  type: 'error',
  message: 'Could not generate magic link.',
};

const ticketSuccessMessage = {
  type: 'success',
  message: 'Ticket for user sent!',
};
const ticketErrorMessage = {
  type: 'error',
  message: 'Could not send ticket.',
};

export function* doRequestMagicLink() {
  const user = yield select(makeSelectMagicLinkUser());
  const magicLinkUrl = `${API_ENDPOINT}/getmagiclink`;

  try {
    const magicLinkResult = yield call(request, magicLinkUrl, {
      method: 'POST',
      body: JSON.stringify({ email: user.email, divertToAdmin: true }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (magicLinkResult.error) {
      yield put(pushMessage(magicLinkErrorMessage));
    } else {
      yield put(pushMessage(magicLinkSuccessMessage));
    }
  } catch (err) {
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export function* doLoadUsers() {
  const usersRequestURL = `${API_ENDPOINT}/users/load`;
  const userDetailsRequestURL = `${API_ENDPOINT}/userDetails/loadAll`;
  const ticketsRequestURL = `${API_ENDPOINT}/tickets/loadAll`;
  const paymentsRequestURL = `${API_ENDPOINT}/stripePayments/loadAll`;
  const registrationStatusRequestURL = `${API_ENDPOINT}/registrationStatus/loadAll`;

  try {
    const usersResult = yield call(request, usersRequestURL, {
      method: 'GET',
    });
    const userDetailsResult = yield call(request, userDetailsRequestURL, {
      method: 'GET',
    });
    const ticketsResult = yield call(request, ticketsRequestURL, {
      method: 'GET',
    });
    const paymentsResult = yield call(request, paymentsRequestURL, {
      method: 'GET',
    });
    const registrationStatusResult = yield call(
      request,
      registrationStatusRequestURL,
      {
        method: 'GET',
      },
    );
    if (usersResult.error) {
      yield put(loadUsersError(usersResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else if (userDetailsResult.error) {
      yield put(loadUsersError(userDetailsResult));
      yield put(pushMessage(usersLoadedErrorMessage));
    } else if (ticketsResult.error) {
      yield put(loadUsersError(ticketsResult));
      yield put(pushMessage(ticketsResult.error));
    } else if (paymentsResult.error) {
      yield put(loadUsersError(paymentsResult));
      yield put(pushMessage(paymentsResult.error));
    } else if (registrationStatusResult.error) {
      yield put(loadUsersError(registrationStatusResult));
      yield put(pushMessage(registrationStatusResult.error));
    } else {
      let associatedData = associate(
        usersResult,
        userDetailsResult,
        'id',
        'authorId',
        'userDetails',
      );
      associatedData = associate(
        associatedData,
        ticketsResult,
        'id',
        'reservedTo',
        'ticketReservation',
      );
      associatedData = associate(
        associatedData,
        paymentsResult,
        'id',
        'userId',
        'payments',
        true,
      );
      associatedData = associate(
        associatedData,
        registrationStatusResult,
        'id',
        'userId',
        'registrationStatus',
      );
      associatedData = associatedData.map(u => {
        const newU = JSON.parse(JSON.stringify(u));
        if (newU && newU.ticketReservation) {
          newU.ticketReservation.outstandingBalance = calculateOutstandingBalance(
            newU.ticketReservation,
            newU.payments,
          );
        }
        if (newU && newU.registrationStatus) {
          newU.overallRegistrationStatus = newU.registrationStatus.overall;
        }
        if (newU && newU.moneysReceived) {
          delete newU.moneysReceived;
        }
        return newU;
      });
      yield put(loadUsersSuccess(associatedData));
      yield put(pushMessage(usersLoadedMessage));
    }
  } catch (err) {
    yield put(loadUsersError(err));
    yield put(pushMessage(COMMUNICATION_ERROR_MESSAGE));
  }
}

export default function* adminUsers() {
  yield takeLatest(LOAD_USERS, () => doLoadUsers());
  yield takeLatest(REQUEST_MAGIC_LINK_FOR_USER, () => doRequestMagicLink());
}
