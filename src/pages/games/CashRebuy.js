import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';


// edit player in cash-game: add rebuy
class CashRebuy extends Component {
  state = {
    rebuy: 0,
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      rebuy: value,
    })
  }

  handleSubmitRebuy = (event) => {
    event.preventDefault();

    const finalStack = this.state.rebuy;
    const { id, playerId } = this.props.match.params;

    cash.updateRebuy(id, playerId, finalStack)
      .then(()=>{
        this.props.history.push(`/cash-game/${id}/playing`);
      })
      .catch( error => console.log(error) )

  }

  render() {
    return (
      <div className="container" >
        <Header title="Rebuy:" />
        <form onSubmit={this.handleSubmitRebuy} className="playing-form">
          {/* <label></label> */}
          <input type="number" onChange={this.handleInputChange} className="playing-input"/>
          <input type="submit" value="Rebuy" className="playing-submit-btn"/>
        </form>
      </div>
    );
  }
}

export default CashRebuy;