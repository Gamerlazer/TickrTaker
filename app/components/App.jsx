import React, {Component} from 'react';
import Navbar1 from './NavBarUnauth.jsx';
import Navbar2 from './NavBarAuth.jsx';


export default class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isAuth: false
    };
    this.checkAuthState = this.checkAuthState.bind(this);
  }

  componentWillMount() {   //  Retrieve the data, check if user logged in

    var context = this;
    $.get('/checkLogin').then(function(data) {
      console.log('checked log in')
      context.setState({
        isAuth: data === 'authenticated'
      });
    }).catch(function(err) {
      context.setState({
        isAuth: false
      });
    });
  }

  checkAuthState () {
    console.log('checking.')
    return this.state.isAuth;
  }

  render() {   //  Depending on authentication, serves different nav-bar
    var checkAuthState = this.checkAuthState;
    var navbar = this.state.isAuth ? <Navbar2 /> : <Navbar1 />;
    var children = React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        auth: checkAuthState
      });
    });
    return (
      <div>
        {navbar}
        {children}
      </div>
    );
  }
}
