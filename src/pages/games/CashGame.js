import React, { Component } from 'react';
import {  Switch } from 'react-router-dom';

import PrivateRoute from '../../components/PrivateRoute';
import Navbar from '../../components/Navbar';
import AddPlayers from './AddPlayers';
import CashGamePlaying from './CashGamePlaying';
import CashRebuy from './CashRebuy';
// import FinalStacks from './FinalStacks';
import CashGameSummary from './CashGameSummary';
import FinalStack from './FinalStack';

class CashGame extends Component {

  

  render() {
    const { match } = this.props;
    return (
      <div>
        <Navbar />
        <Switch>
          <PrivateRoute path={`${match.path}/add-players`} component={AddPlayers} />
          <PrivateRoute path={`${match.path}/:id/playing`} component={CashGamePlaying} />
          <PrivateRoute path={`${match.path}/:id/rebuy/:playerId`} component={CashRebuy} />
          <PrivateRoute path={`${match.path}/:id/final-stack/:playerId`} component={FinalStack} />
          <PrivateRoute path={`${match.path}/:id/summary`} component={CashGameSummary} />
        </Switch>
          
      </div>
    );
  }
}

export default CashGame;