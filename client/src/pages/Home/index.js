import React, { Component } from 'react';
import Carousel from './carousel';
import './style.css';
import { Grid } from '@material-ui/core';
import Signup from './../../components/auth/signup';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Palette from "../../pages/Grid/Palette"
import { Link } from "react-router-dom";

const token = localStorage.getItem('auth_jwt_token');




const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 150,
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center',

  },
});


class Home extends Component {

  constructor() {
    super();
    this.state = {
      auth: [],

    }
  }



  render() {
    const { classes, theme } = this.props;
    return (
      <Palette>
      <div>
        <Grid container alignItems={"center"}>
          <div className="carousel">
            <Carousel />
          </div>
        </Grid>
          {/* <Signup /> */}
        {token ? 
        <Grid container className={classes.center}>


               <Grid item s={12} m={4}>
          <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/about">
          Learn More
          </Button>
          </Grid>
          </Grid> 
             : 
              <Grid container className={classes.center}>
              <Grid item s={12} m={4}>
          <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/signup">
          Sign Up
          </Button>
          </Grid>

          <Grid item s={12} m={4}>
          <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/signin">
          Login
          </Button>
          </Grid>


          <Grid item s={12} m={4}>
          <Button variant="contained" size="large" color="primary" className={classes.button} component={Link} to="/about">
          Learn More
          </Button>
          </Grid>
          </Grid>

            }
          
             
      </div>
      </Palette>
    );
  }


}


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

// export default Home;

