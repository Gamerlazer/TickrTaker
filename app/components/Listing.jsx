import React, {Component} from 'react';
import BidNow from './BidNow.jsx'

// This should be redundant
import {calcPrice, calcTime} from '../helpers.js';

export default class Listing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPrice: undefined,
      status: props.status,
      currentBid: ''
    };
    this.calcPrice = this.calcPrice.bind(this);
  }

  componentWillMount() {    // Set state properties with updated values
    this.getItemBids();
    this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaining: this.calcTime(),
    });
  }

  componentDidMount () {    //  Set state properties with calculated values
    $('img').on('error', function(){ //  Replace broken image links with the sample image
        $(this).attr('src', 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473715896/item_photos/zfaehmp20xculww4krs6.jpg');
    });

    this.interval = setInterval(() => this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaining: this.calcTime()
    }), 1000);
    this.calcPrice = this.calcPrice.bind(this);
    this.calcTime = this.calcTime.bind(this);

  }
  componentWillUnmount () {    // Clears up DOM elements that were created in ComponentDidMount method
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }

  calcPrice () {     // Price calculation check helper.js
    var thisItem = this.props.item;
    return calcPrice(thisItem.startPrice, thisItem.endPrice, thisItem.startDate, thisItem.endDate);
  }

  calcTime () {      //  Time calculation check helper.js
    return calcTime(this.props.item.auctionEndDateByHighestBid);
  }

  getItem() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/singleitem/' + context.props.item.id,
      headers: {'Content-Type': 'application/json'},
      success: function(res) {
        context.setState({item: res});
      }
    })
  }

  getItemBids () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/items/bids/' + context.props.item.id,
      headers: {'Content-Type': 'application/json'},
      success: function (res) {
        var sorted = res.bids.sort(function (a, b) {
          return a.price < b.price;
        });
        context.setState({
          bids: sorted,
          currentBid: sorted[0] ? sorted[0].price : res.endPrice
        });
      }
    })
  }

  render () {
    // var button;

    var id = '/item/' + this.props.item.id;
    return (
      <div className="row">
        <div className="col-sm-3">
          <img className="listing-image" src={this.props.item.picture}></img>
        </div>
        <div className="col-sm-9">
          <h3>{this.props.item.title || 'Sample Title'}</h3>
          <div className="row">
            <div className="col-md-7">
              <div>
                Current highest bid:
                <span className="current-price">
                  {' $' + this.state.currentBid}
                </span>
              </div>
              <div>
                Time remaining:
                <span className="time-remaining">
                  {this.state.timeRemaining}
                </span>
              </div>
              { this.state.status !== 'forsale' ?
              <div>
                Seller:
                <span> {this.state.seller || 'Seller'} </span>
              </div> : <div></div> }
            </div>
            <div className="col-md-5">
              { this.props.auth() ?
                <BidNow
                getItem={this.getItem.bind(this)}
                getItemBids={this.getItemBids.bind(this)}
                currentBid={this.state.currentBid}
                item={this.props.item} />
                : <div></div> }
            </div>
          </div>
        </div>
      </div>
    )
  }
}