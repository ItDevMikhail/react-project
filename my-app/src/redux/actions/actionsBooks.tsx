import { FETCHED_BOOKS, FETCHED_BOOKS_ERROR, FETCHING_BOOKS } from "../types";

export function fetchingBooks() {
  return {
    type: FETCHING_BOOKS,
  };
}
export function fetchedBooks(booksData: any) {
  return {
    type: FETCHED_BOOKS,
    payload: booksData,
  };
}
export function fetchedBooksError(error: string) {
  return {
    type: FETCHED_BOOKS_ERROR,
    payload: error,
  };
}
export function fetchBooks(request: any) {
  return async (dispatch: any) => {
    try {
      dispatch(fetchingBooks());
      const data = await request("/api/library", "GET");
      if (data) {
        dispatch(fetchedBooks(data));
      } else {
        dispatch(
          fetchedBooks([
            {
              _id: "",
              name: "Библиотека книг пуста",
              description: "",
              picture: "",
            },
          ])
        );
      }
    } catch (error) {
      dispatch(fetchedBooksError("Ошибка загрузки данных"));
    }
  };
}
export function fetchdeleteBooks(request: any, bookId: string) {
  return async (dispatch: any) => {
    try {
      const data = await request(
        "/api/library",
        "DELETE",
        JSON.stringify({ bookId: bookId })
      );
      if (data) {
        dispatch(fetchBooks(request));
      }
    } catch (error) {
      dispatch(fetchedBooksError("Ошибка загрузки данных"));
    }
  };
}
