import React, { Component } from 'react';
import { withAuth } from '../../providers/AuthProvider';

import Header from '../../components/Header';

class MyInfo extends Component {
  render() {
    const { user } = this.props;
    
    return (
      <div className="container">  
        <Header title="My information"/>
        <ul className="my-info-container">
          <li><span className="my-info-tag">Username:</span> {user.username}</li>
        </ul>
      </div>
    );
  }
}

export default withAuth(MyInfo);