import React, { Component } from 'react';
import cash from '../../lib/cashGame-service';

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
    console.log(this.state)
    return (
      <div>
        <h1>Final Stack for player</h1>
        <form onSubmit={this.handleSubmitStack} >
          <input type="number" onChange={this.handleInputChange} />
          <input type="submit" value="FinalStack"/>
        </form>
      </div>
    );
  }
}

export default FinalStack;