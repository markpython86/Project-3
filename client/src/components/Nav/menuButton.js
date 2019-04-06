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
import "./Nav.css";
import Palette from "../../pages/Grid/Palette"



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
    account: null
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
      account: localStorage.getItem("auth_jwt_token")
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <Palette>
        <List>
          <ListItem key="Logo" component={Link} to="/">
            <img id="logo" src="../utils/favicon/ML3.png"/>
          </ListItem>

          <ListItem button key="About" component={Link} to="/about">
                <ListItemText primary="About Minimalist v.1.0"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {['About', 'Daily', 'Weekly'].map((text, index) => ( */}
  
            <ListItem button key="Daily" component={Link} to="/daily">
              <ListItemText primary="Daily" />
            </ListItem>

            <ListItem button key="Weekly" component={Link} to="/weekly">
              <ListItemText primary="Weekly" />
            </ListItem>

            <ListItem button key="Monthly" component={Link} to="/monthly">
              <ListItemText primary="Monthly" />
            </ListItem>

           
          {/* ))} */}
        </List>
        <Divider />
        <List>
          {/* {['Account', 'Login', 'Create Account'].map((text, index) => ( */}
            <ListItem button key="Account" component={Link} to="/account">
              <ListItemText primary="Account Dashboard" />
            </ListItem>
            {this.state.account !== null ? (
              <ListItem button key="Logout" component={Link} to="/signout">
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button key="Login" component={Link} to="/signin">
                <ListItemText primary="Login" />
              </ListItem>
            )}

            {/* ))} */}
          </List>
        </Palette>
      </div>
    );

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