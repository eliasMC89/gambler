import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import CashGameCard from '../../components/CashGameCard';
import Header from '../../components/Header';

class MySharedGames extends Component {

  state = {
    mySharedGames: [],
  }

  componentDidMount () {
    cash.getMySharedGames()
      .then((games)=>{
        this.setState({
          mySharedGames: games,
        })
      })
    
  }

  render() {
    const { mySharedGames } = this.state;
    return (
      <div className="container">
        <Header title="Shared games:"/>
        <ul className="game-list">
          {mySharedGames.map((game)=>{
            return(
              <li key={`${game._id}`}>
                <Link to={`/cash-game/${game._id}/invitation`} className="game-link"><CashGameCard game={game} class="is-not-playing" /></Link>
              </li>
            )
          })}
        </ul>
        <div className="backprofile-box">
          <Link to="/profile/my-info" className="backhome-link">Back to profile</Link>
        </div>
      </div>
    );
  }
}

export default MySharedGames;