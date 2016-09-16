import React, {Component} from 'react';
import {Link} from 'react-router';
import MyBids from './MyBids.jsx';
import MyAuctions from './MyAuctions.jsx';
import Listing from './Listing.jsx';

export default class MyDashboard extends Component {
  constructor(props) {
    super(props);
    // view will be 'sales' or 'bids'
    console.log(this.props)
    this.state = {
      view: null,
      activeItems: []
    };
  }

  getSalesItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/mysales',
      success: function(items) {
        console.log('getting sales items')
        context.setState({items: items})
      }
    })
  }

  getBidItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/bids',
      success: function(bids) {
        console.log('getting bid items')
        context.setState({items: items})
      }
    })
  }

  render() {
    var view;
    if (this.props.params.view === 'unauthorized') {
      view = (
        <div>
          Sorry dude, page was not found!
        </div>
      );
    }
    if (this.props.params.view === 'sales') {
      this.getSalesItems();
      view = (
        <div>
          This is the sales page
        </div>
      )
    }
    if (this.props.params.view === 'bids') {
      this.getBidItems();
      view = (
        <div>
          This is the bids page
        </div>
      )
    }
    return view;
  }
}