import React, { Component } from 'react';

import Navbar from '../../components/Navbar';

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-title">
            <h1>G<img src={require('./trebol-poker.png')} alt="trebol"></img>MBLER</h1>
          </div>
        </div>
        <div className="container landing-text">
          <p className="main-text">Keep track of your games</p>
        </div>
      </div>
    );
  }
}

export default Landing;