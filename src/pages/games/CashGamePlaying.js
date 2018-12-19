import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';
import CurrentPlayerCard from '../../components/CurrentPlayerCard';
import FinishedPlayerCard from '../../components/FinishedPlayerCard';

class CashGamePlaying extends Component {

  state = {
    currentPlayerList: [],
    pot: 0,
    remainingPot: 0,
    playersRemainingError: false,
    isLoading: true,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cash.getDetail(id)
      .then((cashGame)=>{
        this.setState({
          currentPlayerList: cashGame.currentPlayerList,
          pot: cashGame.pot,
          remainingPot: cashGame.remainingPot,
          playersRemainingError: false,
          isLoading: false,
        })
      })
  }

  checkPlayersRemaining = (playerList) => {
    for (let i = 0; i < playerList.length; i++){
      if (playerList[i].isPlaying){
        return true;
      }
    }
    return false;
  }

  handleEndGame = () => {
    const { id } = this.props.match.params;
    if (this.checkPlayersRemaining(this.state.currentPlayerList)) {
      this.setState({
        playersRemainingError: true,
      })
    } else {
      cash.endGame(id)
        .then(()=>{
          this.props.history.push(`/cash-game/${id}/summary`);
        })
    }
  }

  render() {
    if (this.state.isLoading){
      return <h1>Loading...</h1>
    } else {
        const { id } = this.props.match.params;
        const { currentPlayerList, pot, remainingPot, playersRemainingError } = this.state;
        return (
          <div className="container">
            <Header title="Game playing:" />
            <ul className="player-list" >
              {currentPlayerList.map((player)=>{
                if (player.isPlaying){
                  return <CurrentPlayerCard player={player} gameId={id} key={`id=${player._id}`}/>
                } else {
                  return <FinishedPlayerCard player={player} gameId={id} key={`id=${player._id}`}/>
                }
              })}
            </ul>
            <div>
              <Link to={`/cash-game/${id}/new-player`} >Add player</Link>
            </div>
            <div className="playing-pot-box">
              <h3 className="playing-pot">Pot: {pot} $</h3>
              <h4>(Remaining pot: {remainingPot})</h4>
            </div>
            <div className="end-game-btn-box">
              <button onClick={this.handleEndGame} className="end-game-btn">END GAME</button>
            </div>
            { playersRemainingError ? <h4 className="error-msg">Players still playing!</h4> : ''}
          </div>
        )
    }
  }
}

export default CashGamePlaying;