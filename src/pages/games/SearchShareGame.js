import React, { Component } from 'react';
import auth from '../../lib/auth-service';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';

class SearchShareGame extends Component {

  state = {
    searchPlayer: '',
    listPlayerNames: [],
    foundPlayer: {},
    notFoundPlayer: false,
  }

  handleNameChange = (event) => {  
    const { value }  = event.target;
    this.setState({
      searchPlayer: value,
    })
  }

  onSubmitSearch = (e) => {
    e.preventDefault();
    const { searchPlayer } = this.state;

    auth.search(searchPlayer)
      .then((user)=>{
        if (user){
          this.setState({
            searchPlayer: '',
            foundPlayer: user,
            notFoundPlayer: false,
          })
        } else {
          this.setState({
            searchPlayer: '',
            foundPlayer: '',
            notFoundPlayer: true,
          })
        }
      })
      .catch((error)=>{
        console.log(error)
      })

  }

  handleClickShare = () => {
    // make post to add user id in pending owners
    const { id } = this.props.match.params;
    const { foundPlayer } = this.state;
    
    cash.shareGame(id, foundPlayer._id)
      .then((res)=>{
        this.props.history.goBack();
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  showPlayer = (username) => {
    return (
      <div className="user-found-box">
        <p className="user-found">{username}</p>
        <button onClick={this.handleClickShare} className="share-btn">SHARE</button>
      </div>
    )
  }


  render() {
    const { searchPlayer, foundPlayer, notFoundPlayer } = this.state;
    return (
      <div className="container">
        <Header title="Search user:"/>
        <form onSubmit={this.onSubmitSearch} className="user-found-box">
          <div className="add-name-box">
            <input type="text" name="name" value={searchPlayer} onChange={this.handleNameChange} className="add-name-input" placeholder="Search user"/>
          </div>
          <div className="add-player-btn-box">
            <input type="submit" value="Search" className="search-btn"/>
          </div>
        </form>
        { foundPlayer.username ? this.showPlayer(foundPlayer.username) : ''}
        { notFoundPlayer ? <div><h4 className="error-msg">Player not exists!</h4></div> : ''}
        
      </div>
    );
  }
}

export default SearchShareGame;