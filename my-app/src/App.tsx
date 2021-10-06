import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LibraryPage from './pages/LibraryPage';
import RootGaurd from './commponents/guard/auth.guard';
import AddBookPage from './pages/addBookPage/index';
import HomePage from './pages/homePage';
import BookDetailPage from './pages/bookDetailPage';
import { useHttp } from './hooks/http.hook';
import { useHttpAuth } from './hooks/http.auth.hook';




function App() {
  const { request, error } = useHttp();
  const [isLogged, setIsLogged] = useState(true);
  const { requestAuth, errorMess } = useHttpAuth();
  const logged = (val: boolean) => {
    setIsLogged(val);
  }
  const guard = () => {
    return isLogged;
  }
  const logout = async () => {
    setIsLogged(false);
    try {
      const data = await request('/api/users/logout', 'GET');
      if (data) {
        sessionStorage.clear();
      }
    } catch (e) {
      console.log(error);
    }
  }
  const checkauth = async () => {
    try {
      const data = await requestAuth();
      if (data) {
        setIsLogged(data.access);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      setIsLogged(false);
      console.log(errorMess);
    }
  }
  useEffect(() => {
    checkauth();
  }, []);

  return (
    <Router>
      <RootGaurd logged={guard}>
        <div className="header">
          <div className="container">
            {isLogged && <nav className="navMenu"><div className="navMenuleft">
              <NavLink activeClassName="selected" to='/home' exact={true}><span className="material-icons">
                home
              </span></NavLink>
              <NavLink activeClassName="selected" to='/library' exact={true}>Library</NavLink>
              <NavLink activeClassName="selected" to='/library/add' exact={true}>Add book</NavLink>
            </div><div className="navMenuRight"><NavLink activeClassName="selected" to='/login' onClick={logout}><span className="material-icons">
              logout
            </span></NavLink></div></nav>}
            {!isLogged && <nav className="navMenu"><div></div><div className="navMenuRight"><NavLink activeClassName="selected" to='/login'><span className="material-icons">
              login
            </span></NavLink>
              <NavLink activeClassName="selected" to='/register'><span className="material-icons">
                person_add_alt
              </span></NavLink></div></nav>}
          </div>
        </div>
        <Switch>
          <Route path='/home' >
            <HomePage />
          </Route>
          <Route path='/library/detail/:id' >
            <BookDetailPage />
          </Route>
          <Route path='/login' >
            <LoginPage logged={logged} />
          </Route>
          <Route path='/register'>
            <RegisterPage />
          </Route>
          <Route path='/library' exact={true}>
            <LibraryPage />
          </Route>
          <Route path='/library/add'>
            <AddBookPage />
          </Route>
          <Redirect to='/login' />
        </Switch>
      </RootGaurd>
    </Router>
  );
}

export default App;
