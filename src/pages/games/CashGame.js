import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import AddPlayers from './AddPlayers';

class NewGame extends Component {

  

  render() {
    return (
      <div>
        <Navbar />
        <Route to={`${this.props.match.path}/add-players`} component={AddPlayers} />
        
        
        
      </div>
    );
  }
}

export default NewGame;