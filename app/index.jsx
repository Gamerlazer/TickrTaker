import React, {Component} from 'react';       //  Import react and react-router components
import ReactDOM from 'react-dom';
import {Router, Route, Link, hashHistory, IndexRoute, browserHistory} from 'react-router';
import App from './components/App.jsx';
import Landing from './components/Landing.jsx';
import Home from './components/Home.jsx';
import NotFound from './components/notfound.jsx';
import MyBids from './components/MyBids.jsx';
import PostItem from './components/PostItem.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import Account from './components/Account.jsx';



ReactDOM.render((                             //  Set up routes to navigate between different pages
  <Router history={browserHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/item/:id' component={ProductDetail}/>
      <Route path='/dashboard' component= {MyBids} />
      <Route path='/postitem' component = {PostItem} />
      <Route path='/account' component={Account} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
), document.getElementById('root'));


/********** REMOVING CODE ****************/
// import History from './components/history.jsx';
// <Route path='/history' component={History} />