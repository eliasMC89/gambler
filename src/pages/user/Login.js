import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../lib/auth-service';
import { withAuth } from '../../providers/AuthProvider';

class Login extends Component {
  state = {
    username: "",
    password: "",
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state

    auth.login({ username, password })
    .then( (user) => {
      this.props.setUser(user);
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container li-su-container">
        <h1 className="li-su-title">Log In</h1>
        <form onSubmit={this.handleFormSubmit}>
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
        <div className="to-su-li">
          <div>
            <p>Not a member?</p>
          </div>
          <div className="li-su-link-container">
            <Link to={"/signup"} className="li-su-link">Sign Up</Link>
          </div>
        </div>
      </div>

    )
  }
}

export default withAuth(Login);