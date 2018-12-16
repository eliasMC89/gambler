import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { withAuth } from '../../providers/AuthProvider';

import Header from '../../components/Header';
import PlayerList from '../../components/PlayerList';


class AddPlayer extends Component {

  state = {
    currentPlayerList: [],
    currentPlayerName: '',
    currentPlayerBuyIn: 0,
    title: 'Players',
  }

  handleNameChange = (event) => {  
    const { value }  = event.target;
    this.setState({
      currentPlayerName: value,
    })
  }

  handleBuyInChange = (event) => {  
    const { value } = event.target;
    const buyIn = Number(value);
    this.setState({
      currentPlayerBuyIn: buyIn,
    });
  }

  handleSubmitPlayer = (event) => {
    event.preventDefault();
    const newCurrentPlayerList = this.state.currentPlayerList;
    const newPlayer = {
      name: this.state.currentPlayerName,
      buyin: this.state.currentPlayerBuyIn,
      finalStack: 0,
    }
    newCurrentPlayerList.push(newPlayer);
    this.setState({
      currentPlayerList: newCurrentPlayerList,
      currentPlayerName: '',
      currentPlayerBuyIn: 0,
    })
  }

  getTotalPot = (playerList) => {
    let totalPot = 0;
    playerList.forEach((player)=>{
      totalPot = totalPot + player.buyin;
    })
    return totalPot;
  }

  handleSubmitNewGame = (event) => {
    event.preventDefault();    
    const currentPlayerList = this.state.currentPlayerList;
    const pot = this.getTotalPot(this.state.currentPlayerList);
    const isPlaying = true;
    const owner = this.props.user._id;

    cash.create({currentPlayerList, pot, isPlaying, owner})
      .then((res)=>{
        this.props.history.push(`/cash-game/${res.game._id}/playing`)
      })
      .catch( error => console.log(error) )
    
  }

  render() {
    const { currentPlayerName, currentPlayerBuyIn, currentPlayerList } = this.state;
    return (
      <div className="container">
        <Header title={this.state.title} />
        <form onSubmit={this.handleSubmitPlayer} className="add-player-form">
          <div className="add-name-box">
            <label>Name: </label>
            <input type="text" name="name" value={currentPlayerName} onChange={this.handleNameChange} className="add-name-input" />
          </div>
          <div className="add-buyin-box">
            <label>Buy in: </label>
            <input type="number" name="buyin" value={currentPlayerBuyIn} onChange={this.handleBuyInChange} className="add-buyin-input" />
          </div>
          <div className="add-player-btn-box">
            <input type="submit" value="+" className="add-player-btn"/>
          </div>
        </form>
        <PlayerList playerList={currentPlayerList} />
        <div className="start-btn-box">
          <button onClick={this.handleSubmitNewGame} className="start-btn">START</button>
        </div>
        
        
      </div>
    );
  }
}

export default withAuth(AddPlayer);