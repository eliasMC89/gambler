import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="newgame-btn">
          <Link to="/cash-game/add-players" className="newgame-link">NEW GAME</Link>
        </div>
        <div className="odd-calc-link" >
          <Link to="/odds-calculator" >Odds calculator</Link>
        </div>
        
      </div>
    )
  }
}

export default Home;
