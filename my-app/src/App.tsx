import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { useHttp } from "./hooks/http.hook";
import { useHttpAuth } from "./hooks/http.auth.hook";
import { Tooltip, Zoom } from "@material-ui/core";
import AppRouter from "./routes/RootRouter";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import Header from "./commponents/header";
import { isAuthorization } from "./redux/actions/actionsUser";

function App() {
  // const { request, error } = useHttp();
  // const { requestAuth } = useHttpAuth();

  // const dispatch = useDispatch();

  // const logout = async () => {
  //   // setIsLogged(false);
  //   try {
  //     const data = await request("/api/users/logout", "GET");
  //     if (data) {
  //       sessionStorage.clear();
  //     }
  //   } catch (e) {
  //     console.log(error);
  //   }
  // };
  // const checkauth = async () => {
  //   try {
  //     const data = await requestAuth();
  //     if (data) {
  //       dispatch(isAuthorization(true));
  //     } else {
  //       // setIsLogged(false);
  //       dispatch(isAuthorization(false));
  //     }
  //   } catch (error) {
  //     // setIsLogged(false);
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   // dispatch(fetchisAuthorization(requestAuth));
  //   // checkauth();
  // }, []);

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
