import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import CashGameCard from '../../components/CashGameCard';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotFound from '../main/NotFound';

class MyGames extends Component {

  state = {
    myGames: [],
    isLoading: true,
    serverError: false,
  }

  componentDidMount () {
    cash.getMyGames()
      .then((myGames)=>{
        this.setState({
          myGames,
          isLoading: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          serverError: true,
        })
      })
    
  }

  render() {

    if (this.state.serverError) {
      return <NotFound />
    } else if (this.state.isLoading) {
        return <LoadingSpinner />
    } else {
        const { myGames } = this.state;
        return (
          <div className="container">
            <Header title="My games"/>
            <ul className="game-list">
              {myGames.map((game)=>{
                if (game.isPlaying) {
                  return(
                    <li key={`${game._id}`}>
                      <Link to={`/cash-game/${game._id}/playing`} className="game-link"><CashGameCard game={game} class="is-playing" /></Link>
                    </li>
                  )
                } else {
                  return(
                    <li key={`${game._id}`}>
                      <Link to={`/cash-game/${game._id}/summary`} className="game-link"><CashGameCard game={game} class="is-not-playing" /></Link>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        );
    }
  }
}

export default MyGames;