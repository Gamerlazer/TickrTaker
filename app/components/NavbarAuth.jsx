import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Navbar2 extends Component {
  render() {                                      //Render  Navbar after login
    return (
      <nav id="navbar2" className="navbar navbar-dark bg-inverse">
        <Link className="navbar-brand" id="brand-name" to="/"> Tickr </Link>
        <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#nav-content">
        ☰
        </button>
        <div className="collapse navbar-toggleable-md col-xs-12 col-lg-10" id="nav-content">
          <ul className="nav navbar-nav">
            <li className="nav-item col-md-2 col-sm-12 ">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="dropdown nav-item col-md-2 col-sm-12 ">
              <Link className="nav-link " to="/mydashboard/bids">Bidding</Link>
            </li>
            <li className="dropdown nav-item col-md-2 col-sm-12 ">
              <Link className="nav-link " to="/mydashboard/sales">Selling</Link>
            </li>
            <li className="nav-item col-md-2 col-sm-12 ">
              <Link className="nav-link" to="/postitem">Post Item</Link>
            </li>
            <li className="nav-item col-md-2 col-sm-12 ">
              <Link className="nav-link" to="/account">Account</Link>
            </li>
            <li className="nav-item col-md-2 col-sm-12 ">
              <a className="nav-link" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}