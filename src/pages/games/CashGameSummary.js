import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';
import { Route, Link } from 'react-router-dom';
import auth from '../../lib/auth-service';

import Header from '../../components/Header';
import SummaryPlayerCard from '../../components/SummaryPlayerCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotFound from '../main/NotFound';

class CashGameSummary extends Component {

  state = {
    currentUser: '',
    owner: '',
    secondaryOwners: [],
    playerList: [],
    pot: 0,
    startDate: '',
    endDate: '',
    duration: '',
    isLoading: true,
    isError: false,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cash.getDetail(id)
      .then((game)=>{
        const { owner, currentPlayerList, pot, startDate, endDate } = game;
        const duration = Date.parse(endDate) - Date.parse(startDate);

        this.setState({
          owner,
          playerList: currentPlayerList,
          pot,
          startDate,
          duration
        })
        auth.me()
          .then((user)=>{
            this.setState({
              currentUser: user._id,
              isLoading: false,
            })
          })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        })
      })
    
    
    

  }

  handleDeleteGame = () => {
    const { id } = this.props.match.params;
    const { currentUser, owner } = this.state;

    if (owner === currentUser) {
      cash.deleteGame(id)
        .then(()=>{
          this.props.history.push('/profile/my-games')
        })
    } else {
      cash.deleteSharedGame(id)
        .then(()=>{
          this.props.history.push('/profile/my-games')
        })
    }
    
  }

  msToTime = (duration) => {
      let seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
  
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
  
    return hours + ":" + minutes + ":" + seconds;
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingSpinner />
    } else if (this.state.isError){
      return <Route component={NotFound} />
    } else {
        const { id } = this.props.match.params;
        const { playerList, pot, duration } = this.state;
        return (
          <div className="container">
            <Header title="Game summary" />
            <h3 className="summary-total-pot">Total pot: {pot}</h3>
            <p>Duration: {this.msToTime(duration)}</p>
            <ul className="player-list">
              {playerList.map((player)=>{
                return <SummaryPlayerCard key={`id=${player._id}`} player={player} />
              })}
            </ul>
            <div className="done-link-box">
              <Link to="/home" className="end-game-btn">DONE</Link>
            </div>
            <div className="summary-buttons">
              <div className="delete-game-btn-box">
                <button onClick={this.handleDeleteGame} className="delete-game-btn" >Delete Game</button>
              </div>
              <div className="share-game-link-box">
                <Link to={`/cash-game/${id}/share`} className="share-game-link">Share game</Link>
              </div>
            </div>
            
          </div>
        );
    }
  }
}

export default CashGameSummary;