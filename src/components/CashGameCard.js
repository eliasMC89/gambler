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
    let seconds = parseInt((durationInMs / 1000) % 60),
    minutes = parseInt((durationInMs / (1000 * 60)) % 60),
    hours = parseInt((durationInMs / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  msToDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  render() {
    const { game } = this.props;
    return (
      <div className={`game-card-container ${this.props.class}`}>
        <div className="first-line-game-info">
          <p>{this.msToDate(Date.parse(game.startDate))}</p>
          <p><span className="pot-info">Pot: {game.pot}</span></p>
        </div>
        <div className="second-line-game-info">
          <p>Duration: {this.msToTime(this.state.duration)}</p>
          <p>Players: {game.currentPlayerList.length}</p>
        </div>
      </div>
    );
  }
}

export default CashGameCard;