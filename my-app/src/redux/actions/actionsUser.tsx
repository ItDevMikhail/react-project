import {
  ISAUTHORIZATION,
  TOKEN,
  FETCHED_USER_DATA,
  FETCHING_USER_DATA,
  FETCHED_USER_DATA_ERROR,
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

export function fetchUserData(request: any) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchingUserData());
      const data = await request("/api/users/user", "GET");
      dispatch(fetchedUserData(data));
    } catch (error) {
      dispatch(fetchedUserDataError("Ошибка загрузки данных"));
    }
  };
}
export function fetchisAuthorization(requestAuth: any) {
  return async (dispatch: any) => {
    try {
      const data = await requestAuth();
      if (data) {
        dispatch(isAuthorization(true));
      } else {
        dispatch(isAuthorization(false));
      }
    } catch (error) {
      dispatch(fetchedUserDataError("Ошибка загрузки данных"));
    }
  };
}
