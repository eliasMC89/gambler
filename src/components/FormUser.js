import React, { Component } from 'react';

class FormUser extends Component {

  state = {
    username: "",
    password: "",
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.whenSomeOnePressSubmit({ username, password});
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render () {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="username-container">
          <div>
            <label>Username:</label>
          </div>
          <div className="li-su-input-container">
            <input type="text" name="username" value={username} onChange={this.handleChange} className="li-su-input"/>
          </div>
        </div>
        <div className="password-container">
          <div>
            <label>Password:</label>
          </div>
          <div className="li-su-input-container">
            <input type="password" name="password" value={password} onChange={this.handleChange} className="li-su-input"/>
          </div>
        </div>
        <div className="li-su-btn-container">
          <input type="submit" value="Login" className="li-su-btn"/>
        </div>
        
      </form>
    )
  }
}
export default FormUser;