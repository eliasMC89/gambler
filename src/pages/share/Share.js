import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';
import Navbar from '../../components/Navbar';
import SearchShare from './SearchShare';

class Share extends Component {
  render() {
    const { match } = this.props;
    const { id } = match.params;
    return (
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute path={`${match.path}/${id}/search-user`} component={SearchShare} />
        </Switch>
      </div>
    );
  }
}

export default Share;