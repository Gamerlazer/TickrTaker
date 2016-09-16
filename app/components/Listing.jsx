import React, {Component} from 'react';
import {Link} from 'react-router';
import BidNow from './BidNow.jsx'

// This should be redundant
import {calcTime} from '../helpers.js';

export default class Listing extends Component {
  constructor (props) {
    super(props);

    this.state = {
      status: props.status,
      currentBid: '',
      endDate: '',
      valid: true,
      activeBid: this.props.activeBid !== undefined ? this.props.activeBid : true,
      id: this.props.item.id
    };
  }

  getBid
  }
}