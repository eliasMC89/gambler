import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CurrentPlayerCard extends Component {

  render() {
    const { player, gameId } = this.props;
    return (
      <li className="current-player-card" >
        <div className="current-player-info"><span className="card-name-tag">{player.name}</span></div>
        <div className="current-player-info"><span className="total-buyin-tag">Total buyin:</span> {player.buyin} $</div>
        <div className="buyins-box">
          <div className="summary-player-info">
            <p>Buyins:</p>
          </div >
          <ul className="buyin-history">
            {player.buyinHistory.map((buyin, index)=>{
              return (
                <li key={`id=${index}`} className="buyin-list"> + {buyin}</li>
              )
            })}
          </ul>
        </div>
        <div className="current-player-buttons">
          <Link to={`/cash-game/${gameId}/rebuy/${player._id}`} className="current-player-link rebuy-btn" >Rebuy</Link>
          <Link to={`/cash-game/${gameId}/final-stack/${player._id}`} className="current-player-link final-stack-btn" >Final Stack</Link>
        </div>
      </li>
    );
  }
}

export default CurrentPlayerCard;