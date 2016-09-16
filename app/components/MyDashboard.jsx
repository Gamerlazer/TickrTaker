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
      activeItems: [],
      expiredItems: []
    };

  }

  getSalesItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/mysales',
      success: function(items) {
        console.log('getting sales items')
        var activeItems = items.filter(function(e) {
          return e.valid === true;
        })
        var expiredItems = items.filter(function(e) {
          return e.valid === false;
        })
        context.setState({activeItems: activeItems, expiredItems: expiredItems})
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
          <div className="auction-listings">
            <h4>Active Sales</h4>
            {
              this.state.activeItems.map((item, i)=>(
                <Listing
                key={i}
                auth={this.props.auth}
                item={item}
                status={'forsale'}
                bidNowActive={false}
                activeBid={true}
                />
              ))
            }
          </div>
          <div className="auction-listings">
            <h4>Expired Sales</h4>
            {
              this.state.expiredItems.map((item, i)=>(
                <Listing
                key={i}
                auth={this.props.auth}
                item={item}
                status={'forsale'}
                bidNowActive={false}
                activeBid={false}
                />
              ))
            }
          </div>
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