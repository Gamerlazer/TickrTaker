

        
// // import StarRating from 'react-star-rating';

// // class FormComponent extends React.Component {
// //   render() {
// //     return (
// //       <form action="/api" method="POST">
// //         <StarRating name="airbnb-rating" caption="Rate your stay!" totalStars={5} />
// //         <button type="submit" className="btn btn-submit">Submit Rating</button>
// //       </form>
// //     );
// //   }
// // }
// /*


// <ReactStars
//           count={5}
//           onChange={this.updateRating.bind(this)}
//           size={24}
//           color2={'#ffd700'} />
//       </div>

// <StarRatingComponent 
//     name="rate1" 
//     starCount={5}
//     value={5}
// />
// */
// // <StarRatingComponent 
// //     name="rate1" 
// //     starCount={10}
// //     value={rating}
// //     onStarClick={this.onStarClick.bind(this)}
// // />


        <div onClick={() => this.updateRating(5)}>{this.state.rating}</div>


                <StarRating name="handler" caption="Use onClick Handlers!" totalStars={5} onRatingClick={this.handleRatingClick.bind(this, pass, args, here)} />


        <form action="/api" method="POST">
          <StarRating name="airbnb-rating" caption="Rate your stay!" totalStars={5} />
          <button type="submit" className="btn btn-submit">Submit Rating</button>
        </form>