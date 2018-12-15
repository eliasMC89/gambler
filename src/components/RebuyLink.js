import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RebuyLink extends Component {

  render() {
    
    const { playerId, cashGameId } = this.props;
    return (
      <div>
        <Link to={`/cash-game/${cashGameId}/rebuy/${playerId}`} >Rebuy</Link>
      </div>
    );
  }
}

export default RebuyLink;