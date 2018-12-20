import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import CashGameCard from '../../components/CashGameCard';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';

class MySharedGames extends Component {

  state = {
    mySharedGames: [],
    isLoading: true,
  }

  componentDidMount () {
    cash.getMySharedGames()
      .then((games)=>{
        this.setState({
          mySharedGames: games,
          isLoading: false,
        })
      })
    
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />
    } else {
      const { mySharedGames } = this.state;
      return (
        <div className="container">
          <Header title="Shared games"/>
          <ul className="game-list">
            {mySharedGames.map((game)=>{
              return(
                <li key={`${game._id}`}>
                  <Link to={`/cash-game/${game._id}/invitation`} className="game-link"><CashGameCard game={game} class="is-not-playing" /></Link>
                </li>
              )
            })}
          </ul>
        </div>
      );
    }
  }
}

export default MySharedGames;