import { createStore, applyMiddleware } from "redux";
import { rootReducer } from './reducers/rootReducer';
import thunk from "redux-thunk";
import { watchBooks } from "./sagas";
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchBooks);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch