import {
  ISAUTHORIZATION,
  TOKEN,
  FETCHED_USER_DATA,
  FETCHING_USER_DATA,
  FETCHED_USER_DATA_ERROR,
} from "../types";

const initialState = {
  isAuth: true,
  token: null,
  loading: false,
  data: [],
  error: "",
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ISAUTHORIZATION:
      return { ...state, isAuth: action.payload, loading: false };
    case TOKEN:
      return { ...state, token: action.payload };
    case FETCHING_USER_DATA:
      return { ...state, loading: true };
    case FETCHED_USER_DATA:
      return { ...state, loading: false, data: action.payload };
    case FETCHED_USER_DATA_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
