import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cashGameService from '../../lib/cashGame-service';

class CashGamePlaying extends Component {

  state = {
    currentPlayerList: [],
    pot: 0,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cashGameService.getDetail(id)
      .then((cashGame)=>{
        console.log(cashGame);
        this.setState({
          currentPlayerList: cashGame.currentPlayerList,
          pot: cashGame.pot,
        })
      })
  }

  render() {
    const { id } = this.props.match.params;
    const { currentPlayerList, pot } = this.state;
    return (
      <div>
        <h1>Game playing</h1>
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
        <Link to={`/cash-game/${id}/summary`}>END GAME</Link>
      </div>
    );
  }
}

export default CashGamePlaying;