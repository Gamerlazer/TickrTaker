import React, {Component} from 'react';
import Stars from 'react-stars'

export default class UserRating extends Component {
  constructor(props) {
    super(props);
    console.log(this.props, 'prop')
    // editable = undefined === editable
    // editable = false === Not editable

    this.state = {
      rating: this.props.starRating,
      editable: this.props.editable || undefined
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
        <Stars  {...this.starSettings} />
        <div>Current rating: {this.state.rating} </div>
      </div>
    )
  }
}



