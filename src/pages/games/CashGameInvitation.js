import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import cash from '../../lib/cashGame-service';
import NotFound from '../main/NotFound';

class CashGameInvitation extends Component {

  state = {
    isError: false,
  }

  handleClickAccept = () => {
    const gameId = this.props.match.params.id;
    cash.acceptSharedGame (gameId)
      .then(()=>{
        this.props.history.push(`/cash-game/${gameId}/summary`)
      })
      .catch(error => {
        this.setState({
          isError: true,
        })
      })
  }

  handleClickReject = () => {
    const gameId = this.props.match.params.id;
    cash.rejectSharedGame (gameId)
      .then(()=>{
        this.props.history.push(`/profile/my-shared-games`)
      })
      .catch(error => {
        this.setState({
          isError: true,
        })
      })
  }

  render() {
    if (this.state.isError){
      return <Route component={NotFound} />
    }else {
      return (
        <div className="container">
          <h1 className="invitation-title">A game has been shared with you:</h1>
          <div className="invitation-btn-box">
            <button onClick={this.handleClickAccept} className="invitation-btn accept-btn">ACCEPT</button>
            <button onClick={this.handleClickReject} className="invitation-btn reject-btn">REJECT</button>
          </div>
        </div>
      );
    }
  }
}

export default CashGameInvitation;