import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import App1 from './pages/Daily/daily';
import App from './components/app';
import Home from './pages/Home';
import Account from './components/account';
import Daily from './pages/Daily/dailyPage';

import About from './pages/About/About';
import Monthly from './pages/Monthly/monthlyPage';
import Weekly from './pages/Weekly/weeklyPage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
import MenuAppBar from './components/Nav';

import '../style/style.scss'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('auth_jwt_token');

// if we have a token, consider the user to be signed in
if (token) {
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <App>
        <MenuAppBar token={token}/>
        <Switch>
          <Route path="/signin" render={() => (
            (localStorage.getItem('auth_jwt_token')) ? (
              <Redirect to="/daily"/>
            ) : (
              <Signin />
            )
          )}/>

          <Route path="/signup" render={() => (
            (localStorage.getItem('auth_jwt_token')) ? (
             <Redirect to="/daily"/>
            ) : (
              <Signup />
            )
          )}/>
          <Route exact path="/" component= {Home} />
          <Route path="/account" component= {RequireAuth(Account)} />
          <Route path="/about" component= {About} />
          <Route path="/signout" component= {Signout} />
          <Route path="/daily" component= {RequireAuth(Daily)} />
          <Route path="/weekly" component= {RequireAuth(Weekly)} />
          <Route path="/monthly" component= {RequireAuth(Monthly)} /> 
        </Switch>
      
      </App>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
