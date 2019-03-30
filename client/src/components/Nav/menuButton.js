import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';




const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {/* {['About', 'Daily', 'Weekly'].map((text, index) => ( */}
            <ListItem button key="About">
              <Link to="/about" >
                <ListItemText primary="About"/>
              </Link>
            </ListItem>
          <ListItem button key="Daily">
            <Link to="/daily" >
              <ListItemText primary="Daily" />
            </Link>
          </ListItem>
          <ListItem button key="Weekly">
            <Link to="/weekly" >
              <ListItemText primary="Weekly" />
            </Link>
          </ListItem>
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {/* {['Account', 'Login', 'Create Account'].map((text, index) => ( */}
            <ListItem button key="Account">
              <ListItemText primary="Account" />
            </ListItem>
          <ListItem button key="Login">
            <Link to="/signin" >
            <ListItemText primary="Login" />
            </Link>
          </ListItem>
          {/* ))} */}
        </List>
      </div>
    )

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)} color="inherit" aria-label="Menu"><MenuIcon/></IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwipeableTemporaryDrawer);