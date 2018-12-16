import React, { Component } from 'react';

import AddPlayerCard from './AddPlayerCard';

class PlayerList extends Component {
  render() {
    const { playerList } = this.props;
    return (
      <ul className="add-player-list">
        {playerList.map((player)=>{
          return <AddPlayerCard player={player} />
        })}
      </ul>
    );
  }
}

export default PlayerList;