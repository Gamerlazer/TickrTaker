import React, {Component} from 'react';
import UserRating from './UserRating.jsx';
import Listing from './Listing.jsx';

export default class Profile extends Component {
  constructor (props) {
    super (props);

    this.state = {
      notfound: false,
      name: 'loading..',
      rating: 'loading..',
      aboutMe: 'loading..',
      starRating: null,
      activeItems: [],
      oldItems: [],
      currentUserId: null
    }
  }

  componentWillMount() {
    this.getProfileInfo();
    this.getActiveItems();
    this.getOldItems();
    this.getCurrentUser();
  }

  getCurrentUser () {
    var context = this;
    $.ajax({
      method: 'GET',
      url: '/api/user_data',
      success: function (user) {
        context.setState({
          currentUserId: user.id
        })
        console.log(context.currentUserId, 'Current User ID', user)
      } 
    })
  }

  getProfileInfo() {
    var context = this;
    $.ajax({
      url: '/api/profile/' + this.props.params.id,
      method: 'GET',
      success: function(response) {
        if (response.notfound) {
          context.setState({notFound: true});
        }
        console.log('response',response.user)

        var name = response.user.firstName + ' ' + response.user.lastName;
        var id = response.user.id;
        var rating = response.user.rating;
        var aboutMe = response.user.aboutMe;
        var numberOfRatings = response.user.numberOfRatings;
        var sumOfRatings = response.user.sumOfRatings;
        var starRating = numberOfRatings === 0 ? null : sumOfRatings / numberOfRatings;

        context.setState({
          id: id,
          name: name,
          rating: rating,
          aboutMe: aboutMe,
          picture: response.user.photo,
          starRating: starRating
        })
      }
    })
  }

  getActiveItems () {
    var context = this;
    $.ajax({
      url: '/api/selleritems/' + this.props.params.id,
      method: 'GET',
      success: function(response) {
        console.log(response, 'THIS is my response')
        context.setState({
          activeItems: response
        });
      }
    })
  }

  getOldItems () {
    var context = this;
    $.ajax({
      url: '/api/oldselleritems/' + this.props.params.id,
      method: 'GET',
      success: function(response){
        console.log(response, 'ALL OLD ')
        context.setState({
          oldItems: response
        });
      }
    })
  }

  render(){

    var starRating = this.state.starRating;
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
          {this.state.starRating ? (<UserRating editable={'false'} starRating={ starRating }/>) : 'Unrated'}
        </div>


        <p className="user-description">
          { this.state.aboutMe ? this.state.aboutMe : 'User hasn\'t filled out description yet.'}
        </p>
      </div>
      <div className="col-md-8 profile-right">
        <h2>Seller / Buyer History</h2>
        <div className="history-list auction-listings">
         <h4>Active Items</h4>
          { this.state.activeItems.map((item, i) => ( 
            <Listing 
              key={i}
              item={item}
              auth={this.props.auth}
              refreshPage = {this.getActiveItems}
              bidNowActive = {false}
              activeBid={true}/>
            ))}
        </div>
        <div className="history-list auction-listings">
         <h4>Past Items</h4>
          { this.state.oldItems.map((item, i) => ( 
            <Listing 
              key={i}
              item={item}
              auth={this.props.auth}
              refreshPage = {this.getActiveItems}
              bidNowActive = {false}
              activeBid={false}/>
            ))}
        </div>

      </div>
    </div>
    )
  }
}


//           {this.state.activeItems.map((item) => (<div>{item.title}</div>))}
//           {this.state.activeItems.map((item) => (<div>{item.title}</div>))}
// .map((item) => (<div>hi</div>))

// {
//   this.state.activeItems.map((entry, i) =>(<div>entry.title</div>))
// }

// <Listing
// key={i}
// item={entry}
// auth={this.props.auth}
// refreshPage = {this.props.grabAuctions}
// />))