import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';

import PrivateRoute from '../../components/PrivateRoute';
import MyGames from './MyGames';
import MyInfo from './MyInfo';

class Profile extends Component {

  render() {
    const { match } = this.props
    return (
      <div>
        <Switch>
          <PrivateRoute exact path={`${match.path}/my-info`} component={MyInfo} />
          <PrivateRoute path={`${match.path}/my-games`} component={MyGames} />
        </Switch>
      </div>
    );
  }
}

export default withAuth(Profile);