import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  renderIsLoggedIn = () => {
    return <div>
      <p>Hi, {this.props.user.username}</p>
      <div><Link to="/profile/my-info" >Profile</Link></div>
      <div><Link to="/home">Home</Link></div>
    </div>
  }

  renderIsNotLoggedIn = () => {
    return <div>
      <Link to='/login'>Login</Link> || <Link to='/signup'>Signup</Link>
    </div>
  }

  render() {
    return (
      <div className="navbar">
        { this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn() }
      </div>
    )
  }
}

export default withAuth(Navbar);