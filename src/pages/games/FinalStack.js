import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';
import CancelButton from '../../components/CancelButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotFound from '../main/NotFound';

class FinalStack extends Component {

  state = {
    finalStack: 0,
    remainingPot: 0,
    notEnoughPotError: false,
    isLoading: true,
    serverError: false,
  }

  componentDidMount () {
    const { id } = this.props.match.params;
    cash.getDetail(id)
      .then((cashGame)=>{
        this.setState({
          remainingPot: cashGame.remainingPot,
          isLoading: false,
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          serverError: true,
        })
      })
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      finalStack: value,
    })
  }

  checkRemainingPot = () => {
    const { finalStack, remainingPot } = this.state;
    return (finalStack <= remainingPot);
  }

  handleSubmitStack = (event) => {
    event.preventDefault();
    const { finalStack } = this.state;
    const { id, playerId } = this.props.match.params;

    if (this.checkRemainingPot()){
      cash.updateStack(id, playerId, finalStack)
        .then((res)=>{
          this.props.history.push(`/cash-game/${id}/playing`);
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            serverError: true,
          })
        })
    } else {
      this.setState({
        notEnoughPotError: true,
      })
    }

  }

  render() {
    if (this.state.serverError) {
      return <NotFound />
    } else if (this.state.isLoading) {
        return <LoadingSpinner />
    } else {
      const { notEnoughPotError } = this.state;
      return (
        <div className="container" >
          <Header title="Final stack"/>
          <form onSubmit={this.handleSubmitStack} className="playing-form" >
            <input type="number" onChange={this.handleInputChange} className="playing-input" placeholder="0"/>
            <input type="submit" value="FinalStack" className="playing-submit-btn" />
          </form>
          { notEnoughPotError ? <h4 className="error-msg">Final stack incorrect!</h4> : ''}
          <div className="cancel-btn-box">
            <CancelButton pageHistory={this.props.history} />
          </div>
        </div>
      );
    }
  }
}

export default FinalStack;