import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cash from '../../lib/cashGame-service';

class CashGameSummary extends Component {

  state = {
    playerList: [],
    pot: 0,
    duration: 'some time',
  }

  componentDidMount () {
  const { id } = this.props.match.params;
  cash.getDetail(id)
    .then((cashGame)=>{
      console.log(cashGame);
      this.setState({
        playerList: cashGame.currentPlayerList,
        pot: cashGame.pot,
      })
    })
  }

  render() {
    const { playerList, pot, duration } = this.state;
    return (
      <div>
        <h1>Game Summary</h1>
        <p>Total Pot: {pot}</p>
        <ul>
          {playerList.map((player, index)=>{
            return (
              <li key={`id=${index}`}>
              <div>{player.name}, {player.buyin}</div>
              <div>Final Stack: {player.finalStack}</div>
              <div>Wins: {player.finalStack - player.buyin}</div>
              </li>
            )
          })}
        </ul>
        <p>Duration: {duration}</p>
        <Link to="/home">Close Game</Link>
      </div>
    );
  }
}

export default CashGameSummary;