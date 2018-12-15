import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cash from '../../lib/cashGame-service';

class CashGameSummary extends Component {

  state = {
    playerList: [],
    pot: 0,
    startDate: '',
    endDate: '',
    duration: 'some',
  }

  componentDidMount () {
  const { id } = this.props.match.params;
  cash.getDetail(id)
    .then((cashGame)=>{
      console.log(cashGame);
      const { currentPlayerList, pot, startDate, endDate } = cashGame;
      const duration = Date.parse(endDate) - Date.parse(startDate);

      this.setState({
        playerList: currentPlayerList,
        pot,
        startDate,
        duration
      })
    })
  }

  msToTime = (duration) => {
      // let milliseconds = parseInt((duration % 1000) / 100)
      let seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
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
        <p>Duration: {this.msToTime(duration)}</p>
        <Link to="/home" >Close Game</Link>
      </div>
    );
  }
}

export default CashGameSummary;