import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';

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
    cash.endGame(id);
  }

  render() {
    const { id } = this.props.match.params;
    const { currentPlayerList, pot } = this.state;
    return (
      <div className="container">
        <Header title="Game playing:" />
        <ul>
          {currentPlayerList.map((player)=>{
            return (
              <li key={`id=${player._id}`}>
                <div>{player.name}, {player.buyin}</div>
                <div><Link to={`/cash-game/${id}/rebuy/${player._id}`} >Rebuy</Link></div>
                <div><Link to={`/cash-game/${id}/final-stack/${player._id}`} >Final Stack</Link></div>
              </li>
            )
          })}
        </ul>
        <div><p>Pot: {pot}</p></div>
        <Link to={`/cash-game/${id}/summary`} onClick={this.handleEndGame} >END GAME</Link>
      </div>
    );
  }
}

export default CashGamePlaying;