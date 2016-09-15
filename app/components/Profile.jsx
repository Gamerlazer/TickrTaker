import React, {Component} from 'react';

export default class Profile extends Component {
  constructor (props) {
    super (props);
    console.log(props);
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
      url: '/api/user_data',
      method: 'GET',
      success: function(response){
        console.log(response.user);
        response.user.name
      }
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