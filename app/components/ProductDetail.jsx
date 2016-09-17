import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {calcTime} from '../helpers.js';
import BidNow from './BidNow.jsx'

export default class AuctionItem extends Component {
  constructor (props) {
    super (props);

    this.state = {
      item: undefined,
      currentBid: undefined,
      endDate:'',
      valid: true,
      bids: [],
      timeRemaining: 'calculating'
    };
  }

  componentWillMount () {      // Set state properties with updated values that were calculated with calcTime and calcPrice
    this.getItem();
    this.getBids();
    this.setState({
      currentPrice: this.calcPrice().toFixed(2)
    });
  }

  componentDidMount () {       //  Set state properties with calculated values

    $('img').on('error', function(){ //  Replace broken image links with the sample image
        $(this).attr('src', 'http://res.cloudinary.com/dijpyi6ze/image/upload/v1473715896/item_photos/zfaehmp20xculww4krs6.jpg');
    });

    this.interval = setInterval(() => {
      this.checkActive();
      this.setState({
        timeRemaining: this.calcTime(this.state.endDate)
      });
    }, 1000)
  }

  componentWillUnmount () {    // Clears up DOM elements that were created in ComponentDidMount method
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }

  checkActive () {
    // console.log('this timmer is working', this.state.timeRemaining, this.state.id);
    var context = this;
    if ( new Date() > new Date(this.state.endDate) && this.state.valid) {

      console.log('Setting' + this.state.item.title + 'to not valid', context.props.params.id)
      $.ajax({
        method: 'PUT',
        url: '/api/expiredItem/' + context.props.params.id,
        success: (response) => {
          context.setState({
            valid: response.valid
          })
          console.log('is this valid?', context.state.valid)
        }
      })
    }
  }

  calcTime (endDate) {
    return calcTime(endDate);
  }

  getItem() {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/singleitem/' + context.props.params.id,
      headers: {'Content-Type': 'application/json'},
      success: function(res) {
        context.setState({
          endDate: res.auctionEndDateByHighestBid,
          valid: res.valid,
          timeRemaining: context.calcTime(res.auctionEndDateByHighestBid),
          item: res
        });
      }
    })
  }

  getBids () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/items/bids/' + context.props.params.id,
      headers: {'Content-Type': 'application/json'},
      success: function (res) {
        var sorted = res.bids.sort(function (a, b) {
          return a.price < b.price;
        });
        context.setState({
          bids: sorted,
          currentBid: sorted[0] ? sorted[0].price : res.endPrice,
        });
      }
    })
  }

  sendItemBid(e) {     // Ajax request to bid on an item
    e.preventDefault();
    if (this.state.bids[0] === undefined || $('#bid').val() >= this.state.bids[0].price + 1 && $('#bid').val() !== '') {
      var context = this;
      $.ajax({
        method: 'GET',
        url: '/api/user_data',
        success: function(user) {
          $.ajax({
            method: 'POST',
            url: '/api/items/bids/' + context.props.params.id,
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({user: user,
              bid: $('#bid').val()}),
            success: function (res) {
              $('#bid').val('');
              console.log(res);
              context.getItem();
              context.getBids();
            }
          });
        }
      });
    } else {
      $('#bid-error').show();
    }
  }

  render () {
    var thisItem = this.state.item || {};

    var startDate = new Date(Date.parse(thisItem.startDate));

    var startDateFormatted = startDate.getMonth() + '/' + startDate.getDate() + '/' + startDate.getFullYear() + '  ' + startDate.getHours() % 12 + ':' + ((startDate.getMinutes() < 10) ? '0' + startDate.getMinutes() : startDate.getMinutes()) + (startDate.getHours() > 12 ? ' PM' : ' AM');

    var endDate = new Date(Date.parse(thisItem.auctionEndDateByHighestBid));

    var endDateFormatted = endDate.getMonth() + '/' + endDate.getDate() + '/' + endDate.getFullYear() + '  ' + endDate.getHours() % 12 + ':' + ((endDate.getMinutes() < 10) ? '0' + endDate.getMinutes() : endDate.getMinutes()) + (endDate.getHours() >= 12 ? ' PM' : ' AM');

    $('.alert .close').on('click', function(e) {
      $(this).parent().hide();
    });

    return (
      <div className="product-detail container">
        <h2 className="item-title">{thisItem.title}</h2>
        <div className="row">
          <div className="col-md-3 col-sm-5 product-profile-image">
            <img src={thisItem.picture} />
          </div>
          <div className={ this.props.auth() && this.state.valid ? "col-md-4 col-sm-7 item-info" : "col-md-12 item-info"}>
          {this.state.valid ?
            <div>
              Current highest bid:
              <span className="current-price">
                {' $' + this.state.currentBid}
              </span>
            </div>
            :
            <div>
              Price sold:
              <span className="current-price">
                {' $' + this.state.currentBid}
              </span>
            </div>
          }
          { this.state.valid ?
            <div>
              Time remaining:
              <span className="time-remaining">
                {' ' + this.state.timeRemaining}
              </span>
            </div>
            : <span>Auction ended</span>
          }
          </div>
          <div className="col-md-5">
          { this.props.auth() && this.state.valid ?
            <div className="col-md-5">
              <BidNow
              getItem={this.getItem.bind(this)}
              getBids={this.getBids.bind(this)}
              currentBid={this.state.currentBid}
              item={this.state.item} />
            </div>
              : <div></div> }
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            Item Description
            <p className="card">
              {thisItem.description}
            </p>
          </div>
          <div className="col-md-6">
            Photos
          </div>
        </div>
      </div>

    );
  }
}
