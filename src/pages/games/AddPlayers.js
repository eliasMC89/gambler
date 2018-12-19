import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { withAuth } from '../../providers/AuthProvider';

import Header from '../../components/Header';
import CancelButton from '../../components/CancelButton';


class AddPlayer extends Component {

  state = {
    currentPlayerList: [],
    currentPlayerName: '',
    currentPlayerBuyIn: '',
    emptyInputError: false,
    noPlayersError: false,
    negativeBuyinError: false,

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
    const {currentPlayerBuyIn, currentPlayerName, currentPlayerList} = this.state;
    if(!currentPlayerName || !currentPlayerBuyIn){
      this.setState({
        emptyInputError: true,
        negativeBuyinError: false,
      })
    } else if (currentPlayerBuyIn < 0) {
      this.setState({
        negativeBuyinError: true,
        emptyInputError: false,
      })
      return;
    } else {
      const newCurrentPlayerList = currentPlayerList;
      const newPlayer = {
        name: currentPlayerName,
        buyin: currentPlayerBuyIn,
        finalStack: 0,
        isPlaying: true,
        buyinHistory: [currentPlayerBuyIn],
      }
      newCurrentPlayerList.push(newPlayer);
      this.setState({
        currentPlayerList: newCurrentPlayerList,
        currentPlayerName: '',
        currentPlayerBuyIn: '',
        emptyInputError: false,
        noPlayersError: false,
        negativeBuyinError: false,
      })
    }
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
    if (currentPlayerList.length === 0) {
      this.setState({
        noPlayersError: true,
      })
    } else {
      const isPlaying = true;
      const pot = this.getTotalPot(currentPlayerList);
      const remainingPot = pot;
      const owner = this.props.user._id;
      cash.create({currentPlayerList, pot, remainingPot, owner, isPlaying})
        .then((res)=>{
          this.props.history.push(`/cash-game/${res.game._id}/playing`)
        })
        .catch( error => console.log(error) )
    }
    
  }


  render() {
    const { currentPlayerList, emptyInputError, currentPlayerName, currentPlayerBuyIn, noPlayersError, negativeBuyinError } = this.state;
    return (
      <div className="container">
        <Header title="Players:" />
        <form onSubmit={this.handleSubmitPlayer} className="add-player-form">
          <div className="add-name-box">
            <label>Name: </label>
            <input type="text" name="name" value={currentPlayerName} onChange={this.handleNameChange} className="add-name-input" placeholder="Player name"/>
          </div>
          <div className="add-buyin-box">
            <label>Buy in: </label>
            <input type="number" name="buyin" value={currentPlayerBuyIn} onChange={this.handleBuyInChange} className="add-buyin-input" />
          </div>
          <div className="add-player-btn-box">
            <input type="submit" value="+" className="add-player-btn"/>
          </div>
        </form>
        { emptyInputError ? <h4 className="error-msg">Fill in the fields!</h4> : ''}
        { negativeBuyinError ? <h4 className="error-msg">Cannot buy in a negative value</h4> : ''}
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
        { noPlayersError ? <h4 className="error-msg">Add some players!</h4> : ''}
        <div className="cancel-btn-box">
          <CancelButton pageHistory={this.props.history} />
        </div>
      </div>  
    );
  }
}

export default withAuth(AddPlayer);