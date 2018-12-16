import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className="add-players-title">{this.props.title}</h1>
        <hr className="underline"/>
      </div>
    );
  }
}

export default Header;