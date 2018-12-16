import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';

class FinalStack extends Component {

  state = {
    finalStack: 0,
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      finalStack: value,
    })
  }

  handleSubmitStack = (event) => {
    event.preventDefault();


    const finalStack = this.state.finalStack;
    const { id, playerId } = this.props.match.params;

    cash.updateStack(playerId, finalStack)
      .then((res)=>{
        console.log(res)
        this.props.history.push(`/cash-game/${id}/playing`);
      })
      .catch( error => console.log(error) )

  }

  render() {
    return (
      <div className="container" >
        <Header title="Final stack"/>
        <form onSubmit={this.handleSubmitStack} className="playing-form" >
          <input type="number" onChange={this.handleInputChange} className="playing-input" />
          <input type="submit" value="FinalStack" className="playing-submit-btn" />
        </form>
      </div>
    );
  }
}

export default FinalStack;