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
        <Link to="/home" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">Home</li></Link>
          <Link to="/profile/my-info" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">My profile</li></Link>
          <Link to="/profile/my-games" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">My games</li></Link>
          <Link to="/profile/my-shared-games" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">My pending games</li></Link>
          <Link to="/odds-calculator" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">Odds calculator</li></Link>
          <Link to="https://www.pokernews.com/poker-rules" target="_blank" onClick={this.handleClickMenu} className="menu-link"><li className="menu-option">Poker rules</li></Link>
          <Link to="/" onClick={this.props.logout} className="menu-link"><li className="menu-option">Logout</li></Link>
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