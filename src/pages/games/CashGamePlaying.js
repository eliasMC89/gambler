import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cashGameService from '../../lib/cashGame-service';
import RebuyLink from '../../components/RebuyLink';

class CashGamePlaying extends Component {

  state = {
    playerList: [],
    pot: 0,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cashGameService.getDetail(id)
      .then((cashGame)=>{
        this.setState({
          playerList: cashGame.playerList,
          pot: cashGame.pot,
        })
      })
  }

  render() {
    const { id } = this.props.match.params;
    const { playerList, pot } = this.state;
    return (
      <div>
        <h1>Game playing</h1>
        <ul>
          {playerList.map((player)=>{
            return (
              <li key={`id=${player._id}`}>
              <div>{player.name}, {player.buyin}</div>
              <div><RebuyLink playerId={player._id} cashGameId={id}/></div>
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