import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#c4b6af', light: '#f7e8e1', dark: '#938680', contrastText: '#000000', },
    secondary: { main: '#b0c5c2', light: '#e2f8f5', dark: '#809492', contrastText: '#000000', }, 
  },
  typography: { useNextVariants: true },
});

function Palette(props) {
  return (
    <MuiThemeProvider theme={theme}>
         {props.children}
    </MuiThemeProvider>
  );
}

export default Palette;