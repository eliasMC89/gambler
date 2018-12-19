import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

class Navbar extends Component {

  state = {
    isShowMenu: false,
  }

  handleClickMenu = () => {
    const { isShowMenu } = this.state;
    if (isShowMenu) {
      this.setState({
        isShowMenu: false,
      })
    } else {
      this.setState({
        isShowMenu: true,
      })
    }
  }

  notShowMenu = () => {
    return(
      <div>
        <button onClick={this.handleClickMenu} className="menu-btn"><img src={require('./menu1.png')} alt="menu" className="menu-img"/></button>
      </div>
    )
  }

  showMenu = () => {
    return (
      <div className="menu-box">
        <div className="menu-btn">
          <button onClick={this.handleClickMenu} className="hide-menu-btn">Hide</button>
        </div>
        <ul className="nav-menu">
          <li>My info</li>
          <li>Odds calculator</li>
          <li>My games</li>
        </ul>
      </div>
    )
  }

  renderIsLoggedIn = () => {
    return (
    <div className="navbar">
      <div className="home-link">
        <Link to="/home" className="nav-link"><img src={require('./trebol-poker.png')} alt="logo" className="navbar-logo"/></Link>
      </div>
      {/* <div className="profile-link">
        <Link to="/profile/my-info" className="nav-link">{this.props.user.username}</Link>
      </div> */}
      { this.state.isShowMenu ? this.showMenu() : this.notShowMenu()}
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