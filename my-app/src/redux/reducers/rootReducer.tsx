import { combineReducers } from "redux";
import { booksReducer } from "./booksReducer";
import { userReducer } from "./userReducer";
import { favoriteReducer } from "./favoriteReducer";
import { fetchReducer } from './fetchReducer';

const appReducer = combineReducers({
  user: userReducer,
  books: booksReducer,
  favorite: favoriteReducer,
  fetch: fetchReducer,
});
export const rootReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined; // вовзращает дефолтные стейты (чистит)
  }

  return appReducer(state, action)
}
