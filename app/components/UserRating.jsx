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
      editable: this.props.editable || undefined
    }
    console.log('User rating id', this.state.userId)

    this.starSettings = {
      size: 40,
      count: 5,
      value: this.state.rating,
      edit: this.state.editable,  
      onChange: newValue => {
        this.starSettings.value = newValue;
        this.setState({ rating: parseFloat(newValue) })
      }
    }
  }

  submitRating () {
    $.ajax({})
  }

  render () {
    return (
      <div>
        <Stars  {...this.starSettings} />
        <div>Current rating: {this.state.rating} </div>
      </div>
    )
  }
}



