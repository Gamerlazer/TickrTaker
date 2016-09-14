import React, {Component} from 'react';
import Listing from './Listing.jsx';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsForSale: [],
      itemsWinningBidOn: [],
      itemsLosingBidOn: []
    };
  }

  componentDidMount() {    //   Retrieve user data form, show items seller items on dashboard page
    var context = this;
    $.ajax({
      method: 'GET',
      url: 'api/user_data',
      success: function(user) {
        console.log(user);
        $.ajax({
          method: 'POST',
          url: 'api/selleritems',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(user),
          success: function(items) {
            //console.log('items are', items);
            context.setState({'itemsForSale': items});
          },
          error: function(err) {
            console.log(err);
          }
        });

        $.ajax({          // Retrieve data to show user's winnig and losingg bid on dashboard page
          method: 'POST',
          url: 'api/bids',
          headers: {'Content-Type': 'application/json'},
          data: JSON.stringify(user),
          success: function(items) {
            var winningBids = [];
            var losingBids = [];
            items.forEach(function(item) {
              if (item.myBid.price === item.highestBid) {
                winningBids.push(item);
              } else {
                losingBids.push(item);
              }
            });
            //console.log('bids are', winningBids, losingBids);
            context.setState({
              'itemsWinningBidOn': winningBids,
              'itemsLosingBidOn': losingBids
            });
            context.render();
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="dashboard-header col-xs-12"> <h2>Winning Bids </h2> </div>
        <div className="col-xs-12 bid-container">
          {this.state.itemsWinningBidOn.map((winningBid, index) => {
            {console.log(winningBid)}
            return (<Listing key={index} parity={index % 2} status='winning' item={winningBid} />);
          })}
        </div>
        <div className = "dashboard-header col-xs-12"> <h2> Losing Bids </h2> </div>
        <div className="col-xs-12 bid-container" >
          {
            this.state.itemsLosingBidOn.map((losingBid, index) => {
              return (<Listing key={index} parity={index % 2} status='losing' item={losingBid} />);
            })
          }
        </div>
        <div className="dashboard-header col-xs-12"> <h2> Items on Auction </h2> </div>
        <div className="col-xs-12 bid-container">
        {this.state.itemsForSale.map((saleItem, index) => {
          return (<Listing old={true} key={index} parity={index % 2} status='forsale' item={saleItem} />);
        }) }
        </div>
      </div>
    );
  }
}