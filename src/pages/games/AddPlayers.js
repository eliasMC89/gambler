import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { withAuth } from '../../providers/AuthProvider';


class AddPlayer extends Component {

  state = {
    playerList: [],
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
    this.setState({
      currentPlayerBuyIn: value,
    });
  }

  handleSubmitPlayer = (event) => {
    event.preventDefault();
    const newPlayerList = this.state.playerList;
    const newPlayer = {
      name: this.state.currentPlayerName,
      buyin: this.state.currentPlayerBuyIn,
      finalStack: 0,
    }
    newPlayerList.push(newPlayer);
    this.setState({
      playerList: newPlayerList,
      currentPlayerName: '',
      currentPlayerBuyIn: 0,
    })
  }

  getTotalPot = (playerList) => {
    let totalPot = 0;
    playerList.forEach((player)=>{
      totalPot += player.buyin;
    })
    return totalPot;
  }

  handleSubmitNewGame = (event) => {
    event.preventDefault();    
    const playerList = this.state.playerList;
    const pot = this.getTotalPot(this.state.playerList);
    const isPlaying = true;
    const owner = this.props.user._id;

    cash.create({playerList, pot, isPlaying, owner})
      .then((res)=>{
        console.log('created');
        // console.log(this.props);
        this.props.history.push('/cash-game/playing')
      })
      .catch( error => console.log(error) )
    
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <h1>Players: </h1>
        <form onSubmit={this.handleSubmitPlayer}>
          <p><input type="text" name="name" value={this.state.currentPlayerName} onChange={this.handleNameChange} /></p>
          <p><input type="number" name="buyin" value={this.state.currentPlayerBuyIn} onChange={this.handleBuyInChange} /></p>
          <input type="submit" value="AddPlayer" />
        </form>
        <ul>
          {this.state.playerList.map((player, index)=>{
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