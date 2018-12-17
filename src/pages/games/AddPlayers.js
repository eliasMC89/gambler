import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { withAuth } from '../../providers/AuthProvider';

import Header from '../../components/Header';


class AddPlayer extends Component {

  state = {
    currentPlayerList: [],
    currentPlayerName: '',
    currentPlayerBuyIn: '',
    emptyInput: false,
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
    const { currentPlayerName, currentPlayerBuyIn } = this.state;
    if(!currentPlayerName || !currentPlayerBuyIn){
      this.setState({
        emptyInput: true,
      })
      return;
    }
    const newCurrentPlayerList = this.state.currentPlayerList;
    const newPlayer = {
      name: this.state.currentPlayerName,
      buyin: this.state.currentPlayerBuyIn,
      finalStack: 0,
      isPlaying: true,
    }
    newCurrentPlayerList.push(newPlayer);
    this.setState({
      currentPlayerList: newCurrentPlayerList,
      currentPlayerName: '',
      currentPlayerBuyIn: 0,
    }, this.setState({
      emptyInput: false,
    }))
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
    const { currentPlayerList } = this.state;

    const pot = this.getTotalPot(this.state.currentPlayerList);
    const owner = this.props.user._id;
    cash.create({currentPlayerList, pot, owner})
      .then((res)=>{
        this.props.history.push(`/cash-game/${res.game._id}/playing`)
      })
      .catch( error => console.log(error) )
    
  }

  render() {
    const { currentPlayerName, currentPlayerBuyIn, currentPlayerList, emptyInput } = this.state;
    console.log(emptyInput);
    return (
      <div className="container">
        <Header title="Players:" />
        { emptyInput ? <h4 className="error-msg">Fill in the fields!</h4> : ''}
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
        <ul className="player-list">
          {currentPlayerList.map((player, index)=>{
            return (
              <li key={`id=${index}`} className="add-player-card">
                {player.name}, {player.buyin} $
              </li>
            )
          })}
        </ul>
        <div className="start-btn-box">
          <button onClick={this.handleSubmitNewGame} className="start-btn">START</button>
        </div>
        
        
      </div>
    );
  }
}

export default withAuth(AddPlayer);