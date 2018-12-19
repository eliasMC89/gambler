import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';

class FinalStack extends Component {

  state = {
    finalStack: 0,
    remainingPot: 0,
    notEnoughPotError: false,
    isLoading: true,
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
        .catch( error => console.log(error) )
    } else {
      this.setState({
        notEnoughPotError: true,
      })
    }

  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>
    } else {
      const { notEnoughPotError } = this.state;
      return (
        <div className="container" >
          <Header title="Final stack"/>
          <form onSubmit={this.handleSubmitStack} className="playing-form" >
            <input type="number" onChange={this.handleInputChange} className="playing-input" />
            <input type="submit" value="FinalStack" className="playing-submit-btn" />
          </form>
          { notEnoughPotError ? <h4 className="error-msg">Final stack incorrect!</h4> : ''}
          
        </div>
      );
    }
  }
}

export default FinalStack;