import React, { Component } from 'react';
import auth from '../../lib/auth-service';

import Header from '../../components/Header';

class SearchShare extends Component {

  state = {
    searchPlayer: '',
    listPlayerNames: [],
    foundPlayer: '',
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
            foundPlayer: user.username,
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

  render() {
    const { searchPlayer, foundPlayer, notFoundPlayer } = this.state;
    return (
      <div className="container">
        <Header title="Search user:"/>
        <form onSubmit={this.onSubmitSearch} >
          <div className="add-name-box">
            <label>Name: </label>
            <input type="text" name="name" value={searchPlayer} onChange={this.handleNameChange} className="add-name-input" />
          </div>
          <div className="add-player-btn-box">
            <input type="submit" value="Search" />
          </div>
        </form>
        { foundPlayer ? <div><h5>{foundPlayer}</h5></div> : ''}
        { notFoundPlayer ? <div><h4 className="error-msg">Player not exists!</h4></div> : ''}
        
      </div>
    );
  }
}

export default SearchShare;