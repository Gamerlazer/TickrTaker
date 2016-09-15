import React, {Component} from 'react';
import Listing from './Listing.jsx';

export default class MyAuctions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsForSale: []
    };
  }

  componentDidMount() { // Retrieve user data form, show items seller items on dashboard page
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
          context.render();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="dashboard-header col-sm-12"> <h2> Items on Auction </h2> </div>
        <div className="col-sm-12 bid-container">
        {this.state.itemsForSale.map((saleItem, index) => {
          return (<Listing old={true} key={index} parity={index % 2} status='forsale' item={saleItem} />);
        }) }
        </div>
      </div>
    );
  }
}