import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from './pages/user/Signup';
import Login from './pages/user/Login';
import Home from './pages/main/Home';
import Profile from './pages/user/Profile';
import CashGame from './pages/games/CashGame';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';

import AuthProvider from './providers/AuthProvider';
import NotFound from './pages/main/NotFound';
import Landing from './pages/main/Landing';

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Switch>
            <AnonRoute exact path="/" component={Landing} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/cash-game" component={CashGame} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </AuthProvider>
    )
  }
}

export default App;





