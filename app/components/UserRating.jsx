import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ReactStars from 'react-stars'


export default class UserRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Setting testing as 4
      rating: 4
    }
  }
  render () {
    return (
      <div>
        <div className="star-rating"></div>
        <div>{this.state.rating}</div>
        <StarRatingComponent 
            name="rate1" 
            starCount={5}
            // editing={false}
            // renderStarIcon={() => <span></span>}
            value={5}
        />
        <ReactStars
          count={5}
          // onChange={ratingChanged},
          size={24}
          color2={'#ffd700'} />
      </div>
    )
  }
}
// <StarRatingComponent 
//     name="rate1" 
//     starCount={10}
//     value={rating}
//     onStarClick={this.onStarClick.bind(this)}
// />