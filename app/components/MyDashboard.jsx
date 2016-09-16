import React, {Component} from 'react';
import {Link} from 'react-router';
import MyBids from './MyBids.jsx';
import MyAuctions from './MyAuctions.jsx';
import Listing from './Listing.jsx';

export default class MyDashboard extends Component {
  constructor(props) {
    super(props);
    // view will be 'sales' or 'bids'
    this.state = {
      view: this.props.params.view,
      activeItems: []
    };
  }

  getSalesItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/selleritems/',
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

  componentWillMount() {
    console.log('view!', this.state.view)
    if (this.state.view === 'sales') {
      this.getSalesItems()
    } else if (this.state.view === 'bids') {
      this.getBidItems()
    }
  }

  render() {
    console.log(this.state.view)
    if (this.state.view === 'unauthorized') {
      return (
        <div>
          Sorry dude, page was not found!
        </div>
      );
    }
    if (this.state.view === 'sales') {
      return (
        <div>
          This is the sales page
        </div>
      )
    }
    if (this.state.view === 'bids') {
      return (
        <div>
          This is the bids page
        </div>
      )
    }
  }
}