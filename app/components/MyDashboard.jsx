import React, {Component} from 'react';
import {Link} from 'react-router';
import MyBids from './MyBids.jsx';
import MyAuctions from './MyAuctions.jsx';
import Listing from './Listing.jsx';

export default class MyDashboard extends Component {
  constructor(props) {
    super(props);
    // view will be buying or selling
    this.state = {
      view: this.props.params.view,
      items: []
    };
  }

  getSalesItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/selleritems/' + this.,
      success: function(items) {
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
        context.setState({items: items})
      }
    })
  }

  componentWillMount() {
    var unauthorizedView = (
      !this.props.auth() ||
      this.props.params.view!=='sales' ||
      this.props.params.view!=='bids'
    );

    if (unauthorizedView) {
      this.setState({view: 'unauthorized'})
    } else if (this.state.view === 'sales') {
      this.getSalesItems()
    } else if (this.state.view === 'bids') {
      this.getBidItems()
    }
  }

  render() {
    if (this.state.view = 'unauthorized') {
      return (
        <div>
          Sorry, page was not found!
        </div>
      );
    }
    if (this.state.view = 'sales') {
      return (
        <div>
          <>
          This is the sales page
        </div>
      )
    }
    if (this.state.view = 'bids') {
      return (
        <div>
          This is the bids page
        </div>
      )
    }
  }
}