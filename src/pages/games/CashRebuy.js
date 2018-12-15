import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';



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
    console.log(this.state)
    return (
      <div>
        <h1>Final Stack for player</h1>
        <form onSubmit={this.handleSubmitRebuy} >
          <input type="number" onChange={this.handleInputChange} />
          <input type="submit" value="Rebuy"/>
        </form>
      </div>
    );
  }
}

export default CashRebuy;