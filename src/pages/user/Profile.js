import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';
import MyGames from './MyGames';
import MyInfo from './MyInfo';
import Navbar from '../../components/Navbar';
import MySharedGames from './MySharedGames';
import NotFound from '../main/NotFound';

class Profile extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute exact path={`${match.path}/my-info`} component={MyInfo} />
          <PrivateRoute path={`${match.path}/my-games`} component={MyGames} />
          <PrivateRoute path={`${match.path}/my-shared-games`} component={MySharedGames} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default Profile;