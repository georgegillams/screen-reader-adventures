import {
  USER_DETAILS_CHANGED,
  LOAD_USER_DETAILS,
  LOAD_USER_DETAILS_ERROR,
  LOAD_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_ERROR,
  UPDATE_USER_DETAILS_SUCCESS,
} from './constants';

export function userDetailsChanged(newValue) {
  return {
    type: USER_DETAILS_CHANGED,
    userDetails: newValue,
  };
}

export function loadUserDetails() {
  return {
    type: LOAD_USER_DETAILS,
  };
}

export function loadUserDetailsSuccessful(loadedValue) {
  return {
    type: LOAD_USER_DETAILS_SUCCESS,
    loadedUserDetails: loadedValue,
  };
}

export function loadUserDetailsError() {
  return {
    type: LOAD_USER_DETAILS_ERROR,
  };
}

export function updateUserDetails() {
  return {
    type: UPDATE_USER_DETAILS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {object} gtsLatest The repository data
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function updateUserDetailsSuccessful() {
  return {
    type: UPDATE_USER_DETAILS_SUCCESS,
  };
}
/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function updateUserDetailsError(error) {
  return {
    type: UPDATE_USER_DETAILS_ERROR,
    error,
  };
}
