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
          description: description
        })
      }
    })
  }

  render(){
    if (this.state.notfound) {
      return (<div>User not found!</div>)
    }
    return (
    <div className="row">
      <div className="col-md-5 profile-left">
        <img width="100%" height="50px" src="" alt=""></img>
        <div>{ this.state.name }</div>
        <div>
          { this.state.rating ? this.state.rating : 'Unrated' }
        </div>
        <div>
          { this.state.description ? this.state.description : 'User hasn\'t filled out description yet.'}
        </div>
      </div>
      <div className="col-md-7 profile-right">
        <h2>Seller / Buyer History</h2>
        <div className="history-list">
          History list goes here
        </div>
      </div>
    </div>
    )
  }


}