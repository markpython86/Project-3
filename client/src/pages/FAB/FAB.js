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
import Tooltip from "@material-ui/core/Tooltip";


const WrappedFab = props => <Fab {...props} />;
WrappedFab.muiName = "Fab";

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
    zIndex: 2,
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
      {props.page === "daily" ? (
        <div>
          <Tooltip disableFocusListener title="Weekly Page">
            <WrappedFab
              color="primary"
              aria-label="Back"
              className={classes.backView}
              style={{ position: "fixed" }}
              component={Link}
              to="/weekly"
            >
              <ArrowBackIosIcon id="backArrow" />
            </WrappedFab>
          </Tooltip>
        </div>
      ) : null}
      {props.page === "weekly" ? (
        <div>
          <Tooltip disableFocusListener title="Daily Page">
            <WrappedFab
              color="primary"
              aria-label="Forward"
              className={classes.forwardView}
              style={{ position: "fixed" }}
              component={Link}
              to="/daily"
            >
              <ArrowForwardIosIcon id="forwardArrow" />
            </WrappedFab>
          </Tooltip>
          <Tooltip disableFocusListener title="Monthly Page">
            <WrappedFab
              color="primary"
              aria-label="Back"
              className={classes.backView}
              style={{ position: "fixed" }}
              component={Link}
              to="/monthly"
            >
              <ArrowBackIosIcon id="backArrow" />
            </WrappedFab>
          </Tooltip>
        </div>
      ) : null}
      {props.page === "monthly" ? (
        <div>
          <Tooltip disableFocusListener title="Weekly Page">
            <WrappedFab
              color="primary"
              aria-label="Forward"
              className={classes.forwardView}
              style={{ position: "fixed" }}
              component={Link}
              to="/weekly"
            >
              <ArrowForwardIosIcon id="forwardArrow" />
            </WrappedFab>
          </Tooltip>
        </div>
      ) : null}

      <SimpleModalWrapped
        submit={props.submit}
        loadDailies={props.loadDailies}
        hello={"hello"}
      />
    </Grid>
  );
}

FAB.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FAB);