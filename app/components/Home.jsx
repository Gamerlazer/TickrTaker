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

          </div>
        </div>
      </div>
    )
  }
}

