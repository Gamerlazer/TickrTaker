import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar1 extends Component {
  constructor (props) {
    super(props);
  }

  render() {      // Navbar on main page, before login
    return (
      <nav id="navbar1" className="navbar navbar-dark bg-inverse">
        <Link className="navbar-brand" id="brand-name" to="/"> Tickr </Link>
        <ul className="nav navbar-nav">
          <li className="nav-item ">
            <Link className="nav-link" to="/home">Auctions </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/auth/facebook">Login with Facebook</a>
          </li>
        </ul>
      </nav>
    );
  }
}
