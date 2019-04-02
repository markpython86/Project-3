import React, { Component } from 'react';
import Carousel from './carousel';
import './style.css';
import { Grid } from '@material-ui/core';
import Signup from './../../components/auth/signup'



class Home extends Component {

  constructor() {
    super();
    this.state = {
      auth: [],

    }
  }

  render() {
    return (
      <div>
        <Grid container alignItems={"center"}>
          <div className="carousel">
            <Carousel />
          </div>
        </Grid>
          <Signup />
      </div>
    );
  }


}

export default Home;

