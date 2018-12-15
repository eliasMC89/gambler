import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { withAuth } from '../../providers/AuthProvider';


class AddPlayer extends Component {

  state = {
    currentPlayerList: [],
    currentPlayerName: '',
    currentPlayerBuyIn: 0,
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
    return (
      <div>
        <h1>Players: </h1>
        <form onSubmit={this.handleSubmitPlayer}>
          <div><input type="text" name="name" value={this.state.currentPlayerName} onChange={this.handleNameChange} /></div>
          <div><input type="number" name="buyin" value={this.state.currentPlayerBuyIn} onChange={this.handleBuyInChange} /></div>
          
          <input type="submit" value="AddPlayer" />
        </form>
        <ul>
          {this.state.currentPlayerList.map((player, index)=>{
            return (
              <li key={`id=${index}`}>
              Player {`${index+1}`}: {player.name}, {player.buyin} $
              </li>
            )
          })}
        </ul>
        <button onClick={this.handleSubmitNewGame} >START GAME</button>
        
      </div>
    );
  }
}

export default withAuth(AddPlayer);