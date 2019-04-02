import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Grid } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Icon from '@material-ui/core/Icon';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Flag, ArrowUpward, ArrowDownward, AlarmOn, AccessibilityNew, Book, Build, Code, EventSeat, Explore, Motorcycle, Pets, QuestionAnswer, Rowing, ShoppingCart, Search, Today, SwapVert, WatchLater, Work, Mic, Movie, Call, Email, SentimentSatisfied, Waves, Weekend, AttachMoney, Headset, ColorLens, Brush, Camera, Edit, Landscape, LinkedCamera, Timer, DirectionsBike, DirectionsBus, DirectionsCar, DirectionsRun, DirectionsRailway, LocalLaundryService, LocalActivity, LocalAtm, LocalBar, LocalCafe, LocalCarWash, LocalDining, LocalDrink, LocalHotel, ChildFriendly, Pool, Spa, SmokeFree, FreeBreakfast, GolfCourse, Casino, FitnessCenter, Kitchen, School, LocalLibrary, Watch, } from '@material-ui/icons/';
import '../Weekly/WeeklyCard';
import './WeeklyModal.css';



const styles = theme => ({

  newEntry: {
    position: 'absolute',
    bottom:10,
    // right:10,
  },
  
  center: {
    display: 'flex', // make us of Flexbox
    alignItems: 'center', // does vertically center the desired content
    justifyContent: 'center', // horizontally centers single line items
    textAlign: 'center', // optional, but helps horizontally center text that breaks into multiple lines
  },

  wrapper: {
    verticalAlign: 'middle',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
    border: 0,
  },

  root: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0
    },
    minWidth: 275,
   },
 
   container: {
     minwidth: 275,
     textAlign: 'center',
   },
   
   header: {
     fontSize: 14,
     textAlign: 'center',
     padding: 0,
     color: '#808e95',
     fontWeight: '500',
   },
 
   headerActive: {
     fontSize: 14,
     textAlign: 'center',
     padding: 0,
     color: 'black',
     fontWeight: '500',
   },
 
   footer: {
     fontSize: 14,
     textAlign: 'center',
     padding: 0,
     color: '#808e95',
     fontWeight: '500',
   },
 
   footerActive: {
     fontSize: 14,
     textAlign: 'center',
     padding: 0,
     color: 'black',
     fontWeight: '500',
   },
 
   pos: {
     marginBottom: 12,
   },
 
 
   habitRoot: {
     textAlign: 'center',
     minwidth: 0,
   },
 
   menu: {
     display: 'inline-grid',
     textAlign: 'center',
   },
 
   color: {
     backgroundColor: '#808E95',
     borderRadius: 50,
     width: 35,
     height: 35,
     textAlign: 'center',
   },
 
   hide: {
     display: 'none',
   }
  
});

class SimpleWeeklyModal extends React.Component {
  state = {
    open: false,
    best: '',
    worst: '',
    nextWeek: '',
    selectedTime1: new Date(),
    selectedTime2: new Date(),
    selectedDate: new Date()
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTimeChange1 = date => {
    this.setState({ selectedTime1: date });
  };

  handleTimeChange2 = date => {
    this.setState({ selectedTime2: date });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleChangeBest = best => event => {
    this.setState({ [best]: event.target.value});
  };

  handleChangeWorst = worst => event => {
    this.setState({ [worst]: event.target.value });
  };

  handleChangeNextWeek = nextWeek => event => {
    this.setState({ [nextWeek]: event.target.value });
  };

  handleHabitChange1 = event => {
    this.setState({ habit1: event.target.value });
  };

  handleHabitChange2 = event => {
    this.setState({ habit2: event.target.value });
  };

  handleHabitChange3 = event => {
    this.setState({ habit3: event.target.value });
  };


  render() {

    const {
      props,
    } = this;

    const { classes } = props;
    const { selectedTime1 } = this.state;
    const { selectedTime2 } = this.state;
    const { selectedDate } = this.state;
    const newState = {
      best: this.state.best,
      worst: this.state.worst,
      nextWeek: this.state.nextWeek,
    }

   


    return (
      

      <Fab onClick={this.handleOpen}  color="secondary" aria-label="Add" className={classes.newEntry} style={{position: 'fixed'}}>
        
        <AddIcon />
      
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <table className={classes.wrapper}>
          <tbody>
            <tr>
              <td>
            


            <Grid container className={classes.center}>
 
  
  <Grid item xs={5}>
    <Fab onClick={() => props.submit(newState) } size="medium" id="saveButton" aria-label="Check" color='secondary'>
      <Icon fontSize="large">check_icon</Icon> 
    </Fab>
  </Grid>



  <Grid item xs={5}>
    <Fab onClick={this.handleClose} size="medium" id="deleteButton" aria-label="Delete">
      <Icon  fontSize="large">exit_to_app_icon</Icon>
    </Fab>
  </Grid>



                
            <Card className={classes.root} id="card">

            
        <CardContent className={classes.root}>
        
  {/* Begginning of time section. */}

          <Grid container spacing={0} id="header">
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around" id="timeHeader">
                  <TimePicker
                  margin="normal"
                  // label="Morning"
                  // value={this.props.wakeup}
                  value={selectedTime1}
                  onChange={this.handleTimeChange1}
                  id="timeRow"
                />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around" id="timeHeader">
                  <DatePicker
                    margin="normal"
                    // label="Date"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    id="timeRow"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around" id="timeHeader">
                  <TimePicker
                    margin="normal"
                    // label="Evening"
                    // value={this.props.sleep}
                    value={selectedTime2}
                    onChange={this.handleTimeChange2}
                    id="timeRow"
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          
          </Grid>
  
  {/* End of time section. */}

  {/* Beginning of daily three. */}
  
      <form  noValidate autoComplete="off" id="textSection">
      
        <Grid container alignItems="center">
          <Grid item id="textIcon">
            <Flag />
          </Grid>
          <Grid item>
          
            <TextField
            id="standard-textarea"
            label="Best"
            placeholder="Best"
            multiline
            onChange={this.handleChangeBest}
            className={classes.textField}
            margin="normal"
            value={this.state.best}
            // value={props.Highlights}
            onChange={this.handleChangeBest('best')}
            />
           
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
            <ArrowUpward />
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Worst"
            placeholder="Worst"
            multiline
            onChange={this.handleChangeWorst}
            className={classes.textField}
            margin="normal"
            value={this.state.worst}
            onChange={this.handleChangeWorst('worst')}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
            <ArrowDownward />
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Next Week"
            placeholder="Next Week"
            multiline
            onChange={this.handleChangeNextWeek}
            className={classes.textField}
            margin="normal"
            value={this.state.nextWeek}
            onChange={this.handleChangeNextWeek('nextWeek')}
            />
            
          </Grid>
        </Grid>
       

      </form>

  {/* End of daily three section. */}


        </CardContent>


      </Card>


            </Grid>

              </td>

            </tr>
            </tbody>
          </table>
        </Modal>
      </Fab>

    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleWeeklyModalWrapped = withStyles(styles)(SimpleWeeklyModal);

export default SimpleWeeklyModalWrapped;