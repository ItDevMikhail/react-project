import { call, put, takeEvery } from 'redux-saga/effects';
import { CheckAuth, FetchApi } from '../services/fetch.services';
import { fetchBooks, fetchedBooks, fetchedBooksError, fetchingBooks } from './actions/actionsBooks';
import { WATCHER_GET_BOOKS, WATCHER_GET_USER_DATA, WATCHER_CHECK_AUTH, WATCHER_DELETE_BOOKS } from './types';
import { errorMessage, } from './actions/actionsFetch';
import { fetchedUserData, fetchedUserDataError, fetchingUserData, isAuthorization } from './actions/actionsUser';

export function* watchBooks() {
    yield takeEvery(WATCHER_GET_BOOKS, GetBooks);
    yield takeEvery(WATCHER_GET_USER_DATA, GetUserData);
    yield takeEvery(WATCHER_CHECK_AUTH, CheckIsAuthorization);
    yield takeEvery(WATCHER_DELETE_BOOKS, DeleteBook);
}

function* GetBooks(): any {
    try {
        yield put(fetchingBooks());
        const data = yield call(FetchApi, "/api/library", "GET");
        if (data) {
            yield put(fetchedBooks(data))
        } else {
            yield put(fetchedBooks([{ _id: "", name: "Библиотека книг пуста", description: "", picture: "" }])
            );
        }
    }
    catch (error: any) {
        yield put(errorMessage(error.message));
        yield new Promise(res => setTimeout(res, 3000));
        yield put(errorMessage(''));
    }
};
function* GetUserData(): any {
    try {
        yield put(fetchingUserData());
        const data = yield call(FetchApi, "/api/users/user", "GET");
        yield put(fetchedUserData(data));
    } catch (error) {
        yield put(fetchedUserDataError("Ошибка загрузки данных"));
    }
};
function* CheckIsAuthorization(): any {
    try {
        const data = yield call(CheckAuth);
        if (data) {
            yield put(isAuthorization(true));
        } else {
            yield put(isAuthorization(false));
        }
    } catch (error: any) {
        yield put(isAuthorization(false));
    };
}

function* DeleteBook(bookId: any): any {
    try {
        console.log(bookId, 'boooooooooooooooooookId')
        const data = yield call(FetchApi,
            "/api/library",
            "DELETE",
            JSON.stringify({ bookId: bookId.bookId })
        );
        if (data) {
            yield put(fetchBooks());
        }
    } catch (error) {
        yield put(fetchedBooksError("Ошибка загрузки данных"));
    }
}

