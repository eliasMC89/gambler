import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import AddPlayers from './AddPlayers';
import CashGamePlaying from './CashGamePlaying';

class NewGame extends Component {

  

  render() {
    const { match } = this.props;
    return (
      <div>
        <Navbar />
        <div>dhoads</div>
        <Switch>
          <Route path={`${match.path}/add-players`} component={AddPlayers} />
          <Route path={`${match.path}/playing`} component={CashGamePlaying} />
        </Switch>
          
      </div>
    );
  }
}

export default NewGame;