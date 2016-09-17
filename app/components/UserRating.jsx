import React, {Component} from 'react';
import Stars from 'react-stars'

export default class UserRating extends Component {
  constructor(props) {
    super(props);
    
    // editable = undefined === editable
    // editable = false === Not editable

    this.state = {
      userId: this.props.userId,
      rating: this.props.starRating,
      numberOfRatings: this.props.numberOfRatings,
      sumOfRatings: this.props.sumOfRatings,
      editable: this.props.editable
    }

    console.log('UserRating editable state', this.props.editable)
    console.log('User rating id', this.state.userId)

    this.starSettings = {
      size: 40,
      count: 5,
      value: this.state.rating,
      edit: this.state.editable,  
      onChange: newValue => {
        this.starSettings.value = newValue;
        this.submitRating(newValue);
        // this.setState({ rating: parseFloat(newValue) })
      }
    }
  }

  submitRating (newValue) {
    var context = this;
    $.ajax({
      method: 'POST',
      url: '/api/profile/rateUser/' + this.state.userId,
      data: JSON.stringify({ 
        rating : newValue
      }),
      success: function(response) {
        console.log(response, 'my response from rateUser')
        // context.setState({
        //   rating: parseFloat(newValue)
        // })
      }
    })
  }

  render () {
    return (
      <div className="star-rating">
        <div className="stars">
          <Stars {...this.starSettings} />
        </div>
        <div>Current rating: {this.state.rating} </div>
      </div>
    )
  }
}



