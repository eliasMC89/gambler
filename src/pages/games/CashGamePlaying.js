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
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cash.getDetail(id)
      .then((cashGame)=>{
        this.setState({
          currentPlayerList: cashGame.currentPlayerList,
          pot: cashGame.pot,
        })
      })
  }

  handleEndGame = () => {
    const { id } = this.props.match.params;
    cash.endGame(id)
      .then(()=>{
        this.props.history.push(`/cash-game/${id}/summary`);
      })
  }

  render() {
    const { id } = this.props.match.params;
    const { currentPlayerList, pot } = this.state;
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
        </div>
        <div className="end-game-btn-box">
          <button onClick={this.handleEndGame} className="end-game-btn">END GAME</button>
        </div>
      </div>
    );
  }
}

export default CashGamePlaying;