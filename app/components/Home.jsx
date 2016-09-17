import React, {Component} from 'react';
import {Link} from 'react-router';
import Listing from './Listing.jsx';
import PostItem from './PostItem.jsx';
import Filters from './Filters.jsx'

export default class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrys: []
    };
    this.updateEntrys = this.updateEntrys.bind(this);
    this.grabAuctions = this.grabAuctions.bind(this);
  }

  componentDidMount () {   //  Have list of auctions before rendering the page
    this.grabAuctions();
  }

  updateEntrys (entryArray) {    //  Show filtered results
    this.setState({
      entrys: entryArray
    });
  }

  grabAuctions () {
  // Ajax request for auction searching by using search-bar
    var context = this;
    var filter = '';

    if ($('#search').val() !== '') {
      filter = $('#search').val();
    }
    $.ajax({
      method: 'GET',
      data: {
        search: filter
      },
      url: '/api/allitems',
      headers: {'Content-Type': 'application/json'},
      success: function (res) {
        //console.log(res);
        context.updateEntrys(res);
      }
    });
  }

  render () {
    var postItemUrl = '/postitem'
    return (
      <div className="home container">
        <h1>tickr</h1>
        <div className="row">
          <div className="col-sm-4">
            <Link className='btn btn-primary' to={postItemUrl}>
              Post Item
            </Link>
          </div>
          <div className="col-sm-8">
            <form className="search-form" onSubmit={this.grabAuctions.bind(this)}>
              <input id="search" />
              <div className="search-text">Search:</div>
            </form>
          </div>
        </div>
        <div className="auction-listings">
        {
          this.state.entrys.map((entry, i) =>(
          <Listing
          key={i}
          item={entry}
          auth={this.props.auth}
          bidNowActive =  {true} />
          ))
        }
        </div>
      </div>
    )
  }
}

