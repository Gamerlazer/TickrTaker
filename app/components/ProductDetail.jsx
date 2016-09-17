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

    this.interval = setInterval(() => this.setState({
      timeRemaining: this.calcTime(this.state.endDate)
    }), 1000);
    this.calcTime = this.calcTime.bind(this);
  }

  componentWillUnmount () {    // Clears up DOM elements that were created in ComponentDidMount method
    clearInterval(this.interval);
  }

  calcPrice () {
    var thisItem = this.state.item;
    if (thisItem) {
      //only run calculations when item is loaded
      return calcPrice(thisItem.startPrice, thisItem.endPrice, thisItem.startDate, thisItem.endDate);
    } else {
      return 0;
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
          timeRemaining: this.calcTime(res.auctionEndDateByHighestBid)
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
      <div className="container">
        <h2>{thisItem.title}</h2>
        <div className="row">
          <div className="col-md-3 col-sm-5 product-profile-image">
            <img src={thisItem.picture} />
          </div>
          <div className={ this.props.auth() && this.state.valid ? "col-md-4 col-sm-7" : "col-md-12"}>
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
          { this.props.auth() && this.props.valid ?
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
            Description
            <p>
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

// <div className="col-md-12 auction-item-container">
//   {/*title*/}
//   <div className="form-group col-md-12 auction-title">
//     <h2>{thisItem.title}</h2>
//   </div>
//   {/*top three columns*/}
//   <div className='form-group col-md-12'>
//       {/* main auction image: */}
//     <img className="col-md-3 img-fluid" src={thisItem.picture}></img>
//     {/*three item details:*/}
//     <div className="col-md-5 auction-item-details ">
//       <hr className="auction-item-title-hr"/>
//       <div className="col-md-12">Time Remaining: {this.state.timeRemaining}</div>
//       <div className="col-md-12"> Current Price: {this.state.currentPrice}</div>
//       <div className="col-md-12"> Seller: John Doe</div>
//       {/*end item details:*/}
//     </div>
//     {/*bid form and button  */}
//     <div className="col-md-4 auction-bid-form">
//       <form id="bid-form" onSubmit={this.sendItemBid}>
//         <div className="col-md-12"><strong>Bid</strong>
//           <br></br>
//           <input className="col-md-6" id="bid" type="number" step="0.01" placeholder="Min. Price"></input>
//           <button className="col-md-6" type="button" className="btn btn-primary pull-md-right" onClick={this.sendItemBid}>Submit Bid</button>
//         </div>
//       </form>
//       {/* alert below bid button*/}
//       <div className="alert alert-danger fade in" role="alert" id="bid-error">
//         <button type="button" className="close">×</button>
//         <strong>Woah! </strong>Please place a valid bid. <small>Tip: Try value higher than the current highest bid!</small>
//       </div>
//     </div>
//   </div>
//   {/* end container */}
//   <div className="form-group col-md-12 bottom-row">
//     <div className="col-md-6 auction-description">Description: {thisItem.description}</div>
//     <div className="col-md-6 img-fluid auction-reel">
//       {/*<img src={thisItem.picture}></img>*/}
//       <img className="img-fluid auction-image" src="http://images.cb2.com/is/image/CB2/DondraBedQueenF12/$web_zoom_furn_colormap$/130830204135/dondra-bed.jpg"></img>
//     </div>
//   </div>
//   {/*end whole container:*/}
// </div>
