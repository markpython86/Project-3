import React, { Component } from 'react';
// import Header from './header';
// import Home from './home';
import MenuAppBar from './Nav';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className='cointainer'>
            {this.props.children}
        </div>

      </div>
    );
  }
}
