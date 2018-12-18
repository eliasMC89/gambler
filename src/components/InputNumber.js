import React, { Component } from 'react';

class InputNumber extends Component {

  state = {
    numValue: 0,
  }

  handleChange = (event) => {  
    const { value } = event.target;
    const numValue = Number(value);
    this.setState({
      numValue,
    });
  }

  handleSubmitValue = (event) => {
    event.preventDefault();
    this.props.submitNumber(this.state.numValue);
  }

  render() {
    const { numValue } = this.state;
    return (
      <div className="add-buyin-box">
        <form onSubmit={this.handleSubmitValue} >
          <input type="number" name="number" value={numValue} onChange={this.handleChange} className="add-buyin-input" />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default InputNumber;