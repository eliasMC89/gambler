import React, {Component} from 'react';
import auth from '../lib/auth-service';

const AuthContext = React.createContext();

export const { Provider, Consumer } = AuthContext;

export const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {(authStore) => {
            return <Comp
              isLogged={authStore.isLogged}
              user={authStore.user}
              logout={authStore.logout}
              setUser={authStore.setUser}
              {...this.props} />
          }}
        </Consumer>
      )
    }
  }
}


class AuthProvider extends Component {
  state = {
    user: null,
    isLogged: false,
    isLoading: true
  }

  componentDidMount() {
    auth.me()
      .then((user) => {
        this.setState({
          user,
          isLogged: true,
          isLoading: false,
        })
      })
      .catch((error) => {
        this.setState({
          user: null,
          isLogged: false,
          isLoading: false,
        })
      })
  }

  handleSetUser = (user) => {
    this.setState({
      user,
      isLogged: true
    })
  }

  logoutUser = () =>{
    auth.logout()
      .then(() => {
        this.setState({ 
          isLogged: false,
          user: null,
        });
      })
      .catch( error => console.log(error))
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading....</div>
    }
    return <div>
      <Provider value={{
        user: this.state.user,
        isLogged: this.state.isLogged,
        setUser: this.handleSetUser,
        logout: this.logoutUser,
      }}>
        {this.props.children}
      </Provider>
    </div>
  }

}

export default AuthProvider;