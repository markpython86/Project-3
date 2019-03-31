import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: { main: '#c4b6af', light: '#f7e8e1', dark: '#938680', contrastText: '#000000', },
    secondary: { main: '#b0c5c2', light: '#e2f8f5', dark: '#809492', contrastText: '#000000', }, 
  },
  typography: { useNextVariants: true },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#808E95',
      },
      rounded: {
        borderRadius: 20,
      },
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
        maxWidth: 410,
      },
    },
    MuiInputBase: {
      input: {
        paddingTop: 0,
        paddingBottom: 0,
        color: '#000000',

        "&$disabled": {
          color: '#000000',
        },
      },
      multiline: {
        width: 310,
      },

    },
    MuiInput: {
      underline: {
        "&$disabled:before": {
          borderBottomStyle: 'none',
        },
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {      
        backgroundColor: '#c4b6af',
      },
    },
    MuiPickersToolbarButton: {
      toolbarBtn: {
        color: 'black',
      },
      toolbarBtnSelected: {
        color: 'black',
      },
    },

  },
});

function Palette(props) {
  return (
    <MuiThemeProvider theme={theme}>
         {props.children}
    </MuiThemeProvider>
  );
}

export default Palette;