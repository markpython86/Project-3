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
import '../Daily/DailyCard';
import './Modal.css';

const Moment = require('moment')

const styles = theme => ({

  newEntry: {
    position: 'absolute',
    bottom: 10,
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

class SimpleModal extends React.Component {
  state = {
    open: false,
    dailyHighlight: '',
    positive: '',
    negative: '',
    selectedTime1: new Date(),
    selectedTime2: new Date(),
    selectedDate: new Date(),
    habit1: '',
    habit2: '',
    habit3: '',
    
  };

  handleOpen = () => {
    this.setState({ open: true });
    
  };

  handleClose = () => {
    this.setState({ open: false });
    
  };

  handleClosed = () => {
    this.setState({ open: false });
    
  };

  returnFalse = () => {
    return false
  }

  handleTimeChange1 = date => {
    this.setState({ selectedTime1: date });
  };

  handleTimeChange2 = date => {
    this.setState({ selectedTime2: date });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleChangeDailyHighlight = dailyHighlight => event => {
    this.setState({ dailyHighlight: event.target.value });
  };

  handleChangePositive = positive => event => {
    this.setState({ positive: event.target.value });
  };

  handleChangeNegative = negative => event => {
    this.setState({ negative: event.target.value });
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
    const { habit1 } = this.state;
    const { habit2 } = this.state;
    const { habit3 } = this.state;
    const newState = {
      fullDate: Moment(this.state.selectedDate).format('MM-DD-YYYY'),
      highlights: this.state.dailyHighlight,
      positive: this.state.positive,
      negative: this.state.negative,
      sleep: this.state.selectedTime2,
      wakeup: this.state.selectedTime1,
      habit1: this.state.habit1,
      habit2: this.state.habit2,
      habit3: this.state.habit3,
      selectedDate: this.state.selectedDate
    }
    return (
      
      <Fab  onClick={this.handleOpen} color="secondary" aria-label="Add" className={classes.newEntry} style={{ position: 'fixed' }} >

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
                      <Fab 
                      onClick= {() => {
                        // props.handleClose();
                        
                        props.submit(newState)
                        // props.loadDailies()
                        
                        props.loadDailies()
                        this.handleClosed
                        
                        // console.log(handleClose)
                      } }
                        size="medium" id="saveButton" aria-label="Check" color='secondary'>
                        <Icon fontSize="large">check_icon</Icon>
                      </Fab>
                    </Grid>



                    <Grid item xs={5}>
                      <Fab onClick={this.handleClose} size="medium" id="deleteButton" aria-label="Delete">
                        <Icon fontSize="large">exit_to_app_icon</Icon>
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

                        <form noValidate autoComplete="off" id="textSection">

                          <Grid container alignItems="center">
                            <Grid item id="textIcon">
                              <Flag />
                            </Grid>
                            <Grid item>

                              <TextField
                                id="standard-textarea"
                                label="Daily Highlight"
                                placeholder="Daily Highlight"
                                multiline
                                onChange={this.handleChangeDailyHighlight}
                                className={classes.textField}
                                margin="normal"
                                value={this.state.dailyHighlight}
                                // value={props.Highlights}
                                onChange={this.handleChangeDailyHighlight('dailyHighlight')}
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
                                label="Positive"
                                placeholder="Positive"
                                multiline
                                onChange={this.handleChangePositive}
                                className={classes.textField}
                                margin="normal"
                                value={this.state.positive}
                                onChange={this.handleChangePositive('positive')}
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
                                label="Negative"
                                placeholder="Negative"
                                multiline
                                onChange={this.handleChangeNegative}
                                className={classes.textField}
                                margin="normal"
                                value={this.state.negative}
                                onChange={this.handleChangeNegative('negative')}
                              />

                            </Grid>
                          </Grid>


                        </form>

                        {/* End of daily three section. */}

                        {/* Beginning of habit section. */}

                        {/* <MuiThemeProvider theme={theme}> */}
                        <Grid id="footer" container spacing={0}>

                          <Grid item xs={4}>

                            <form className={classes.habitRoot} autoComplete="off">
                              <FormControl className={classes.formControl} >
                                <Select
                                  classes={{ select: "habitIcon" }}
                                  // name={this.state.habit1}
                                  value={habit1}
                                  onChange={this.handleHabitChange1}
                                  IconComponent={classes.hide}
                                  className={classes.color}
                                  disableUnderline
                                >
                                  <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>

                                  <MenuItem className={classes.menu} value="FitnessCenter"><FitnessCenter /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRun"><DirectionsRun /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBike"><DirectionsBike /></MenuItem>
                                  <MenuItem className={classes.menu} value="Rowing"><Rowing /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pool"><Pool /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCafe"><LocalCafe /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDining"><LocalDining /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDrink"><LocalDrink /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalBar"><LocalBar /></MenuItem>
                                  <MenuItem className={classes.menu} value="FreeBreakfast"><FreeBreakfast /></MenuItem>
                                  <MenuItem className={classes.menu} value="Kitchen"><Kitchen /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalAtm"><LocalAtm /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalHotel"><LocalHotel /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCarWash"><LocalCarWash /></MenuItem>
                                  <MenuItem className={classes.menu} value="Book"><Book /></MenuItem>
                                  <MenuItem className={classes.menu} value="AlarmOn"><AlarmOn /></MenuItem>
                                  <MenuItem className={classes.menu} value="Timer"><Timer /></MenuItem>
                                  <MenuItem className={classes.menu} value="Build"><Build /></MenuItem>
                                  <MenuItem className={classes.menu} value="Code"><Code /></MenuItem>
                                  <MenuItem className={classes.menu} value="EventSeat"><EventSeat /></MenuItem>
                                  <MenuItem className={classes.menu} value="Explore"><Explore /></MenuItem>
                                  <MenuItem className={classes.menu} value="Motorcycle"><Motorcycle /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBus"><DirectionsBus /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsCar"><DirectionsCar /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRailway"><DirectionsRailway /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLaundryService"><LocalLaundryService /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalActivity"><LocalActivity /></MenuItem>
                                  <MenuItem className={classes.menu} value="AccessibilityNew"><AccessibilityNew /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pets"><Pets /></MenuItem>
                                  <MenuItem className={classes.menu} value="QuestionAnswer"><QuestionAnswer /></MenuItem>
                                  <MenuItem className={classes.menu} value="ShoppingCart"><ShoppingCart /></MenuItem>
                                  <MenuItem className={classes.menu} value="Search"><Search /></MenuItem>
                                  <MenuItem className={classes.menu} value="Today"><Today /></MenuItem>
                                  <MenuItem className={classes.menu} value="SwapVert"><SwapVert /></MenuItem>
                                  <MenuItem className={classes.menu} value="WatchLater"><WatchLater /></MenuItem>
                                  <MenuItem className={classes.menu} value="Work"><Work /></MenuItem>
                                  <MenuItem className={classes.menu} value="Mic"><Mic /></MenuItem>
                                  <MenuItem className={classes.menu} value="Movie"><Movie /></MenuItem>
                                  <MenuItem className={classes.menu} value="Call"><Call /></MenuItem>
                                  <MenuItem className={classes.menu} value="Email"><Email /></MenuItem>
                                  <MenuItem className={classes.menu} value="SentimentSatisfied"><SentimentSatisfied /></MenuItem>
                                  <MenuItem className={classes.menu} value="Waves"><Waves /></MenuItem>
                                  <MenuItem className={classes.menu} value="Weekend"><Weekend /></MenuItem>
                                  <MenuItem className={classes.menu} value="AttachMoney"><AttachMoney /></MenuItem>
                                  <MenuItem className={classes.menu} value="Headset"><Headset /></MenuItem>
                                  <MenuItem className={classes.menu} value="ColorLens"><ColorLens /></MenuItem>
                                  <MenuItem className={classes.menu} value="Camera"><Camera /></MenuItem>
                                  <MenuItem className={classes.menu} value="LinkedCamera"><LinkedCamera /></MenuItem>
                                  <MenuItem className={classes.menu} value="Edit"><Edit /></MenuItem>
                                  <MenuItem className={classes.menu} value="Brush"><Brush /></MenuItem>
                                  <MenuItem className={classes.menu} value="Landscape"><Landscape /></MenuItem>
                                  <MenuItem className={classes.menu} value="ChildFriendly"><ChildFriendly /></MenuItem>
                                  <MenuItem className={classes.menu} value="Spa"><Spa /></MenuItem>
                                  <MenuItem className={classes.menu} value="SmokeFree"><SmokeFree /></MenuItem>
                                  <MenuItem className={classes.menu} value="GolfCourse"><GolfCourse /></MenuItem>
                                  <MenuItem className={classes.menu} value="Casino"><Casino /></MenuItem>
                                  <MenuItem className={classes.menu} value="School"><School /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLibrary"><LocalLibrary /></MenuItem>
                                  <MenuItem className={classes.menu} value="Watch"><Watch /></MenuItem>
                                </Select>
                              </FormControl>
                            </form>

                          </Grid>

                          <Grid item xs={4}>


                            <form className={classes.habitRoot} autoComplete="off">
                              <FormControl className={classes.formControl} >
                                <Select
                                  classes={{ select: "habitIcon" }}
                                  // name={this.state.habit2}
                                  value={habit2}
                                  onChange={this.handleHabitChange2}
                                  IconComponent={classes.hide}
                                  className={classes.color}
                                  disableUnderline
                                >
                                  <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>

                                  <MenuItem className={classes.menu} value="FitnessCenter"><FitnessCenter /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRun"><DirectionsRun /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBike"><DirectionsBike /></MenuItem>
                                  <MenuItem className={classes.menu} value="Rowing"><Rowing /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pool"><Pool /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCafe"><LocalCafe /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDining"><LocalDining /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDrink"><LocalDrink /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalBar"><LocalBar /></MenuItem>
                                  <MenuItem className={classes.menu} value="FreeBreakfast"><FreeBreakfast /></MenuItem>
                                  <MenuItem className={classes.menu} value="Kitchen"><Kitchen /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalAtm"><LocalAtm /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalHotel"><LocalHotel /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCarWash"><LocalCarWash /></MenuItem>
                                  <MenuItem className={classes.menu} value="Book"><Book /></MenuItem>
                                  <MenuItem className={classes.menu} value="AlarmOn"><AlarmOn /></MenuItem>
                                  <MenuItem className={classes.menu} value="Timer"><Timer /></MenuItem>
                                  <MenuItem className={classes.menu} value="Build"><Build /></MenuItem>
                                  <MenuItem className={classes.menu} value="Code"><Code /></MenuItem>
                                  <MenuItem className={classes.menu} value="EventSeat"><EventSeat /></MenuItem>
                                  <MenuItem className={classes.menu} value="Explore"><Explore /></MenuItem>
                                  <MenuItem className={classes.menu} value="Motorcycle"><Motorcycle /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBus"><DirectionsBus /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsCar"><DirectionsCar /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRailway"><DirectionsRailway /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLaundryService"><LocalLaundryService /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalActivity"><LocalActivity /></MenuItem>
                                  <MenuItem className={classes.menu} value="AccessibilityNew"><AccessibilityNew /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pets"><Pets /></MenuItem>
                                  <MenuItem className={classes.menu} value="QuestionAnswer"><QuestionAnswer /></MenuItem>
                                  <MenuItem className={classes.menu} value="ShoppingCart"><ShoppingCart /></MenuItem>
                                  <MenuItem className={classes.menu} value="Search"><Search /></MenuItem>
                                  <MenuItem className={classes.menu} value="Today"><Today /></MenuItem>
                                  <MenuItem className={classes.menu} value="SwapVert"><SwapVert /></MenuItem>
                                  <MenuItem className={classes.menu} value="WatchLater"><WatchLater /></MenuItem>
                                  <MenuItem className={classes.menu} value="Work"><Work /></MenuItem>
                                  <MenuItem className={classes.menu} value="Mic"><Mic /></MenuItem>
                                  <MenuItem className={classes.menu} value="Movie"><Movie /></MenuItem>
                                  <MenuItem className={classes.menu} value="Call"><Call /></MenuItem>
                                  <MenuItem className={classes.menu} value="Email"><Email /></MenuItem>
                                  <MenuItem className={classes.menu} value="SentimentSatisfied"><SentimentSatisfied /></MenuItem>
                                  <MenuItem className={classes.menu} value="Waves"><Waves /></MenuItem>
                                  <MenuItem className={classes.menu} value="Weekend"><Weekend /></MenuItem>
                                  <MenuItem className={classes.menu} value="AttachMoney"><AttachMoney /></MenuItem>
                                  <MenuItem className={classes.menu} value="Headset"><Headset /></MenuItem>
                                  <MenuItem className={classes.menu} value="ColorLens"><ColorLens /></MenuItem>
                                  <MenuItem className={classes.menu} value="Camera"><Camera /></MenuItem>
                                  <MenuItem className={classes.menu} value="LinkedCamera"><LinkedCamera /></MenuItem>
                                  <MenuItem className={classes.menu} value="Edit"><Edit /></MenuItem>
                                  <MenuItem className={classes.menu} value="Brush"><Brush /></MenuItem>
                                  <MenuItem className={classes.menu} value="Landscape"><Landscape /></MenuItem>
                                  <MenuItem className={classes.menu} value="ChildFriendly"><ChildFriendly /></MenuItem>
                                  <MenuItem className={classes.menu} value="Spa"><Spa /></MenuItem>
                                  <MenuItem className={classes.menu} value="SmokeFree"><SmokeFree /></MenuItem>
                                  <MenuItem className={classes.menu} value="GolfCourse"><GolfCourse /></MenuItem>
                                  <MenuItem className={classes.menu} value="Casino"><Casino /></MenuItem>
                                  <MenuItem className={classes.menu} value="School"><School /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLibrary"><LocalLibrary /></MenuItem>
                                  <MenuItem className={classes.menu} value="Watch"><Watch /></MenuItem>
                                </Select>
                              </FormControl>
                            </form>

                          </Grid>

                          <Grid item xs={4}>

                            <form className={classes.habitRoot} autoComplete="off">
                              <FormControl className={classes.formControl} >
                                <Select
                                  classes={{ select: "habitIcon" }}
                                  // name={this.state.habit3}
                                  value={habit3}
                                  onChange={this.handleHabitChange3}
                                  IconComponent={classes.hide}
                                  className={classes.color}
                                  disableUnderline
                                >
                                  <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>

                                  <MenuItem className={classes.menu} value="FitnessCenter"><FitnessCenter /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRun"><DirectionsRun /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBike"><DirectionsBike /></MenuItem>
                                  <MenuItem className={classes.menu} value="Rowing"><Rowing /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pool"><Pool /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCafe"><LocalCafe /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDining"><LocalDining /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalDrink"><LocalDrink /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalBar"><LocalBar /></MenuItem>
                                  <MenuItem className={classes.menu} value="FreeBreakfast"><FreeBreakfast /></MenuItem>
                                  <MenuItem className={classes.menu} value="Kitchen"><Kitchen /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalAtm"><LocalAtm /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalHotel"><LocalHotel /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalCarWash"><LocalCarWash /></MenuItem>
                                  <MenuItem className={classes.menu} value="Book"><Book /></MenuItem>
                                  <MenuItem className={classes.menu} value="AlarmOn"><AlarmOn /></MenuItem>
                                  <MenuItem className={classes.menu} value="Timer"><Timer /></MenuItem>
                                  <MenuItem className={classes.menu} value="Build"><Build /></MenuItem>
                                  <MenuItem className={classes.menu} value="Code"><Code /></MenuItem>
                                  <MenuItem className={classes.menu} value="EventSeat"><EventSeat /></MenuItem>
                                  <MenuItem className={classes.menu} value="Explore"><Explore /></MenuItem>
                                  <MenuItem className={classes.menu} value="Motorcycle"><Motorcycle /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsBus"><DirectionsBus /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsCar"><DirectionsCar /></MenuItem>
                                  <MenuItem className={classes.menu} value="DirectionsRailway"><DirectionsRailway /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLaundryService"><LocalLaundryService /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalActivity"><LocalActivity /></MenuItem>
                                  <MenuItem className={classes.menu} value="AccessibilityNew"><AccessibilityNew /></MenuItem>
                                  <MenuItem className={classes.menu} value="Pets"><Pets /></MenuItem>
                                  <MenuItem className={classes.menu} value="QuestionAnswer"><QuestionAnswer /></MenuItem>
                                  <MenuItem className={classes.menu} value="ShoppingCart"><ShoppingCart /></MenuItem>
                                  <MenuItem className={classes.menu} value="Search"><Search /></MenuItem>
                                  <MenuItem className={classes.menu} value="Today"><Today /></MenuItem>
                                  <MenuItem className={classes.menu} value="SwapVert"><SwapVert /></MenuItem>
                                  <MenuItem className={classes.menu} value="WatchLater"><WatchLater /></MenuItem>
                                  <MenuItem className={classes.menu} value="Work"><Work /></MenuItem>
                                  <MenuItem className={classes.menu} value="Mic"><Mic /></MenuItem>
                                  <MenuItem className={classes.menu} value="Movie"><Movie /></MenuItem>
                                  <MenuItem className={classes.menu} value="Call"><Call /></MenuItem>
                                  <MenuItem className={classes.menu} value="Email"><Email /></MenuItem>
                                  <MenuItem className={classes.menu} value="SentimentSatisfied"><SentimentSatisfied /></MenuItem>
                                  <MenuItem className={classes.menu} value="Waves"><Waves /></MenuItem>
                                  <MenuItem className={classes.menu} value="Weekend"><Weekend /></MenuItem>
                                  <MenuItem className={classes.menu} value="AttachMoney"><AttachMoney /></MenuItem>
                                  <MenuItem className={classes.menu} value="Headset"><Headset /></MenuItem>
                                  <MenuItem className={classes.menu} value="ColorLens"><ColorLens /></MenuItem>
                                  <MenuItem className={classes.menu} value="Camera"><Camera /></MenuItem>
                                  <MenuItem className={classes.menu} value="LinkedCamera"><LinkedCamera /></MenuItem>
                                  <MenuItem className={classes.menu} value="Edit"><Edit /></MenuItem>
                                  <MenuItem className={classes.menu} value="Brush"><Brush /></MenuItem>
                                  <MenuItem className={classes.menu} value="Landscape"><Landscape /></MenuItem>
                                  <MenuItem className={classes.menu} value="ChildFriendly"><ChildFriendly /></MenuItem>
                                  <MenuItem className={classes.menu} value="Spa"><Spa /></MenuItem>
                                  <MenuItem className={classes.menu} value="SmokeFree"><SmokeFree /></MenuItem>
                                  <MenuItem className={classes.menu} value="GolfCourse"><GolfCourse /></MenuItem>
                                  <MenuItem className={classes.menu} value="Casino"><Casino /></MenuItem>
                                  <MenuItem className={classes.menu} value="School"><School /></MenuItem>
                                  <MenuItem className={classes.menu} value="LocalLibrary"><LocalLibrary /></MenuItem>
                                  <MenuItem className={classes.menu} value="Watch"><Watch /></MenuItem>
                                </Select>
                              </FormControl>
                            </form>

                          </Grid>

                        </Grid>
                        {/* </MuiThemeProvider> */}


                        {/* End of habit section. */}

                      </CardContent>


                    </Card>


                  </Grid>

                </td>

              </tr>
            </tbody>
          </table>
        </Modal>
      </Fab>
    
    )
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;