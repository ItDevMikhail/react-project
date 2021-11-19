import { CircularProgress, Tooltip, Zoom, Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isAuthorization, userLogout } from "../../redux/actions/actionsUser";
import { useREST } from "../../hooks/useREST";
import MessageBoxComponent from "../messageBox";
import { ADD_BOOK_ROUTE, BLOG_ROUTE, DASHBOARD_ROUTE, HOMEPAGE_ROUTE, LIBRARY_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, REGISTRATION_ROUTE } from "../../models/const";
import { useTranslation } from "react-i18next";

export default function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.user.isAuth);
  const loading = useAppSelector(state => state.user.loading);

  const { request } = useREST();

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  let home = t("Header.Home");
  let logout = t("Header.Logout");
  let login = t("Header.Login");
  let register = t("Header.Registration");
  const logoutHandler = async () => {
    dispatch(userLogout());
    dispatch(isAuthorization(false));
    await request("/api/users/logout", "GET");
  };
  if (loading) {
    return (
      <div className="header">
        <div className="container">
          <nav className="navMenu">
            <CircularProgress className="headerProgressBar" />
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
                  title={home}
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink activeClassName="selected" to={HOMEPAGE_ROUTE} exact={true}>
                    <span className="material-icons">home</span>
                  </NavLink>
                </Tooltip>
                <NavLink activeClassName="selected" to={LIBRARY_ROUTE} exact={true}>
                  {t("Header.Library")}
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to={ADD_BOOK_ROUTE}
                  exact={true}
                >
                  {t("Header.AddBook")}
                </NavLink>
                <NavLink activeClassName="selected" to={BLOG_ROUTE} exact={true}>
                  {t("Header.Blog")}
                </NavLink>
                <NavLink
                  activeClassName="selected"
                  to={DASHBOARD_ROUTE}
                  exact={true}
                >
                  {t("Header.Dashboard")}
                </NavLink>
              </div>
              <div className="navMenuRight">
                <FormControl fullWidth>
                  <Select
                    defaultValue={t("Language")}
                    className="headerSelect"
                    onChange={(e: any) => changeLanguage(e.target.value)}
                  >
                    <MenuItem value="ru">RU</MenuItem>
                    <MenuItem value="en">EN</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip
                  title={logout}
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink
                    activeClassName="selected"
                    to={LOGOUT_ROUTE}
                    onClick={logoutHandler}
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
                  title={home}
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink activeClassName="selected" to={HOMEPAGE_ROUTE} exact={true}>
                    <span className="material-icons">home</span>
                  </NavLink>
                </Tooltip>
              </div>
              <div className="navMenuRight">
                <FormControl fullWidth>
                  <Select
                    defaultValue={t("Language")}
                    className="headerSelect"
                    onChange={(e: any) => changeLanguage(e.target.value)}
                  >
                    <MenuItem value="ru">RU</MenuItem>
                    <MenuItem value="en">EN</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip
                  title={login}
                  placement="bottom-start"
                  TransitionComponent={Zoom}
                >
                  <NavLink data-testid="login" activeClassName="selected" to={LOGIN_ROUTE}>
                    <span className="material-icons">login</span>
                  </NavLink>
                </Tooltip>
                <Tooltip
                  title={register}
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