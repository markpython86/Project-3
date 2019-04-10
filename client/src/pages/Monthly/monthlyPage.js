import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import API from "../../utils/API";
import { postMonthly } from "../../actions";
import Wrapper from "../Grid/Wrapper";
import FAB from "../FAB/FAB";
import Palette from "../Grid/Palette";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import Nav from "../../components/Nav";


import MonthlyCard from "./MonthlyCard";

import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';


const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: '#b0c5c2',
  },
  error: {
    backgroundColor: '#ba6b6c',
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: '#808E95',
  },
  icon: {
    fontSize: 20,
    color: 'black',
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
    color: 'black',
  },
  message: {
    display: 'flex',
    alignItems: 'center',
    color: 'black',
  },
});



function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      monthlies: [],
      dailies:[],
       savedMessage: false,
      deletedMessage: false,
      errorMessage: false,
      
    }
  }


  componentDidMount() {
    this.loadMonthlies();
  }


savedMessage = () => {
  this.setState({ savedMessage: true });
};

errorMessage = () => {
  this.setState({ errorMessage: true });
};
deletedMessage = () => {
  this.setState({ deletedMessage: true });
};

handleDeleteMessage = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({ deletedMessage: false });
};

handleSaveMessage = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({ savedMessage: false });
};

handleErrorMessage = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  this.setState({ errorMessage: false });
};

loadDaily = () => {
  API.getDailies()
  .then()
  .catch(err => console.log(err))
}





  //edit section==========================================================
  //function to load them and set state of daily ,weekly, or monthly
  loadMonthlies = () => {
    API.getMonthlies()
      .then(res => {
        this.setState({ 
          monthlies: res.data.monthly,
          dailies: res.data.daily
        })
      })
      .catch(err => console.log(err));
  }

deleteMonthlies = (id) => {
    API.deleteMonthly(id)
     .then(() =>  {
       this.loadMonthlies()
       this.deletedMessage()
       })
      .catch(err => console.log(err));
  };
 
  updateMonthlies = (id, update) => {
      API.updateMonthly(id, update)
      .then(() =>  
      {this.loadMonthlies()
      this.savedMessage()
      })
      .catch(err => console.log(err));
  }; 

    handleFormSubmit = (data) => {
      if(this.state.dailies.find(daily => daily.fullDate === data.fullDate)) {
        this.errorMessage();        // API.saveDaily(data)
                //   .then(() => this.loadDaily())
                //   .catch(err => console.log(err));
        
        
              } else {
                
      API.saveDaily(data)
        .then(()=>{
          this.loadMonthlies()
          this.savedMessage()
        })
        .catch(err => console.log(err))
      }
    };


  render() {
    const {handleSubmit} = this.props;
    return (
      <Palette>
      {/* <Nav /> */}
      <Wrapper>
      <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.savedMessage}
            autoHideDuration={3000}
            onClose={this.handleSaveMessage}
          >
          <MySnackbarContentWrapper
            onClose={this.handleSaveMessage}
            variant="success"
            message="Nice! 👍 Your entry has been saved."
          />
        </Snackbar>


        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.errorMessage}
            autoHideDuration={3000}
            onClose={this.handleErrorMessage}
          >
          <MySnackbarContentWrapper
            onClose={this.handleErrorMessage}
            variant="warning"
            message="Oops! 😅 You already have an entry on this date. Just edit that one!"
          />
        </Snackbar>

          
        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={this.state.deletedMessage}
            autoHideDuration={3000}
            onClose={this.handleDeleteMessage}
          >
          <MySnackbarContentWrapper
            onClose={this.handleDeleteMessage}
            variant="error"
            message="Bye, bye, bye. 👋 Your entry has been deleted."
          />
        </Snackbar>
        {/* <Container spacing="0"> */}
          <Container spacing="16">

          {/* // Add edit button to this page
          {/* Whatever submit button is used we need to add the onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} */}

            {this.state.monthlies.map((person, index) => (
              <Item xs='12' sm='3'key={person._id}>
              

                <MonthlyCard 
                  key={person._id}
                  index={person._id}
                  deleteMonthly = {this.deleteMonthlies}
                  updatedMonthly={this.updateMonthlies}
                  preUpdate={this.updateMonthlies}
                  updates={person}
                  remember={person.remember}
                  start={person.start}
                  stop={person.stop}
                  monthAt={person.monthAt}
                />
              
              </Item>
              
            ))}
            <Item xs='12' sm='3'>
                
              </Item>
          </Container>
          {/* </Container> */}
      <FAB page='monthly' submit={this.handleFormSubmit}/>
      </Wrapper>
      </Palette>
    )
  }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}


export default connect(mapStateToProps,{ postMonthly })(reduxForm({
    form: 'postMonthly'
})(App));