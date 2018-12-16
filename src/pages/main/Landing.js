import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <h1 className="main-title">Gambler</h1> 
        </div>
        <div className="container landing-text">
          <p className="main-text">Keep track of your games</p>
        </div>
      </div>
    );
  }
}

export default Landing;