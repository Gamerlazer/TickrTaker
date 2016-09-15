import React, {Component} from 'react';
import Stars from 'react-stars'

export default class UserRating extends Component {
  constructor(props) {
    super(props);

    // editable = undefined === editable
    // editable = false === Not editable

    this.state = {
      rating: 2.0,
      editable: undefined
    }

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

  render () {
    return (
      <div>
        <div className="star-rating"></div>
        <div>My current rating: {this.state.rating} </div>
        <Stars  {...this.starSettings} />
      </div>
    )
  }
}



