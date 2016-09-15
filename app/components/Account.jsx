import React, { Component } from 'react';
import {Link} from 'react-router'; 
import UserRating from './UserRating.jsx';

export default class UserSetting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // passWord: false,
      // address: false,
      // phone: false,
      // email: false,
      // user: {}

      id: null,
      firstName: null,
      lastName: null,
      email: null,
      photo: null,
      phone: null,
      starRating: null,
      editing: false,
      description: ''

    };
    this.setUser = this.setUser.bind(this);
  }

 
  setUser (user) {
    user.user.sumOfRatings = 100;
    user.user.numberOfRatings = 20;
    let userStarRating = user.user.numberOfRatings === 0 ? 0 : user.user.sumOfRatings / user.user.numberOfRatings;
    this.setState({
      id: user.user.id,
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      email: user.user.email,
      photo: user.user.photo,
      starRating: userStarRating
    })
    console.log(this.state.starRating, 'star RATING')
  }


  componentWillMount() {
    const context = this;
    $.ajax({             
      method: 'GET',
      url: 'api/user_data',
      success: function(user) {
        // console.log('got here')
        console.log('User Obj', user)
        context.setUser(user)
        console.log('User', context.state)
      }
    });
  }

  editProfile () {
    this.setState({
      editing: true
    })
  }

  saveProfile () {
    console.log('saving')
  }



  handleSubmit(setSomething, e) {
    e.preventDefault();
    var valid = true;
    var filter = function validateURL(textval) {     //  Verify if entered email is valid
      var emailregex = /\A[^@]+@([^@\.]+\.)+[^@\.]+\z/;
      return emailregex.test(textval);
    };
    //  Handle error messages for each clicked button seperately
    if ($('#user-password').val() === '' && setSomething === 'passWord') {  
      $('.passwordError').show();
      $('.emailError').hide();
      $('.addressError').hide();
      $('.phoneError').hide();
      valid = false;
    }
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
          console.log('user',userData);
          $.ajax({
            method: 'PUT',
            url: '/users',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({userData: context.state.user}),
            success: function(newUserInformation) {
              console.log(newUserInformation);
              console.log('User ingo updated !!');
            },
            error: function(error) {
              console.log('error');
            }
          });
        }
      });

      $('#user-password').val('');   //  Clean up input field after submit button is clicked
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
                                            <button type='submit' className="setting-btn passwordBtn btn btn-primary">Submit</button></form>
                                            <div className="passwordError alert alert-danger fade in" role="alert">
                                            <strong>Woah! Invalid Password </strong><small>Please enter a valid password</small></div>
                                          </div> : '';
    var mailCheck = this.state.email ? <div><form onSubmit={this.handleSubmit.bind(this, 'email')}><input id='user-email' type="email" placeholder='Type new email' className="input-xlarge"></input>
                                          <button type='submit' className="setting-btn emailBtn btn btn-primary">Submit</button></form>
                                          <div className="emailError alert alert-danger fade in" role="alert">
                                          <strong>Woah! Invalied email </strong><small>Please enter a valid email address</small></div>
                                       </div> : '';
    var addressCheck = this.state.address ? <div><form onSubmit={this.handleSubmit.bind(this, 'address')}><input id='user-address' type='text' placeholder='Type new address' className="input-xlarge"></input>
                                              <button type='submit' className="setting-btn addressBtn btn btn-primary">Submit</button></form>
                                              <div className="addressError alert alert-danger fade in" role="alert">
                                              <strong>Woah! Invalid address </strong><small>Please enter a valid address</small></div>
                                            </div> : '';
    var phoneCheck = this.state.phone ? <div><form onSubmit={this.handleSubmit.bind(this, 'phone')}><input id='user-phone' type='number' placeholder='Type new phone number' className="input-xlarge"></input>
                                          <button type='submit' className="setting-btn phoneBtn btn btn-primary">Submit</button></form>
                                          <div className="phoneError alert alert-danger fade in" role="alert">
                                          <strong>Woah! Invalid Phone number </strong><small>Please enter a valid phone number</small></div>
                                        </div> : '';
    var context = this.state.starRating;
    console.log(this.state.starRating);
    return (
      <div style = {{margin: 100}} className="container">
        <div className="col-sm-4">
          <div className="row">
            <img src={this.state.photo} alt="boohoo" className="img-responsive profile-image"/>
          </div>
          <div className="row">
            <h4 className="setting-container">Settings</h4>
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

        </div>
        <div className="col-sm-8">
          <div className="row">
              <button type="button" className="btn btn-primary edit" aria-label="Left Align" onClick={ () => this.editProfile() } >
                <span className="glyphicon glyphicon-star" aria-hidden="true">edit</span>
              </button>
          </div>
          <div className="row">
            <h4>{this.state.firstName} {this.state.lastName}</h4>
            {this.state.starRating ? (<UserRating editable={'false'} starRating={ context }/>) : <div></div>}  
          </div>
          <div className="row">
            <div className="row">
              <text>About me</text>
            </div>
            <div className="row">
              <div className="input-group input-group-lg">
                {this.state.editing ? (<textarea className="form-control" name="description" value="This is a description." onChange={ () => this.saveProfile() }/>) : <div></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div>{ this.state.user.user  }</div>
      // <div>{ this.state.user }</div>
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


// <div>
//   <Link to='/account' onClick={this.handleToggle.bind(this, 'passWord')}><h3>Change Password</h3></Link>
//   {passCheck}
// </div>
