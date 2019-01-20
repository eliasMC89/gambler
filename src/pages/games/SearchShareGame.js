import React, { Component } from 'react';
import auth from '../../lib/auth-service';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';
import CancelButton from '../../components/CancelButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotFound from '../main/NotFound';

class SearchShareGame extends Component {

  state = {
    searchPlayer: '',
    foundPlayer: {},
    notFoundPlayer: false,
    errorMessage: '',
    owner: '',
    pendingOwners: [],
    secondaryOwners: [],
    myUsername: '',
    isLoading: true,
    serverError: false,
  }

  componentDidMount () {
    const { id } = this.props.match.params;

    cash.getDetail(id)
      .then((game)=>{
        const { owner, pendingOwners, secondaryOwners } = game;
        this.setState({
          owner,
          pendingOwners,
          secondaryOwners,
        })
        auth.me()
          .then((user)=>{
            const { username } = user;
            this.setState({
              myUsername: username,
              isLoading: false,
            })
          .catch(error => {
            this.setState({
              isLoading: false,
              serverError: true,
            })
          })
      })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          serverError: true,
        })
      })
    
  }

  handleNameChange = (event) => {  
    const { value }  = event.target;
    this.setState({
      searchPlayer: value,
    })
  }

  onSubmitSearch = (e) => {
    e.preventDefault();
    const { searchPlayer, myUsername } = this.state;

    if (searchPlayer === myUsername) {
      this.setState({
        searchPlayer: '',
        foundPlayer: '',
        notFoundPlayer: true,
        errorMessage: "Can't share with yourself!"
      })
    } else {
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
              errorMessage: 'Wrong username!',
            })
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    }


  }

  handleClickShare = () => {
    // make post to add user id in pending owners
    const { id } = this.props.match.params;
    const { owner, foundPlayer, pendingOwners, secondaryOwners } = this.state;
    
    if (owner === foundPlayer._id || pendingOwners.includes(foundPlayer._id) || secondaryOwners.includes(foundPlayer._id)) {
      this.props.history.goBack(); 
    } else {
      cash.shareGame(id, foundPlayer._id)
        .then((res)=>{
          this.props.history.goBack();
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            serverError: true,
          })
        })
    }
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
    if (this.state.serverError) {
      return <NotFound />
    } else if (this.state.isLoading) {
        return <LoadingSpinner />
    } else {
      const { searchPlayer, foundPlayer, notFoundPlayer, errorMessage } = this.state;
      return (
        <div className="container">
          <Header title="Search user"/>
          <form onSubmit={this.onSubmitSearch} className="user-found-box">
            <div className="add-name-box">
              <input type="text" name="name" value={searchPlayer} onChange={this.handleNameChange} className="add-name-input" placeholder="Search user"/>
            </div>
            <div className="add-player-btn-box">
              <input type="submit" value="Search" className="search-btn"/>
            </div>
          </form>
          { foundPlayer.username ? this.showPlayer(foundPlayer.username) : ''}
          { notFoundPlayer ? <div><h4 className="error-msg">{errorMessage}</h4></div> : ''}
          <div className="cancel-btn-box">
            <CancelButton pageHistory={this.props.history} />
          </div>
          
        </div>
      );
    }
  }
}

export default SearchShareGame;