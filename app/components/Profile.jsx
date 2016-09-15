import React, {Component} from 'react';

export default class Profile extends Component {
  constructor (props) {
    super (props);
    console.log(props);
    this.state = {
      notfound: false,
      name: 'loading..',
      rating: 'loading..',
      description: 'loading..'
    }
  }

  componentWillMount(){
    this.getProfileInfo();
  }

  getProfileInfo(){
    var context = this;
    $.ajax({
      url: '/api/profile/' + this.props.params.id,
      method: 'GET',
      success: function(response){
        if (response.notfound) {
          context.setState({notFound: true});
        }
        var name = response.user.firstName + ' ' + response.user.lastName;
        var rating = response.user.rating;
        var description = response.user.description;
        context.setState({
          name: name,
          rating: rating,
          description: description,
          picture: response.user.photo
        })
      }
    })
  }

  render(){
    if (this.state.notfound) {
      return (<div>User not found!</div>)
    }
    return (
    <div className="user-profile container">
      <div className="col-md-4 profile-left">
        <div className="profile-image">
          <img src={this.state.picture} alt=""></img>
        </div>
        <h4>{ this.state.name }</h4>
        <div>
          { this.state.rating ? this.state.rating : 'Unrated' }
        </div>
        <p className="user-description">
          { this.state.description ? this.state.description : 'User hasn\'t filled out description yet.'}
        </p>
      </div>
      <div className="col-md-8 profile-right">
        <h2>Seller / Buyer History</h2>
        <div className="history-list">
          History list goes here
        </div>
      </div>
    </div>
    )
  }


}