import React, {Component} from 'react';
import ReactStars from 'react-stars'

export default class UserRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Setting testing as 4
      rating: 4,
      editable: true
    }
  }

  updateRating (newRating) {
    console.log('this happens ')
    this.setState({
      rating: newRating
    });
  }

  ratingChanged (newRating) {
    console.log(newRating)
  }

  handleRatingClick (e, data) {
    console.log(e, 'This is e');
    console.log(data, 'This is data')
    alert('You left a ' + data.rating + ' star rating for ' + data.caption);
  }

  render () {
    return (
      <div>
        <div className="star-rating"></div>
        <div>My current rating: {this.state.rating} </div>
        <ReactStars count={5} onChange={this.ratingChanged} size={24} color2={'#ffd700'} />
      </div>
    )
  }
}


