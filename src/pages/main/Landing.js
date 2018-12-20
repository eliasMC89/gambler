import React, { Component } from 'react';
import trebol from './main-images/trebol-poker.png';
import Navbar from '../../components/Navbar';

class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="main-title">
            <h1>G<img src={trebol} alt="trebol"></img>MBLER</h1>
          </div>
        </div>
        <div className="container landing-text">
          <p className="main-text">For live poker playing</p>
        </div>
      </div>
    );
  }
}

export default Landing;