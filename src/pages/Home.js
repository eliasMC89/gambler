import React, { Component } from 'react';
import { withAuth } from '../providers/AuthProvider';

import Navbar from '../components/Navbar';

class Home extends Component {
  render() {
    {console.log(this.props)}
    return (
      <div>
        <Navbar />
        <button>NEW GAME</button>
      </div>
    )
  }
}

export default withAuth(Home);
