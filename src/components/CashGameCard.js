import React, { Component } from 'react';

class CashGameCard extends Component {

  state = {
    startDate: '',
    duration: '',
    numPlayers: 0,
    pot: 0,
  }

  componentDidMount () {
    const { game } = this.props;
    const { currentPlayerList, pot, startDate, endDate } = game;
    const duration = Date.parse(endDate) - Date.parse(startDate);
    const numPlayers = currentPlayerList.length;
  
    this.setState({
      startDate,
      duration,
      numPlayers,
      pot,
    })
  }

  msToTime = (durationInMs) => {
    // let milliseconds = parseInt((duration % 1000) / 100)
    let seconds = parseInt((durationInMs / 1000) % 60),
    minutes = parseInt((durationInMs / (1000 * 60)) % 60),
    hours = parseInt((durationInMs / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  toStringDate = (date) => {
    
  }

  msToDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  render() {
    const { game } = this.props;
    return (
      <div>
        <h3>
          Game:
        </h3>
        <p>Date: {this.msToDate(Date.parse(game.startDate))}</p>
        <p>Duration: {this.msToTime(this.state.duration)}</p>
        <p>Players: {game.currentPlayerList.length}</p>
        <p>Pot: {game.pot}</p>
      </div>
    );
  }
}

export default CashGameCard;