import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import CashGameCard from '../../components/CashGameCard';
import Header from '../../components/Header';

class MyGames extends Component {

  state = {
    myGames: [],
  }

  componentDidMount () {
    cash.getMyGames()
      .then((myGames)=>{
        this.setState({
          myGames,
        })
      })
  }

  render() {
    const { myGames } = this.state;
    return (
      <div className="container">
        <Header title="My games:"/>
        <ul className="game-list">
          {myGames.map((game)=>{
            if (game.isPlaying) {
              return(
                <li key={`${game._id}`}>
                  <Link to={`/cash-game/${game._id}/playing`} className="game-link"><CashGameCard game={game}/></Link>
                </li>
              )
            } else {
              return(
                <li key={`${game._id}`}>
                  <Link to={`/cash-game/${game._id}/summary`} className="game-link"><CashGameCard game={game}/></Link>
                </li>
              )
            }
          })}
        </ul>
        <div className="backprofile-box">
          <Link to="/profile/my-info" className="backhome-link">Back to profile</Link>
        </div>
        
      </div>
    );
  }
}

export default MyGames;