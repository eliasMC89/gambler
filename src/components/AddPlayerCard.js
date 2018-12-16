import React, { Component } from 'react';

class AddPlayerCard extends Component {
  render() {
    const { player } = this.props;
    return (
      <li key={`id=${player._id}`} className="add-player-card">
        {player.name}, {player.buyin} $
      </li>
    );
  }
}

export default AddPlayerCard;