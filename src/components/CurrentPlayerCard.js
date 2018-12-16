import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CurrentPlayerCard extends Component {
  render() {
    const { player, gameId } = this.props;
    return (
      <li className="current-player-card" >
        <div className="current-player-info">{player.name}, {player.buyin} $</div>
        <div className="current-player-buttons">
          <Link to={`/cash-game/${gameId}/rebuy/${player._id}`} className="current-player-link rebuy-btn" >Rebuy</Link>
          <Link to={`/cash-game/${gameId}/final-stack/${player._id}`} className="current-player-link final-stack-btn" >Final Stack</Link>
        </div>
      </li>
    );
  }
}

export default CurrentPlayerCard;