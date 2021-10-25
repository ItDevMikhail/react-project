import {
  ISAUTHORIZATION,
  TOKEN,
  FETCHED_USER_DATA,
  FETCHING_USER_DATA,
  FETCHED_USER_DATA_ERROR,
  WATCHER_GET_USER_DATA,
  WATCHER_CHECK_AUTH,
} from "../types";

export function isAuthorization(auth: boolean) {
  return {
    type: ISAUTHORIZATION,
    payload: auth,
  };
}
export function getToken(token: string) {
  return {
    type: TOKEN,
    payload: token,
  };
}
export function fetchingUserData() {
  return {
    type: FETCHING_USER_DATA,
  };
}
export function fetchedUserData(userData: any) {
  return {
    type: FETCHED_USER_DATA,
    payload: userData,
  };
}
export function fetchedUserDataError(error: string) {
  return {
    type: FETCHED_USER_DATA_ERROR,
    payload: error,
  };
}

export function fetchUserData() {
  return {
    type: WATCHER_GET_USER_DATA
  }
}
export function fetchisAuthorization() {
  return {
    type: WATCHER_CHECK_AUTH
  }
}
