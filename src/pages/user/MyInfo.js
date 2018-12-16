import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';

import Header from '../../components/Header';

class MyInfo extends Component {
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div className="container">  
        <div className="logout-btn-box">
          <Link to="/" onClick={this.props.logout} className="logout-btn">Logout</Link>
        </div>
        <Header title="My information"/>
        <ul className="my-info-container">
          <li><span className="my-info-tag">Username:</span> {user.username}</li>
          {/* <li>games played: {user.gamesPlayed}</li> */}
          {/* <li>total played: {user.totalPlayed}</li>
          <li>total won: {user.totalWon}</li>
          <li>total lost: {user.totalLost}</li>
          <li>overall: {user.totalWon - user.totalLost}</li>
          <li>win rate: {user.totalPlayed ? user.totalWon / user.totalPlayed : 0}</li> */}
        </ul>
        <div className="my-games-btn-box">
          <Link to="/profile/my-games" className="my-games-link">My Games</Link>
        </div>
        <div>
          <Link to="/home" className="backhome-link">Back home</Link>
        </div>
        
      </div>
    );
  }
}

export default withAuth(MyInfo);