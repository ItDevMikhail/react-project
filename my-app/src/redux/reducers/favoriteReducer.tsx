import {
  FETCHED_LIBRARY_FAVORITE,
  FETCHED_DASHBOARD_FAVORITE,
  FETCHED_FAVORITE_ERROR,
  FETCHING_FAVORITE,
} from "../types";

const initialState = {
  loading: false,
  dataUser: [{}],
  dataLib: [{}],
  error: false,
};

export const favoriteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCHING_FAVORITE:
      return { ...state, loading: action.payload };
    case FETCHED_DASHBOARD_FAVORITE:
      return { ...state, loading: false, dataUser: action.payload };
    case FETCHED_LIBRARY_FAVORITE:
      return { ...state, loading: false, dataLib: action.payload };
    case FETCHED_FAVORITE_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
