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
      anchorEl2: null
    };
  }

  handleChange(event) {
    this.setState({ auth: event.target.checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, anchorEl2 } = this.state;
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);


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
              <div>
                <IconButton
                  aria-owns={open2 ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={e => this.handleMenu(e)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl2={anchorEl2}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open2={open2}
                  onClose={this.handleClose.bind(this)}
                >
                  <MenuItem onClick={() => this.handleClose}>Daily</MenuItem>
                  <MenuItem onClick={() => this.handleClose}>Weekly</MenuItem>
                </Menu>
              </div>
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
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
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
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => this.handleClose}>
                      Create Account
                    </MenuItem>
                    {/* <MenuItem onClick={() => this.handleClose}>My account</MenuItem> */}
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
