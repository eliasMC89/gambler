import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import Header from '../../components/Header';
import CancelButton from '../../components/CancelButton';
import LoadingSpinner from '../../components/LoadingSpinner';

class NewPlayer extends Component {
  
  state = {
    currentPlayerList: [],
    currentPlayerName: '',
    currentPlayerBuyIn: 0,
    emptyInput: false,
    isLoading: true,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cash.getDetail(id)
      .then((cashGame)=>{
        const { currentPlayerList } = cashGame;
        this.setState({
          currentPlayerList,
          isLoading: false,
        })
      })
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

  handleNewPlayer = (event) => {
    event.preventDefault();
    const { currentPlayerBuyIn, currentPlayerName, currentPlayerList } = this.state;
    const { id } = this.props.match.params;
    if(!currentPlayerName || !currentPlayerBuyIn){
      this.setState({
        emptyInput: true,
      })
      return;
    }
    const newCurrentPlayerList = currentPlayerList;
    const newPlayer = {
      name: currentPlayerName,
      buyin: currentPlayerBuyIn,
      finalStack: 0,
      isPlaying: true,
      buyinHistory: [currentPlayerBuyIn],
    }
    newCurrentPlayerList.push(newPlayer);
    // update game here!! and redirect to playing
    cash.newPlayer(id, currentPlayerBuyIn, newCurrentPlayerList)
      .then((game) => {
        this.props.history.push(`/cash-game/${game._id}/playing`)
      })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />
    } else {
      const { currentPlayerName, currentPlayerBuyIn, emptyInput } = this.state;
      return (
          <div className="container">
            <Header title="New player" />
            { emptyInput ? <h4 className="error-msg">Fill in the fields!</h4> : ''}
            <form onSubmit={this.handleNewPlayer} className="add-player-form">
              <div className="add-name-box">
                <label>Name: </label>
                <input type="text" name="name" value={currentPlayerName} onChange={this.handleNameChange} className="add-name-input" placeholder="Player name"/>
              </div>
              <div className="add-buyin-box">
                <label className="add-buyin-label">Buy in: </label>
                <input type="number" name="buyin" value={currentPlayerBuyIn} onChange={this.handleBuyInChange} className="add-buyin-input" />
              </div>
              <div className="add-player-btn-box">
                <button onClick={this.handleSubmitPlayer} className="add-player-btn"><img src={require('./plus-button.png')} alt="add" className="add-player-img"/></button>
              </div>
            </form>
            <div className="cancel-btn-box">
              <CancelButton pageHistory={this.props.history} />
            </div>
          </div>
      );
    }
  }
}

export default NewPlayer;