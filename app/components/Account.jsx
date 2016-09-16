import React, { Component } from 'react';
import {Link} from 'react-router'; 
import UserRating from './UserRating.jsx';

export default class UserSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      photo: null,
      phone: null,
      starRating: null,
      editing: false,
      aboutMe: ''
    };
    this.setUser = this.setUser.bind(this);
    this.handleChangeAboutMe = this.handleChangeAboutMe.bind(this);
  }

  setUser (user) {
    let userStarRating = user.user.numberOfRatings === 0 ? 0 : user.user.sumOfRatings / user.user.numberOfRatings;
    this.setState({
      id: user.user.id,
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      email: user.user.email,
      photo: user.user.photo,
      aboutMe: user.user.aboutMe,
      starRating: userStarRating
    })
  }

  componentWillMount() {
    const context = this;
    $.ajax({             
      method: 'GET',
      url: 'api/user_data',
      success: function(user) {
        context.setUser(user);
      }
    });
  }

  editProfile () {
    this.setState({
      editing: !this.state.editing
    })
  }

  handleChangeAboutMe (event) {
    this.setState({aboutMe: event.target.value});
  }

  saveProfile () {
    this.editProfile();
    const context = this;

    $.ajax({
      method: 'POST',
      url: '/api/account/aboutMe',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify({aboutMe: context.state.aboutMe}),
      success: function(response) {
      }, error: function(error) {
        console.error('Error: ', error);
      }
    })
  }

  handleSubmit(setSomething, e) {
    e.preventDefault();
    var valid = true;
    var filter = function validateURL(textval) {     //  Verify if entered email is valid
      var emailregex = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/;
      return emailregex.test(textval);
    };

    if ($('#user-email').val() === '' && setSomething === 'email') {    
      $('.emailError').show();      
      $('.addressError').hide();
      $('.phoneError').hide();
      $('.passwordError').hide();
      valid = false;
    }

    if ($('#user-address').val() === '' && setSomething === 'address') {
      $('.addressError').show();
      $('.emailError').hide();      
      $('.phoneError').hide();
      $('.passwordError').hide();
      valid = false;
    }

    if ($('#user-phone').val() === '' && $('#user-phone').val().length <= 6 && setSomething === 'phone') {
      $('.phoneError').show();
      $('.emailError').hide();      
      $('.addressError').hide();
      $('.passwordError').hide();
      valid = false;
    }
    // If entered value is valid, set state with entered value
    if (valid === true) {
      var stateObj = {};
      $('.phoneError').hide();
      $('.emailError').hide();      
      $('.addressError').hide();
      $('.passwordError').hide();

      if (setSomething === 'passWord') {
        stateObj[setSomething] = $('#user-password').val();
      }
      if (setSomething === 'email') {
        stateObj[setSomething] = $('#user-email').val();  
      }
      if (setSomething === 'address') {
        stateObj[setSomething] = $('#user-address').val();
      }
      if (setSomething === 'phone') {
        stateObj[setSomething] = $('#user-phone').val();
      }

      this.setState({user: stateObj});

      var context = this;          
      $.ajax({                    //  Ajax request to update user info
        method: 'GET',
        url: 'api/user_data',
        success: function(userData) {
          $.ajax({
            method: 'PUT',
            url: '/users',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({userData: context.state.user}),
            success: function(newUserInformation) {
              console.log('Updated user info: ', newUserInformation);
            },
            error: function(error) {
              console.log('error');
            }
          });
        }
      });

      //  Clean up input field after submit button is clicked
      $('#user-email').val('');
      $('#user-address').val('');
      $('#user-password').val('');
    }
  }


  handleToggle(stateToChange) {    //  Shows and hides input fields
    var s = {};
    s[stateToChange] = !this.state[stateToChange];
    this.setState(s);
  }
  
  render() {  //  On click, shows input field 
    var passCheck = this.state.passWord ? <div><form onSubmit={this.handleSubmit.bind(this, 'passWord')}><input id='user-password' type='password' placeholder='Type new password' className="input-xlarge"></input>
                                            <button type='submit' className="setting-btn passwordBtn btn btn-primary btn-sm">Submit</button></form>
                                            <div className="passwordError alert alert-danger fade in" role="alert">
                                            <strong>Woah! Invalid Password </strong><small>Please enter a valid password</small></div>
                                          </div> : '';
    var mailCheck = this.state.email ? <div><form onSubmit={this.handleSubmit.bind(this, 'email')}><input id='user-email' type="email" placeholder='Type new email' className="input-xlarge"></input>
                                          <button type='submit' className="setting-btn emailBtn btn btn-primary btn-sm">Submit</button></form>
                                          <div className="emailError alert alert-danger fade in" role="alert">
                                          <strong>Woah! Invalied email </strong><small>Please enter a valid email address</small></div>
                                       </div> : '';
    var addressCheck = this.state.address ? <div><form onSubmit={this.handleSubmit.bind(this, 'address')}><input id='user-address' type='text' placeholder='Type new address' className="input-xlarge"></input>
                                              <button type='submit' className="setting-btn addressBtn btn btn-primary btn-sm">Submit</button></form>
                                              <div className="addressError alert alert-danger fade in" role="alert">
                                              <strong>Woah! Invalid address </strong><small>Please enter a valid address</small></div>
                                            </div> : '';
    var phoneCheck = this.state.phone ? <div><form onSubmit={this.handleSubmit.bind(this, 'phone')}><input id='user-phone' type='tel' placeholder='Type new phone number' className="input-xlarge"></input>
                                          <button type='submit' className="setting-btn phoneBtn btn btn-primary btn-sm">Submit</button></form>
                                          <div className="phoneError alert alert-danger fade in" role="alert">
                                          <strong>Woah! Invalid Phone number </strong><small>Please enter a valid phone number</small></div>
                                        </div> : '';

    var starRating = this.state.starRating;
    
    var aboutMe = this.state.editing ?
    /* EDITING */
      <div className="row">
          <div className="input-group input-group-lg">
            <textarea className="form-control" name="aboutMe" value={this.state.aboutMe} onChange={ this.handleChangeAboutMe }/>
          </div>
        <div className="row">
          <button type="button" className="btn btn-primary btn-sm edit" aria-label="Left Align" onClick={ () => this.saveProfile()}>
            <span>save</span>
          </button>
        </div>
      </div> : 
      /* NOT EDITING */
      <div className="row">

        <div className="row">
          <button type="button" className="btn btn-primary btn-sm edit" aria-label="Left Align" onClick={ () => this.editProfile() } >
            <span aria-hidden="true">edit about me</span>
          </button>
        </div>

        <div className="row container">
          <div className="col-md-12">
            <p className="about-me">{this.state.aboutMe}</p>
          </div>
        </div>

      </div>

    return (
      <div style = {{margin: 100}} className="container">
        <div className="col-md-4">
          <div className="row">
            <img src={this.state.photo} alt="Oops! Can't find your photo" className="img-responsive profile-image"/>
          </div>
        </div>

        <div className="container">
          <div className="col-md-8">
            <div className="row star-rating">
              <Link to={'/profile/' + this.state.id}>
                <h4>{this.state.firstName} {this.state.lastName}</h4>
              </Link>
              {this.state.starRating ? (<UserRating editable={'false'} starRating={ starRating }/>) : <div></div>}  
            </div>
          </div>
        </div>

        <div className="container setting-container">

          <div className="col-md-4">
            <h4 className="">Settings</h4>
              <div>
                <Link to='/account' onClick={this.handleToggle.bind(this, 'email')}><h5>Change Email</h5></Link>
                {mailCheck}
              </div>
              <div>
                <Link to='/account' onClick={this.handleToggle.bind(this, 'address')}><h5>Change Address</h5></Link>
                {addressCheck}
              </div>
              <div>
                <Link to='/account' onClick={this.handleToggle.bind(this, 'phone')}><h5>Change Phone Number</h5></Link>
                {phoneCheck}
              </div>
          </div>

          <div className="col-md-8 state setting-container">
            <h4>About me</h4>
            <div className="">
              {aboutMe}
            </div>
          </div>

        </div>






      </div>
    );
  }
}


// user
// :
// Object
// createdAt
// :
// "2016-09-15T02:24:56.270Z"
// email
// :
// "julkie17@gmail.com"
// firstName
// :
// "Julie"
// id
// :
// "10105700513297463"
// lastName
// :
// "Truong"
// photo
// :
// "https://scontent.xx.fbcdn.net/v/t1.0-1/s200x200/10417550_10103418587420213_3389328959999895776_n.jpg?oh=619920945e4f741f2f31ef321bd5d98b&oe=58720745"
// updatedAt
// :
// "2016-09-15T02:24:56.270Z" 


