import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../lib/auth-service';
import { withAuth } from '../../providers/AuthProvider';
import FormUser from '../../components/FormUser';




class Login extends Component {

  state = {
    statusError: '',
  }
  

  handleFormSubmit = (user) => {
    auth.login(user)
    .then((responseUser) => {
      this.props.setUser(responseUser);
    })
    .catch(error => 
      this.setState({
        statusError: error,
      })
    )
  }

  render() {
    const { statusError } = this.state;
    return (
      
      <div className="container li-su-container">
        <h1 className="li-su-title">Log In</h1>
        { statusError ? <h4 className="error-msg">Error!</h4> : ''}
        <FormUser whenSomeOnePressSubmit={this.handleFormSubmit} />
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