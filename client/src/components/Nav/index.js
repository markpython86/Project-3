import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from "react-router-dom";
import SwipeableTemporaryDrawer from './menuButton';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c4b6af', light: '#f7e8e1', dark: '#938680', contrastText: '#000000', }, 
  },
  typography: { useNextVariants: true },
});


class MenuAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
      menu: null,
    };
  }


  handleChange(event) {
    this.setState({ auth: event.target.checked });
  }

  handleMenu(event) {
    this.setState({ 
      anchorEl: event.currentTarget,
      menu: event.currentTarget.id
     });
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          {/* <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={auth} onChange={()=>this.handleChange} aria-label="LoginSwitch" />
            }
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup> */}
          <AppBar position="static">
            <Toolbar>

              <SwipeableTemporaryDrawer/>

              {/* <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={e => this.handleMenu(e)}
                  color="inherit"
                  id="main-menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose.bind(this)}
                >
                  <MenuItem onClick={() => this.handleClose}>
                    Daily
                  </MenuItem>
                  <MenuItem onClick={() => this.handleClose}>
                    Weekly
                  </MenuItem>
                </Menu>
              </div> */}
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
              >
                Minimalist
              </Typography>
              {auth && (
                <div>
                  <IconButton
                    aria-owns={open ? "menu-appbar" : undefined}
                    aria-haspopup="true"
                    onClick={e => this.handleMenu(e)}
                    color="inherit"
                    id="account-menu"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={this.handleClose.bind(this)}
                  >
                    <MenuItem
                      onClick={() => this.handleClose}
                      component={Link}
                      to="/signin"
                     >Login</MenuItem>
                    
                    <MenuItem
                      onClick={() => this.handleClose}
                      component={Link}
                      to="/signup"
                    >Create Account</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
