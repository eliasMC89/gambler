import React, { Component } from 'react';

class FinishedPlayerCard extends Component {
  render() {
    const { player } = this.props;
    return (
      <li className="current-player-card finished-player">
        <div className="current-player-info"><span className="card-name-tag">{player.name}</span></div>
        <div className="summary-player-info bi-fs-infobox">
          <p>Total buy in: {player.buyin} $</p>
          <p>Final Stack: {player.finalStack} $</p>
        </div>
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
        <div className="summary-player-win">
          <span className="total-win">Wins: {player.finalStack - player.buyin} $</span>
        </div>
      </li>
    );
  }
}

export default FinishedPlayerCard;