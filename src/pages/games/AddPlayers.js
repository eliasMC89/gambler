import React, { Component } from 'react';

class AddPlayer extends Component {

  state = {
    playerList: [
    {
      name: 'Me',
      buyin: 0,
    }],
    currentPlayer: {
      name: '',
      buyin: 0,
    }
  }

  // handleChange = (event) => {  
  //   const {name, value} = event.target;
  //   this.setState({[name]: value});
  // }

  render() {
    return (
      <div>
        <h1>Players: </h1>
        <form onSubmit={this.handleFormSubmit}>
          
          <p><input type="text" name="name" value={this.state.currentPlayer.name} onChange={this.handleChange} placeholder="Name"/></p>
          <p><input type="number" name="buyin" value={this.state.currentPlayer.buyin} onChange={this.handleChange} /></p>
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
      </div>
    );
  }
}

export default AddPlayer;