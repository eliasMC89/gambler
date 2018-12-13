import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withAuth } from '../../providers/AuthProvider';

import Navbar from '../../components/Navbar';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Link to="/cash-game/add-players">NEW GAME</Link>
      </div>
    )
  }
}

export default withAuth(Home);
