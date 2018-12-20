import React, { Component } from 'react';

class CancelButton extends Component {

  handleCancelButton = () => {
    this.props.pageHistory.goBack();
  }

  render() {
    return (
      <div>
        <button onClick={this.handleCancelButton} className="cancel-btn" >Cancel</button>
      </div>
    );
  }
}

export default CancelButton;