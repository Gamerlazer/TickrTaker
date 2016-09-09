import React, { Component } from 'react';

export default class Mainitems extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPrice: undefined
    };
  }

  // componentWillMount() {
    
  // }

  componentDidMount() {
<<<<<<< e5a120c0e0695aa6fcc454158c38e7981196cf2f
    this.interval = setInterval(function () {
      this.calcTime();
=======
    // this.calcTime();
    // this.calcPrice();
    this.timeInterval = setInterval(function () {
      this.calcTime();
    }.bind(this), 1000);

    this.priceInterval = setInterval(function () {
>>>>>>> clearInterval for mainpage after login in componentDidUnmount
      this.calcPrice();
    }.bind(this), 1000);
  }

<<<<<<< e5a120c0e0695aa6fcc454158c38e7981196cf2f
  componentWillUnmount() {
    clearInterval(this.interval);
=======
  componentWillUnmount () {
    clearInterval(this.timeInterval);
    clearInterval(this.priceInterval);
>>>>>>> clearInterval for mainpage after login in componentDidUnmount
  }

  calcPrice () {

    var cal = ((this.props.item.startPrice - this.props.item.endPrice) /
    ((Date.parse(this.props.item.endDate) + 2.592e+9) - Date.parse(this.props.item.startDate))) * (Date.parse(this.props.item.endDate) + 2.592e+9 - Date.now());
    this.setState({
      currentPrice: '$ ' + cal.toFixed(2)
    });
  }

  calcTime () {
    var duration = Date.parse(this.props.item.endDate) + 2.592e+9 - Date.now();
    var seconds = parseInt((duration / 1000) % 60);
    var minutes = parseInt((duration / (1000 * 60)) % 60);
    var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    var days = parseInt(((duration) / (1000 * 60 * 60 * 24)) % 365);

    days = (days < 10) ? '0' + days : days;
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    var resultTime = days + ' days  ' + hours + ':' + minutes + ':' + seconds + ' hours';
    this.setState({
      timeRemaining: resultTime
    });
  }
  
  render() {
    return (
      <div>
        <div>
          <h3>{this.props.item.title || 'Sample Title'}</h3>
          <div>
            <img src={this.props.item.picture}></img>
          </div>
          <div>
            Current Price: <span>{this.state.currentPrice}</span>
          </div>
          <div>
            Time remaining: <span>{this.state.timeRemaining}</span>
          </div>
        </div>
      </div>
    );
  }
} 
