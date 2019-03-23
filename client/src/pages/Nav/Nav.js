import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuList from '@material-ui/core/MenuList';
import AccountIcon from '@material-ui/icons/AccountCircle';
// import { NavLink } from 'react-router-dom';
// import * as actions from '../../actions';
// import { connect } from 'react-redux';
import navDropDown from './NavDropDown';

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

function Nav(props) {
  const { classes } = props;  

  return (
      <MuiThemeProvider theme={theme}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Minimalist
          </Typography>
          <Button color="inherit"><AccountIcon onClick={navDropDown}/></Button>
          {/* <MenuList>
            <ListItem>
              <li value="One"/>
              <li value="One"/>
            <ListItem/>
          <MenuList/> */}
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>
  );
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav);