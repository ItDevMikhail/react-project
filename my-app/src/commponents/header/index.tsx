import { Tooltip, Zoom } from "@material-ui/core";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchingUserData, fetchisAuthorization, isAuthorization } from "../../redux/actions/actionsUser";
import { useHttp } from "../../hooks/http.hook";
import MessageBoxComponent from "../messageBox";
import { ADD_BOOK_ROUTE, BLOG_ROUTE, DASHBOARD_ROUTE, HOMEPAGE_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, REGISTRATION_ROUTE } from "../../models/const";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const loading = useSelector((state: any) => state.user.loading);
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchingUserData());
    dispatch(fetchisAuthorization());
    console.log(isAuth);
  }, []);

  const logout = async () => {
    dispatch(isAuthorization(false));
    await request("/api/users/logout", "GET");
  };
  if (loading) {
    return (
      <div className="header">
        <div className="container">
          <nav className="navMenu">
            <div className="navMenuleft">
              <Tooltip
                title="Home"
                placement="bottom-start"
                TransitionComponent={Zoom}
              >
                <NavLink activeClassName="selected" to={HOMEPAGE_ROUTE} exact={true}>
                  <span className="material-icons">home</span>
                </NavLink>
              </Tooltip>
            </div>
          </nav>
        </div>
      </div>
    )
  } else {
    return (
      <div className="header">
        <div className="container">
          {isAuth && (
            <nav className="navMenu">
              <div className="navMenuleft">
                <Tooltip
                  title="Home"
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink activeClassName="selected" to={HOMEPAGE_ROUTE} exact={true}>
                    <span className="material-icons">home</span>
                  </NavLink>
                </Tooltip>
                <NavLink activeClassName="selected" to={LIBRARY_ROUTE} exact={true}>
                  Library
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to={ADD_BOOK_ROUTE}
                  exact={true}
                >
                  Add book
                </NavLink>
                <NavLink activeClassName="selected" to={BLOG_ROUTE} exact={true}>
                  Blog
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to={DASHBOARD_ROUTE}
                  exact={true}
                >
                  Dashboard
                </NavLink>
              </div>
              <div className="navMenuRight">
                <Tooltip
                  title="logout"
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink
                    activeClassName="selected"
                    to={LOGOUT_ROUTE}
                    onClick={logout}
                  >
                    <span className="material-icons">logout</span>
                  </NavLink>
                </Tooltip>
              </div>
            </nav>
          )}
          {!isAuth && (
            <nav className="navMenu">
              <div className="navMenuleft">
                <Tooltip
                  title="Home"
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink activeClassName="selected" to={HOMEPAGE_ROUTE} exact={true}>
                    <span className="material-icons">home</span>
                  </NavLink>
                </Tooltip>
              </div>
              <div className="navMenuRight">
                <Tooltip
                  title="login"
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink data-testid="login" activeClassName="selected" to={LOGIN_ROUTE}>
                    <span className="material-icons">login</span>
                  </NavLink>
                </Tooltip>
                <Tooltip
                  title="Registration"
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink data-testid="register" activeClassName="selected" to={REGISTRATION_ROUTE}>
                    <span className="material-icons">person_add_alt</span>
                  </NavLink>
                </Tooltip>
              </div>
            </nav>
          )}
        </div>
        <MessageBoxComponent />
      </div>
    );
  }
}