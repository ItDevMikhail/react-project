import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { HOMEPAGE_ROUTE } from "../models/const";
import { adminRoutes, publicRoutes, privateRoutes } from "./routes";
import { useSelector } from "react-redux";

function AppRouter() {
  const isAuth = useSelector((state: any) => state.user.isAuth);
  let role = "USER";
  return (
    <Switch>
      {role === "ADMIN" &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {isAuth &&
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={HOMEPAGE_ROUTE} />
    </Switch>
  );
}

export default AppRouter;
