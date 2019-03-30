import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Grid from '@material-ui/core/Grid';
import './FAB.css'
import '../Modal/Modal'
import { Link } from "react-router-dom";
import SimpleModalWrapped from '../Modal/Modal';
// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
// import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  newEntry: {
    position: 'absolute',
    bottom:10,
    // right:10,
  },
  backView: {
    position: 'absolute',
    bottom:10,
    left:10,
  },
  forwardView: {
    position: 'absolute',
    bottom:10,
    right:10,
  },

  mainConatinerStyle: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginBottom: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
});

let floatingMenu ;
if (window.location.pathname === "/daily") {
  floatingMenu = 
    <Fab
      color="primary"
      aria-label="Back"
      className={classes.backView}
      style={{ position: 'fixed' }}
      component={Link}
      to="/weekly">
      <ArrowBackIosIcon id="backArrow" />
    </Fab>

} else if (window.location.pathname === "/weekly") {
  floatingMenu = 
    <Fab
      color="primary"
      aria-label="Forward"
      className={classes.forwardView}
      style={{ position: 'fixed' }}
      component={Link}
      to="/daily">
      <ArrowForwardIosIcon id="forwardArrow" />
    </Fab>
}

function FAB(props) {
  const { classes } = props;

  return (
    <Grid container className={classes.mainConatinerStyle}>
      
        {props.page === "daily" ? 
          (
          <Fab 
          color="primary" 
          aria-label="Back" 
          className={classes.backView} 
          style={{position: 'fixed'}}
          component={Link}
          to="/weekly"
          >
          <ArrowBackIosIcon id="backArrow"/>
          </Fab>
          ) : (
          <Fab
          color="primary"
          aria-label="Forward"
          className={classes.forwardView}
          style={{ position: 'fixed' }}
          component={Link}
          to="/daily"
          >
          <ArrowForwardIosIcon id="forwardArrow" />
          </Fab>
          )
        }
      

        <SimpleModalWrapped />



    </Grid>
  );
}

FAB.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAB);