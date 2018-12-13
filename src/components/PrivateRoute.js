import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

const PrivateRoute = ({ component: Component, isLogged, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return <div>
          { isLogged ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          ) }
        </div>
      }}
    />
  );
}

export default withAuth(PrivateRoute);