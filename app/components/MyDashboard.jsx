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
        console.log('getting sales items', items);
        var activeItems = items.filter(function(e) {
          return e.valid === true;
        })
        var newExpiredItems = items.filter(function(e) {
          return e.valid === false;
        })

        var copy = context.state.expiredItems.slice();

        var removeItem = function (index, array) {
          var currentItem = array[index];
          array[index] = array[array.length-1];
          array[array.length-1] = currentItem;
          array.pop();
        }

        var changed = false;

        newExpiredItems.forEach(function(item){
          if (changed) { return; }
          for (var i = 0; i < copy.length; i++) {
            if (item.title === copy[i].title) {
              return removeItem(i, copy);
            }
          }
          console.log('setting sales state.')
          context.setState({
            expiredItems: newExpiredItems,
            activeItems: activeItems
          })
          this.render();
          changed = true;
        });
      }
    })
  }

  getBidItems () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/bids',
      success: function(bids) {
        console.log('getting bid items', bids)
        var activeItems = bids.filter(function(bid) {
          return bid.item.valid === true;
        })
        var newExpiredItems = bids.filter(function(bid) {
          return bid.item.valid === false;
        })
        var copy = context.state.expiredItems.slice();

        var removeItem = function (index, array) {
          var currentItem = array[index];
          array[index] = array[array.length-1];
          array[array.length-1] = currentItem;
          array.pop();
        }

        var changed = false;

        newExpiredItems.forEach(function(item){
          if (changed) {
            return;
          }
          for (var i = 0; i < copy.length; i++) {
            if (item.item.title === copy[i].item.title) {
              return removeItem(i, copy);
            }
          }
          console.log('setting bid state.')
          context.setState({
            expiredItems: newExpiredItems,
            activeItems: activeItems
          })
          this.render();
          changed = true;
        });
      }
    })
  }

  // <UserRating editable={'undefined'} starRating={ starRating }/>

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
      console.log('rendering sales page.')
      this.getSalesItems();
      view = (
        <div className="dashboard container-fluid">
          <h1>My Sales</h1>
          <div className="auction-listings col-md-8">
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
                rerender={this.getSalesItems.bind(this)}
                />
              ))
            }
          </div>
          <div className="auction-listings col-md-4">
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
      console.log('rendering bid page.')
      this.getBidItems();
      view = (
        <div className="dashboard container-fluid">
          <h1>My Bids</h1>
          <div className="auction-listings col-md-8">
            <h4>Active Bids</h4>
            {
              this.state.activeItems.map((item, i)=>(
                <Listing
                key={i}
                auth={this.props.auth}
                item={item.item}
                bidNowActive={true}
                activeBid={true}
                rerender={this.getBidItems.bind(this)}
                />
              ))
            }
          </div>
          <div className="auction-listings col-md-4">
            <h4>Expired Bids</h4>
            {
              this.state.expiredItems.map((item, i)=>(
                <Listing
                key={i}
                auth={this.props.auth}
                item={item.item}
                bidNowActive={false}
                activeBid={false}
                />
              ))
            }
          </div>
        </div>
      )
    }
    return view;
  }
}