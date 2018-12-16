import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../providers/AuthProvider';

class MyInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Link to="/" onClick={this.props.logout}>Logout</Link>
        <p>This is my profile</p>
        <div>
          <ul>
            <li>username: {user.username}</li>
            {/* <li>games played: {user.gamesPlayed}</li> */}
            {/* <li>total played: {user.totalPlayed}</li>
            <li>total won: {user.totalWon}</li>
            <li>total lost: {user.totalLost}</li>
            <li>overall: {user.totalWon - user.totalLost}</li>
            <li>win rate: {user.totalPlayed ? user.totalWon / user.totalPlayed : 0}</li> */}
          </ul>
        </div>
        <Link to="/profile/my-games">My Games</Link>
        <p><Link to="/home" >Back home</Link></p>
      </div>
    );
  }
}

export default withAuth(MyInfo);