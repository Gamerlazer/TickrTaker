import React, {Component} from 'react';
import {Link} from 'react-router';
import MyBids from './MyBids.jsx';
import MyAuctions from './MyAuctions.jsx';

export default class MyDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>

        <div className="dashboard-header col-sm-12">
          <h2>My Bids</h2>
          <MyBids />
        </div>

        <div className="dashboard-header col-sm-12">
          <h2>My Auctions</h2>
          <MyAuctions />
        </div>

      </div>
    );
  }
}