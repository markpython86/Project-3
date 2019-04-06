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
import Palette from '../Grid/Palette';
import Tooltip from "@material-ui/core/Tooltip";


const Moment = require('moment')

const WrappedFab = props => <Fab {...props} />;
WrappedFab.muiName = "Fab";


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
  },

  fab: {
    marginBottom: 10,
  },

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

  handleClosed = (modalClose) => {
    this.setState({ open: modalClose });
    
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

  handleClearState = () => {
    this.setState({
      dailyHighlight: '',
positive: '',
negative: '',
selectedTime1: new Date(),
selectedTime2: new Date(),
selectedDate: new Date(),
habit1: '',
habit2: '',
habit3: '',
    })
  }



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
      

      <Palette>

        <Tooltip disableFocusListener title="Add a new entry">
          <WrappedFab onClick={this.handleOpen}  color="secondary" aria-label="Add" className={classes.newEntry} style={{position: 'fixed'}}>
            <AddIcon />
          </WrappedFab>
        </Tooltip>

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
    <Tooltip disableFocusListener title="Save">
      <WrappedFab onClick={() => {
      props.submit(newState) 
      this.handleClosed(false)
      }} 
        size="medium" id="saveButton" aria-label="Check" color='secondary' className={classes.fab}>
        <Icon fontSize="large">check_icon</Icon>
      </WrappedFab>
    </Tooltip>
  </Grid>



  <Grid item xs={5}>
    <Tooltip disableFocusListener title="Cancel">
      <WrappedFab onClick={this.handleClose} size="medium" id="deleteButton" aria-label="Delete" className={classes.fab}>
        <Icon  fontSize="large">exit_to_app_icon</Icon>
      </WrappedFab>
    </Tooltip>
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
                  value={newState.wakeup}
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
                    value={this.state.selectedDate}
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
                    value={newState.sleep}
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
            label="Daily Highlight"
            placeholder="What needs to be prioritized today?"
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
            placeholder="What is something good from today?"
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
            placeholder="What is something bad from today?"            
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
                classes={{ select: "habitIcon"}}
                // name={this.state.habit1}
                // value={this.state.habit1}
                value={this.state.habit1}
                onChange={this.handleHabitChange1}
                IconComponent={classes.hide}
                className={classes.color}
                disableUnderline     
              >
                <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>
                  <MenuItem className={classes.menu} value="fitness_center"><FitnessCenter /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_run"><DirectionsRun /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bike"><DirectionsBike /></MenuItem>
                  <MenuItem className={classes.menu} value="rowing"><Rowing /></MenuItem>
                  <MenuItem className={classes.menu} value="pool"><Pool /></MenuItem>
                  <MenuItem className={classes.menu} value="local_cafe"><LocalCafe /></MenuItem>
                  <MenuItem className={classes.menu} value="local_dining"><LocalDining /></MenuItem>
                  <MenuItem className={classes.menu} value="local_drink"><LocalDrink /></MenuItem>
                  <MenuItem className={classes.menu} value="local_bar"><LocalBar /></MenuItem>
                  <MenuItem className={classes.menu} value="free_breakfast"><FreeBreakfast /></MenuItem>
                  <MenuItem className={classes.menu} value="kitchen"><Kitchen /></MenuItem>
                  <MenuItem className={classes.menu} value="local_atm"><LocalAtm /></MenuItem>
                  <MenuItem className={classes.menu} value="local_hotel"><LocalHotel /></MenuItem>
                  <MenuItem className={classes.menu} value="local_car_wash"><LocalCarWash /></MenuItem>
                  <MenuItem className={classes.menu} value="book"><Book /></MenuItem>
                  <MenuItem className={classes.menu} value="alarm_on"><AlarmOn /></MenuItem>
                  <MenuItem className={classes.menu} value="timer"><Timer /></MenuItem>
                  <MenuItem className={classes.menu} value="build"><Build /></MenuItem>
                  <MenuItem className={classes.menu} value="code"><Code /></MenuItem>
                  <MenuItem className={classes.menu} value="event_seat"><EventSeat /></MenuItem>
                  <MenuItem className={classes.menu} value="explore"><Explore /></MenuItem>
                  <MenuItem className={classes.menu} value="motorcycle"><Motorcycle /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bus"><DirectionsBus /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_car"><DirectionsCar /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_railway"><DirectionsRailway /></MenuItem>
                  <MenuItem className={classes.menu} value="local_laundry_service"><LocalLaundryService /></MenuItem>
                  <MenuItem className={classes.menu} value="local_activity"><LocalActivity /></MenuItem>
                  <MenuItem className={classes.menu} value="accessibility_new"><AccessibilityNew /></MenuItem>
                  <MenuItem className={classes.menu} value="pets"><Pets /></MenuItem>
                  <MenuItem className={classes.menu} value="question_answer"><QuestionAnswer /></MenuItem>
                  <MenuItem className={classes.menu} value="shopping_cart"><ShoppingCart /></MenuItem>
                  <MenuItem className={classes.menu} value="search"><Search /></MenuItem>
                  <MenuItem className={classes.menu} value="today"><Today /></MenuItem>
                  <MenuItem className={classes.menu} value="swap_vert"><SwapVert /></MenuItem>
                  <MenuItem className={classes.menu} value="watch_later"><WatchLater /></MenuItem>
                  <MenuItem className={classes.menu} value="work"><Work /></MenuItem>
                  <MenuItem className={classes.menu} value="mic"><Mic /></MenuItem>
                  <MenuItem className={classes.menu} value="movie"><Movie /></MenuItem>
                  <MenuItem className={classes.menu} value="call"><Call /></MenuItem>
                  <MenuItem className={classes.menu} value="email"><Email /></MenuItem>
                  <MenuItem className={classes.menu} value="sentiment_satisfied"><SentimentSatisfied /></MenuItem>
                  <MenuItem className={classes.menu} value="waves"><Waves /></MenuItem>
                  <MenuItem className={classes.menu} value="weekend"><Weekend /></MenuItem>
                  <MenuItem className={classes.menu} value="attach_money"><AttachMoney /></MenuItem>
                  <MenuItem className={classes.menu} value="headset"><Headset /></MenuItem>
                  <MenuItem className={classes.menu} value="color_lens"><ColorLens /></MenuItem>
                  <MenuItem className={classes.menu} value="camera"><Camera /></MenuItem>
                  <MenuItem className={classes.menu} value="linked_camera"><LinkedCamera /></MenuItem>
                  <MenuItem className={classes.menu} value="edit"><Edit /></MenuItem>
                  <MenuItem className={classes.menu} value="brush"><Brush /></MenuItem>
                  <MenuItem className={classes.menu} value="landscape"><Landscape /></MenuItem>
                  <MenuItem className={classes.menu} value="child_friendly"><ChildFriendly /></MenuItem>
                  <MenuItem className={classes.menu} value="spa"><Spa /></MenuItem>
                  <MenuItem className={classes.menu} value="smoke_free"><SmokeFree /></MenuItem>
                  <MenuItem className={classes.menu} value="golf_course"><GolfCourse /></MenuItem>
                  <MenuItem className={classes.menu} value="casino"><Casino /></MenuItem>
                  <MenuItem className={classes.menu} value="school"><School /></MenuItem>
                  <MenuItem className={classes.menu} value="local_library"><LocalLibrary /></MenuItem>
                  <MenuItem className={classes.menu} value="watch"><Watch /></MenuItem>
                </Select>
            </FormControl>
            </form>
            
            </Grid>
            
            <Grid item xs={4}>
            

            <form className={classes.habitRoot} autoComplete="off">
            <FormControl className={classes.formControl} >
              <Select
                classes={{ select: "habitIcon"}}
                // name={this.state.habit2}
                value={this.state.habit2}
                onChange={this.handleHabitChange2}
                IconComponent={classes.hide}
                className={classes.color}
                disableUnderline      
              >
                <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>
                  <MenuItem className={classes.menu} value="fitness_center"><FitnessCenter /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_run"><DirectionsRun /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bike"><DirectionsBike /></MenuItem>
                  <MenuItem className={classes.menu} value="rowing"><Rowing /></MenuItem>
                  <MenuItem className={classes.menu} value="pool"><Pool /></MenuItem>
                  <MenuItem className={classes.menu} value="local_cafe"><LocalCafe /></MenuItem>
                  <MenuItem className={classes.menu} value="local_dining"><LocalDining /></MenuItem>
                  <MenuItem className={classes.menu} value="local_drink"><LocalDrink /></MenuItem>
                  <MenuItem className={classes.menu} value="local_bar"><LocalBar /></MenuItem>
                  <MenuItem className={classes.menu} value="free_breakfast"><FreeBreakfast /></MenuItem>
                  <MenuItem className={classes.menu} value="kitchen"><Kitchen /></MenuItem>
                  <MenuItem className={classes.menu} value="local_atm"><LocalAtm /></MenuItem>
                  <MenuItem className={classes.menu} value="local_hotel"><LocalHotel /></MenuItem>
                  <MenuItem className={classes.menu} value="local_car_wash"><LocalCarWash /></MenuItem>
                  <MenuItem className={classes.menu} value="book"><Book /></MenuItem>
                  <MenuItem className={classes.menu} value="alarm_on"><AlarmOn /></MenuItem>
                  <MenuItem className={classes.menu} value="timer"><Timer /></MenuItem>
                  <MenuItem className={classes.menu} value="build"><Build /></MenuItem>
                  <MenuItem className={classes.menu} value="code"><Code /></MenuItem>
                  <MenuItem className={classes.menu} value="event_seat"><EventSeat /></MenuItem>
                  <MenuItem className={classes.menu} value="explore"><Explore /></MenuItem>
                  <MenuItem className={classes.menu} value="motorcycle"><Motorcycle /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bus"><DirectionsBus /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_car"><DirectionsCar /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_railway"><DirectionsRailway /></MenuItem>
                  <MenuItem className={classes.menu} value="local_laundry_service"><LocalLaundryService /></MenuItem>
                  <MenuItem className={classes.menu} value="local_activity"><LocalActivity /></MenuItem>
                  <MenuItem className={classes.menu} value="accessibility_new"><AccessibilityNew /></MenuItem>
                  <MenuItem className={classes.menu} value="pets"><Pets /></MenuItem>
                  <MenuItem className={classes.menu} value="question_answer"><QuestionAnswer /></MenuItem>
                  <MenuItem className={classes.menu} value="shopping_cart"><ShoppingCart /></MenuItem>
                  <MenuItem className={classes.menu} value="search"><Search /></MenuItem>
                  <MenuItem className={classes.menu} value="today"><Today /></MenuItem>
                  <MenuItem className={classes.menu} value="swap_vert"><SwapVert /></MenuItem>
                  <MenuItem className={classes.menu} value="watch_later"><WatchLater /></MenuItem>
                  <MenuItem className={classes.menu} value="work"><Work /></MenuItem>
                  <MenuItem className={classes.menu} value="mic"><Mic /></MenuItem>
                  <MenuItem className={classes.menu} value="movie"><Movie /></MenuItem>
                  <MenuItem className={classes.menu} value="call"><Call /></MenuItem>
                  <MenuItem className={classes.menu} value="email"><Email /></MenuItem>
                  <MenuItem className={classes.menu} value="sentiment_satisfied"><SentimentSatisfied /></MenuItem>
                  <MenuItem className={classes.menu} value="waves"><Waves /></MenuItem>
                  <MenuItem className={classes.menu} value="weekend"><Weekend /></MenuItem>
                  <MenuItem className={classes.menu} value="attach_money"><AttachMoney /></MenuItem>
                  <MenuItem className={classes.menu} value="headset"><Headset /></MenuItem>
                  <MenuItem className={classes.menu} value="color_lens"><ColorLens /></MenuItem>
                  <MenuItem className={classes.menu} value="camera"><Camera /></MenuItem>
                  <MenuItem className={classes.menu} value="linked_camera"><LinkedCamera /></MenuItem>
                  <MenuItem className={classes.menu} value="edit"><Edit /></MenuItem>
                  <MenuItem className={classes.menu} value="brush"><Brush /></MenuItem>
                  <MenuItem className={classes.menu} value="landscape"><Landscape /></MenuItem>
                  <MenuItem className={classes.menu} value="child_friendly"><ChildFriendly /></MenuItem>
                  <MenuItem className={classes.menu} value="spa"><Spa /></MenuItem>
                  <MenuItem className={classes.menu} value="smoke_free"><SmokeFree /></MenuItem>
                  <MenuItem className={classes.menu} value="golf_course"><GolfCourse /></MenuItem>
                  <MenuItem className={classes.menu} value="casino"><Casino /></MenuItem>
                  <MenuItem className={classes.menu} value="school"><School /></MenuItem>
                  <MenuItem className={classes.menu} value="local_library"><LocalLibrary /></MenuItem>
                  <MenuItem className={classes.menu} value="watch"><Watch /></MenuItem>
                </Select>
            </FormControl>
            </form>
            
            </Grid>

            <Grid item xs={4}>
            
            <form className={classes.habitRoot} autoComplete="off">
            <FormControl className={classes.formControl} >
              <Select
                classes={{ select: "habitIcon"}}
                // name={this.state.habit3}
                value={this.state.habit3}
                onChange={this.handleHabitChange3}
                IconComponent={classes.hide}
                className={classes.color}  
                disableUnderline    
              >
                <MenuItem className={classes.menu} value=""><em>None</em></MenuItem>
                  <MenuItem className={classes.menu} value="fitness_center"><FitnessCenter /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_run"><DirectionsRun /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bike"><DirectionsBike /></MenuItem>
                  <MenuItem className={classes.menu} value="rowing"><Rowing /></MenuItem>
                  <MenuItem className={classes.menu} value="pool"><Pool /></MenuItem>
                  <MenuItem className={classes.menu} value="local_cafe"><LocalCafe /></MenuItem>
                  <MenuItem className={classes.menu} value="local_dining"><LocalDining /></MenuItem>
                  <MenuItem className={classes.menu} value="local_drink"><LocalDrink /></MenuItem>
                  <MenuItem className={classes.menu} value="local_bar"><LocalBar /></MenuItem>
                  <MenuItem className={classes.menu} value="free_breakfast"><FreeBreakfast /></MenuItem>
                  <MenuItem className={classes.menu} value="kitchen"><Kitchen /></MenuItem>
                  <MenuItem className={classes.menu} value="local_atm"><LocalAtm /></MenuItem>
                  <MenuItem className={classes.menu} value="local_hotel"><LocalHotel /></MenuItem>
                  <MenuItem className={classes.menu} value="local_car_wash"><LocalCarWash /></MenuItem>
                  <MenuItem className={classes.menu} value="book"><Book /></MenuItem>
                  <MenuItem className={classes.menu} value="alarm_on"><AlarmOn /></MenuItem>
                  <MenuItem className={classes.menu} value="timer"><Timer /></MenuItem>
                  <MenuItem className={classes.menu} value="build"><Build /></MenuItem>
                  <MenuItem className={classes.menu} value="code"><Code /></MenuItem>
                  <MenuItem className={classes.menu} value="event_seat"><EventSeat /></MenuItem>
                  <MenuItem className={classes.menu} value="explore"><Explore /></MenuItem>
                  <MenuItem className={classes.menu} value="motorcycle"><Motorcycle /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_bus"><DirectionsBus /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_car"><DirectionsCar /></MenuItem>
                  <MenuItem className={classes.menu} value="directions_railway"><DirectionsRailway /></MenuItem>
                  <MenuItem className={classes.menu} value="local_laundry_service"><LocalLaundryService /></MenuItem>
                  <MenuItem className={classes.menu} value="local_activity"><LocalActivity /></MenuItem>
                  <MenuItem className={classes.menu} value="accessibility_new"><AccessibilityNew /></MenuItem>
                  <MenuItem className={classes.menu} value="pets"><Pets /></MenuItem>
                  <MenuItem className={classes.menu} value="question_answer"><QuestionAnswer /></MenuItem>
                  <MenuItem className={classes.menu} value="shopping_cart"><ShoppingCart /></MenuItem>
                  <MenuItem className={classes.menu} value="search"><Search /></MenuItem>
                  <MenuItem className={classes.menu} value="today"><Today /></MenuItem>
                  <MenuItem className={classes.menu} value="swap_vert"><SwapVert /></MenuItem>
                  <MenuItem className={classes.menu} value="watch_later"><WatchLater /></MenuItem>
                  <MenuItem className={classes.menu} value="work"><Work /></MenuItem>
                  <MenuItem className={classes.menu} value="mic"><Mic /></MenuItem>
                  <MenuItem className={classes.menu} value="movie"><Movie /></MenuItem>
                  <MenuItem className={classes.menu} value="call"><Call /></MenuItem>
                  <MenuItem className={classes.menu} value="email"><Email /></MenuItem>
                  <MenuItem className={classes.menu} value="sentiment_satisfied"><SentimentSatisfied /></MenuItem>
                  <MenuItem className={classes.menu} value="waves"><Waves /></MenuItem>
                  <MenuItem className={classes.menu} value="weekend"><Weekend /></MenuItem>
                  <MenuItem className={classes.menu} value="attach_money"><AttachMoney /></MenuItem>
                  <MenuItem className={classes.menu} value="headset"><Headset /></MenuItem>
                  <MenuItem className={classes.menu} value="color_lens"><ColorLens /></MenuItem>
                  <MenuItem className={classes.menu} value="camera"><Camera /></MenuItem>
                  <MenuItem className={classes.menu} value="linked_camera"><LinkedCamera /></MenuItem>
                  <MenuItem className={classes.menu} value="edit"><Edit /></MenuItem>
                  <MenuItem className={classes.menu} value="brush"><Brush /></MenuItem>
                  <MenuItem className={classes.menu} value="landscape"><Landscape /></MenuItem>
                  <MenuItem className={classes.menu} value="child_friendly"><ChildFriendly /></MenuItem>
                  <MenuItem className={classes.menu} value="spa"><Spa /></MenuItem>
                  <MenuItem className={classes.menu} value="smoke_free"><SmokeFree /></MenuItem>
                  <MenuItem className={classes.menu} value="golf_course"><GolfCourse /></MenuItem>
                  <MenuItem className={classes.menu} value="casino"><Casino /></MenuItem>
                  <MenuItem className={classes.menu} value="school"><School /></MenuItem>
                  <MenuItem className={classes.menu} value="local_library"><LocalLibrary /></MenuItem>
                  <MenuItem className={classes.menu} value="watch"><Watch /></MenuItem>
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

    </Palette>

    );

  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;