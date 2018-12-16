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
    return (
      <div className="landing-navbar">
        <Link to='/login' className="li-su-navlink">Login</Link> or <Link to='/signup' className="li-su-navlink">Signup</Link>
      </div>
    )
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