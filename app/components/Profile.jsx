import React, {Component} from 'react';

export default class Profile extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: 'loading..',
      rating: 'loading..',
      description: 'loading..'
    }
  }

  componentWillMount(){
    this.getProfileInfo();
  }

  getProfileInfo(){
    $.ajax({

    })
  }

  render(){
    return (
    <div class="row">
      <div class="col-md-5 profile-left">
        <img width="100%" src="" alt=""></img>
        <div>{}</div>
        <div>Rating...</div>
        <div>About me...</div>
      </div>
      <div class="col-md-7 profile-right">
        <h2>Seller / Buyer History</h2>
        <div class="history-list">

        </div>
      </div>
    </div>
    )
  }


}