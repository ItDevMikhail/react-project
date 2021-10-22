import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";
import { userReducer } from "./userReducer";
import { favoriteReducer } from "./favoriteReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  favorite: favoriteReducer,
});
