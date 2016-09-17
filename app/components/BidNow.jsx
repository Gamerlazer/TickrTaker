import React, {Component} from 'react';
import {Link} from 'react-router';

export default class BidNow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      input: null
    }
  }

  postBid (user) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/api/items/bids/' + context.props.item.id,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({
        user: user,
        bid: context.state.input
      }),
      success: function (res) {
        context.props.getItem();
        context.props.getBids();
      }
    })
  }

  sendItemBid(e) {     // Ajax request to bid on an item
    e.preventDefault();
    console.log(e.target)
    if (this.props.currentBid === undefined || this.state.input >= this.props.currentBid + 1) {
      var context = this;
      $.ajax({
        method: 'GET',
        url: '/api/user_data',
        success: function(user) {
          context.refs.input.value = '';
          context.postBid(user);
        }
      });
    } else {
      $('#bid-error').show();
    }
  }

  changeInput(e) {
    this.setState({input: e.target.value})
  }

  render () {
    // need to insert value="{this.props.minbid} into input"
    return (
      <div className="row">
        <form id="bid-form" onSubmit={this.sendItemBid.bind(this)}>
          <input type="number" id="bid" ref="input"
          onChange={this.changeInput.bind(this)}/>
          <button type="submit" className="btn btn-sm btn-primary">
            Bid Now
          </button>
        </form>
      </div>
    )
  }
}