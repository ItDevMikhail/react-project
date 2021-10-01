import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LibraryPage from './pages/LibraryPage';
import { Button, Toolbar} from '@material-ui/core';
import {Home}  from '@material-ui/icons';

function App() {
  return (

    <Router>

      <main>
        <Toolbar className="header">
          <div className="navMenuLeft">
            <Link to='/'><Home/></Link>
            <Button variant="contained"> <Link to='/library'>Library</Link></Button>
            <Button variant="contained"> <Link to='/library'>Library</Link></Button>
          </div>
          <div className="navMenuRight">
            <Button variant="contained"><Link to='/login'>Login</Link></Button>
            <Button variant="contained"><Link to='/register'>Register</Link></Button>
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
