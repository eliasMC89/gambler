import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../lib/auth-service';
import { withAuth } from '../../providers/AuthProvider';

class Signup extends Component {

  state = {
    username: '',
    password: '',
    statusError: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    auth.signup({ username, password })
      .then( (user) => {
        this.setState({
            username: '',
            password: '',
        });
        this.props.setUser(user)
      })
      .catch( error => {
        this.setState({
          statusError: error.response.data.error,
        })
      } )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { username, password, statusError } = this.state;
    return (
      <div className="container li-su-container">
        <h1 className="li-su-title">Sign Up</h1>
        { statusError ? <h4 className="error-msg">{statusError}</h4> : ''}
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
            <input type="submit" value="SignUp" className="li-su-btn"/>
          </div>
          
        </form>
        <div className="to-su-li">
          <div>
            <p>Already have an account?</p>
          </div>
          <div className="li-su-link-container">
            <Link to={"/login"} className="li-su-link">Log In</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuth(Signup);