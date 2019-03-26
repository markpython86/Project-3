import React from 'react';
import Menu, { MenuItem } from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";


class MenuButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null
    }
  }

  handleChange(event, checked) {
    this.setState({ auth: checked });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const Wrapper = this.props.iconType;
    const listItems = this.props.items.map((link) =>
      <MenuItem key="mainMenu" onClick={this.handleClose} >{link}</MenuItem>
    );

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup="true"
          onClick={() => this.handleMenu}
          color="inherit"
        >
          {<Wrapper />}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={() => this.handleClose}
        >
          {listItems}


        </Menu>
      </div>
    );
  }

}

export default MenuButton ;