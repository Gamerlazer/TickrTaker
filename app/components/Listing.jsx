import React, {Component} from 'react';
import {Link} from 'react-router';
import BidNow from './BidNow.jsx'

// This should be redundant
import {calcPrice, calcTime} from '../helpers.js';

export default class Listing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentPrice: undefined,
      status: props.status
    };
    this.calcPrice = this.calcPrice.bind(this);
  }

  componentWillMount() {    // Set state properties with updated values
    this.setState({
      currentPrice: '$  ' + this.calcPrice().toFixed(2),
      timeRemaining: this.calcTime()
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
                Current Price:
                <span className="current-price">
                  {this.state.currentPrice}
                </span>
              </div>
              <div>
                Time remaining:
                <span className="time-remaining">
                  {this.state.timeRemaining}
                </span>
              </div>
              <div>
                Seller:
                <span> {this.state.seller || 'Seller'} </span>
              </div>
            </div>
            <div className="col-md-5">
              { this.props.auth() ? <BidNow item={this.props.item} /> : <div></div> }
            </div>
          </div>
        </div>
      </div>
    )

  }
}