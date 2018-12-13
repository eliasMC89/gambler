import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h1>Gambler</h1> 
        <p>Organize your games</p>
      </div>
    );
  }
}

export default Landing;