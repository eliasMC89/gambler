import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import CashGameCard from '../../components/CashGameCard';

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
    console.log(this.state.myGames)
    const { myGames } = this.state;
    return (
      <div>
        <h1>This are my games:</h1>
        <ul>
          {myGames.map((game)=>{
            return(
              <li key={`${game._id}`}>
                <CashGameCard game={game} />
              </li>
            )
          })}
        </ul>
        <Link to="/profile/my-info">Back to profile</Link>
      </div>
    );
  }
}

export default MyGames;