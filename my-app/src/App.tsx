import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/RootRouter";
import { Provider } from "react-redux";
import Header from "./commponents/header";
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from './redux/reducers/rootReducer';
import thunk from "redux-thunk";
import { watchBooks } from "./redux/sagas";
import createSagaMiddleware from 'redux-saga';

function App() {

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, compose(applyMiddleware(thunk, sagaMiddleware)));

  sagaMiddleware.run(watchBooks);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <AppRouter />
      </Router>
    </Provider>
  );
}

export default App;
