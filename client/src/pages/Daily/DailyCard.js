import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Flag, ArrowUpward, ArrowDownward, AlarmOn, AccessibilityNew, Book, Build, Code, EventSeat, Explore, Motorcycle, Pets, QuestionAnswer, Rowing, ShoppingCart, Search, Today, SwapVert, WatchLater, Work, Mic, Movie, Call, Email, SentimentSatisfied, Waves, Weekend, AttachMoney, Headset, ColorLens, Brush, Camera, Edit, Landscape, LinkedCamera, Timer, DirectionsBike, DirectionsBus, DirectionsCar, DirectionsRun, DirectionsRailway, LocalLaundryService, LocalActivity, LocalAtm, LocalBar, LocalCafe, LocalCarWash, LocalDining, LocalDrink, LocalHotel, ChildFriendly, Pool, Spa, SmokeFree, FreeBreakfast, GolfCourse, Casino, FitnessCenter, Kitchen, School, LocalLibrary, Watch, } from '@material-ui/icons/';
import "./DailyCard.css";

const styles = theme => ({
  
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

class DailyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      selectedTime1: new Date(),
      selectedTime2: new Date(),
      selectedDate: new Date(),
      habit1: '',
      habit2: '',
      habit3: '',
    };
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

  handleHabitChange1 = event => {
    this.setState({ habit1: event.target.value });
  };

  handleHabitChange2 = event => {
    this.setState({ habit2: event.target.value });
  };

  handleHabitChange3 = event => {
    this.setState({ habit3: event.target.value });
  };

  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
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


    return (
      <Grid item>
      {!this.state.isHidden && <Child />}

      <Card onClick={this.toggleHidden.bind(this)} className={classes.root} id="card">
        <CardContent className={classes.root}>
          
  {/* Begginning of time section. */}
          
          <Grid container spacing={0} id="header">
            <Grid item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around" id="timeHeader">
                  <TimePicker
                  margin="normal"
                  // label="Morning"
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

          <Typography id="text">
            <Flag id="icon"/> Daily Highlight {props.Highlights}
          </Typography>

          <Typography component="p" id="text">
            <ArrowUpward id="icon"/> Positive
            {props.positive}
          </Typography>

          <Typography component="p" id="text">
            <ArrowDownward id="icon"/> Negative
            {props.negative}
          </Typography>

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
                  value={this.state.habit1}
                  onChange={this.handleHabitChange1}
                  disableUnderline={true}
                  IconComponent={classes.hide}
                  className={classes.color}    
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
              <FormControl className={classes.formControl}>
                <Select
                  classes={{ select: "habitIcon"}}
                  value={this.state.habit2}
                  onChange={this.handleHabitChange2}
                  disableUnderline={true} 
                  IconComponent={classes.hide}
                  className={classes.color}
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
              <FormControl className={classes.formControl}>
                <Select
                  classes={{ select: "habitIcon"}}
                  value={this.state.habit3}
                  onChange={this.handleHabitChange3}
                  disableUnderline={true} 
                  IconComponent={classes.hide}
                  className={classes.color}
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
    );
  }
}


// Beginning of hidden FAB buttons.

const Child = () => (

  <Grid container className="fab"> 
  
  <Grid item xs={4}>
    <Fab size="small" id="saveButton" aria-label="Check" color='secondary'>
      <Icon fontSize="small">check_icon</Icon>
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab size="small" id="editButton" aria-label="Edit" color='primary'>
      <Icon fontSize="small">edit_icon</Icon>
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab size="small" id="deleteButton" aria-label="Delete">
      <Icon fontSize="small">delete_icon</Icon>
    </Fab>
  </Grid>

  </Grid>
)

// End of hidden FAB buttons.

DailyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DailyCard);