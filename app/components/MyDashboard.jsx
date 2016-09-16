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
      view: this.props.route.type,
      activeItems: []
    };
    console.log('THIS.STATE.VIEW!', this.state.view)
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
    console.log(this.props.params.view)
    if (this.props.params.view === 'unauthorized') {
      return (
        <div>
          Sorry dude, page was not found!
        </div>
      );
    }
    if (this.props.params.view === 'sales') {
      return (
        <div>
          This is the sales page
        </div>
      )
    }
    if (this.props.params.view === 'bids') {
      return (
        <div>
          This is the bids page
        </div>
      )
    }
  }
}