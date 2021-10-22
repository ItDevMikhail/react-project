import { FETCHED_BOOKS, FETCHED_BOOKS_ERROR, FETCHING_BOOKS } from "../types";

const initialState = {
  loading: false,
  data: [{}],
  error: false,
};

export const booksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCHING_BOOKS:
      return { ...state, loading: action.payload };
    case FETCHED_BOOKS:
      return { ...state, loading: false, data: action.payload };
    case FETCHED_BOOKS_ERROR:
      return { ...state, loading: false, error: action.payload.error };
    default:
      return state;
  }
};
