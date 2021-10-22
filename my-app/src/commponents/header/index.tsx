import { Tooltip, Zoom } from "@material-ui/core";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchisAuthorization,
  isAuthorization,
} from "../../redux/actions/actionsUser";
import { useHttp } from "../../hooks/http.hook";
import { useHttpAuth } from "../../hooks/http.auth.hook";

export default function Header() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state.user.isAuth);
  const state = useSelector((state: any) => state);
  const { request } = useHttp();
  const { requestAuth } = useHttpAuth();

  useEffect(() => {
    dispatch(fetchisAuthorization(requestAuth));
    console.log(isAuth);
  }, []);

  const logout = async () => {
    dispatch(isAuthorization(false));
    await request("/api/users/logout", "GET");
  };

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
                <NavLink activeClassName="selected" to="/home" exact={true}>
                  <span className="material-icons">home</span>
                </NavLink>
              </Tooltip>
              <NavLink activeClassName="selected" to="/library" exact={true}>
                Library
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/library/add"
                exact={true}
              >
                Add book
              </NavLink>
              <NavLink activeClassName="selected" to="/blog" exact={true}>
                Blog
              </NavLink>
              <NavLink
                activeClassName="selected"
                to="/user/dashboard"
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
                  to="/login"
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
                <NavLink activeClassName="selected" to="/home" exact={true}>
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
                <NavLink activeClassName="selected" to="/login">
                  <span className="material-icons">login</span>
                </NavLink>
              </Tooltip>
              <Tooltip
                title="Registration"
                placement="bottom-start"
                TransitionComponent={Zoom}
              >
                <NavLink activeClassName="selected" to="/register">
                  <span className="material-icons">person_add_alt</span>
                </NavLink>
              </Tooltip>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
