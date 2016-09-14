import React, {Component} from 'react';
import {Link} from 'react-router';

export default class BidNow extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    var id = '/item/' + this.props.item.id;
    // need to insert value="{this.props.minbid} into input"
    return (
      <div>
        <div className="row">
          <input type="number" />
          <Link className='btn btn-primary' to={id}>
            Bid
          </Link>
        </div>
      </div>
    )
  }
}