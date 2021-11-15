import {
  ADMIN_ROUTE, LOGIN_ROUTE,
  LOGOUT_ROUTE, REGISTRATION_ROUTE,
  BLOG_ROUTE, HOMEPAGE_ROUTE,
  LIBRARY_ROUTE, ADD_BOOK_ROUTE,
  DASHBOARD_ROUTE, DETAIL_ROUTE, ERROR_ROUTE,
} from "../models/const";
import AddBookPage from "../pages/addBookPage";
import BlogPage from "../pages/blogPage";
import BookDetailPage from "../pages/bookDetailPage";
import DashBoardPage from "../pages/dashBoardPage";
import ErrorPage from "../pages/errorPage";
import HomePage from "../pages/homePage";
import LibraryPage from "../pages/LibraryPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: ErrorPage,
  },
];

export const privateRoutes = [
  {
    path: BLOG_ROUTE,
    Component: BlogPage,
  },
  {
    path: ADD_BOOK_ROUTE,
    Component: AddBookPage,
  },
  {
    path: DASHBOARD_ROUTE,
    Component: DashBoardPage,
  },
  {
    path: LIBRARY_ROUTE,
    Component: LibraryPage,
  },
  {
    path: LOGOUT_ROUTE,
    Component: LoginPage,
  },
  {
    path: DETAIL_ROUTE + "/:id",
    Component: BookDetailPage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: RegisterPage,
  },
  {
    path: HOMEPAGE_ROUTE,
    Component: HomePage,
  },
  {
    path: ERROR_ROUTE,
    Component: ErrorPage,
  },
];
