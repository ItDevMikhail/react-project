import {
  FETCHED_DASHBOARD_FAVORITE,
  FETCHED_LIBRARY_FAVORITE,
  FETCHED_FAVORITE_ERROR,
  FETCHING_FAVORITE,
} from "../types";

export function fetchingFavorites() {
  return {
    type: FETCHING_FAVORITE,
  };
}
export function fetchedDashFavorites(favdashData: any) {
  return {
    type: FETCHED_DASHBOARD_FAVORITE,
    payload: favdashData,
  };
}
export function fetchedLibFavorites(favdashData: any) {
  return {
    type: FETCHED_LIBRARY_FAVORITE,
    payload: favdashData,
  };
}
export function fetchedFavoritesError(error: string) {
  return {
    type: FETCHED_FAVORITE_ERROR,
    payload: error,
  };
}
export function fetchgetFavorites(request: any) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchingFavorites());
      const data = await request("/api/library/dashboard", "GET");
      if (data) {
        dispatch(fetchedDashFavorites(data));
      } else {
        dispatch(fetchedDashFavorites([{}]));
      }
    } catch (error) {
      dispatch(fetchedFavoritesError("Ошибка загрузки данных"));
    }
  };
}
export function fetchaddFavorites(request: any, bookId: string) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchingFavorites());
      const data = await request(`/api/library/addFavorite/${bookId}`, "GET");
      if (data) {
        dispatch(fetchedLibFavorites(data));
      } else {
        dispatch(fetchedLibFavorites([{}]));
      }
    } catch (error) {
      dispatch(fetchedFavoritesError("Ошибка загрузки данных"));
    }
  };
}
export function fetchgetLibFavorites(request: any) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchingFavorites());
      const data = await request("/api/library/favorite", "GET");
      if (data) {
        dispatch(fetchedLibFavorites(data));
      } else {
        dispatch(fetchedLibFavorites([{}]));
      }
    } catch (error) {
      dispatch(fetchedFavoritesError("Ошибка загрузки данных"));
    }
  };
}
