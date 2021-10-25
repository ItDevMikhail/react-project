import { FETCHED_BOOKS, FETCHED_BOOKS_ERROR, FETCHING_BOOKS, WATCHER_GET_BOOKS, WATCHER_DELETE_BOOKS } from "../types";

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

export function fetchBooks() {
  return {
    type: WATCHER_GET_BOOKS
  }
}

export function fetchdeleteBooks(bookId: string) {
  return {
    type: WATCHER_DELETE_BOOKS,
    bookId: bookId
  }
}
