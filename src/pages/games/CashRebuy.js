import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import cash from '../../lib/cashGame-service';

import Header from '../../components/Header';
import CancelButton from '../../components/CancelButton';
import NotFound from '../main/NotFound';


// edit player in cash-game: add rebuy
class CashRebuy extends Component {
  state = {
    rebuy: 0,
    isError: false,
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({
      rebuy: value,
    })
  }

  handleSubmitRebuy = (event) => {
    event.preventDefault();

    const rebuy = this.state.rebuy;
    const { id, playerId } = this.props.match.params;

    cash.updateRebuy(id, playerId, rebuy)
      .then(()=>{
        this.props.history.push(`/cash-game/${id}/playing`);
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
        <div className="container" >
          <Header title="Rebuy" />
          <form onSubmit={this.handleSubmitRebuy} className="playing-form">
            <input type="number" onChange={this.handleInputChange} className="playing-input" placeholder="0"/>
            <input type="submit" value="Rebuy" className="playing-submit-btn"/>
          </form>
          <div className="cancel-btn-box">
            <CancelButton pageHistory={this.props.history} />
          </div>
        </div>
      );
    }
  }
}

export default CashRebuy;