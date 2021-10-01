import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LibraryPage from './pages/LibraryPage';
import { Button, Toolbar } from '@material-ui/core';
import { Home, PersonAdd } from '@material-ui/icons';
import LoginIcon from './static/login';




function App() {
  return (

    <Router>

      <main>
        <Toolbar className="header">
          <div className="navMenuLeft">
            <NavLink activeClassName="selected" to='/' exact={true}><Button id="iconButton"> <Home /></Button></NavLink>
            <NavLink activeClassName="selected" to='/library' exact={true}><Button variant="contained">Library</Button></NavLink>
            <NavLink activeClassName="selected" to='/library/add'><Button variant="contained">Add book</Button></NavLink>
          </div>
          <div className="navMenuRight">
            <Button className="iconButton"><NavLink activeClassName="selected" to='/login'><LoginIcon /></NavLink></Button>
            <Button className="iconButton"><NavLink activeClassName="selected" to='/register'><PersonAdd></PersonAdd></NavLink></Button>
          </div>
        </Toolbar>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/library'>
          <LibraryPage />
        </Route>
      </main>
    </Router>
  );
}

export default App;
