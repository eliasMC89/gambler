import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  renderIsLoggedIn = () => {
    return (
    <div className="navbar">
      <div className="home-link">
        <Link to="/home" className="nav-link"><img src={require('./trebol-poker.png')} alt="logo" className="navbar-logo"/></Link>
      </div>
      <div className="profile-link">
        {/* <p>Hi, <Link to="/profile/my-info" ></Link></p> */}
        <Link to="/profile/my-info" className="nav-link">{this.props.user.username}</Link>
      </div>
    </div>
    )
  }

  renderIsNotLoggedIn = () => {
    return (
      <div className="landing-navbar">
        <Link to='/login' className="nav-link">Login</Link> <span className="nav-or">or</span> <Link to='/signup' className="nav-link">Signup</Link>
      </div>
    )
  }

  render() {
    return (
      <div>
        { this.props.isLogged ? this.renderIsLoggedIn() : this.renderIsNotLoggedIn() }
      </div>
    )
  }
}

export default withAuth(Navbar);