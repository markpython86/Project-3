import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from 'material-ui-pickers';
import 'date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Flag, ArrowUpward, ArrowDownward, AlarmOn, AccessibilityNew, Book, Build, Code, EventSeat, Explore, Motorcycle, Pets, QuestionAnswer, Rowing, ShoppingCart, Search, Today, SwapVert, WatchLater, Work, Mic, Movie, Call, Email, SentimentSatisfied, Waves, Weekend, AttachMoney, Headset, ColorLens, Brush, Camera, Edit, Landscape, LinkedCamera, Timer, DirectionsBike, DirectionsBus, DirectionsCar, DirectionsRun, DirectionsRailway, LocalLaundryService, LocalActivity, LocalAtm, LocalBar, LocalCafe, LocalCarWash, LocalDining, LocalDrink, LocalHotel, ChildFriendly, Pool, Spa, SmokeFree, FreeBreakfast, GolfCourse, Casino, FitnessCenter, Kitchen, School, LocalLibrary, Watch, } from '@material-ui/icons/';
import "./WeeklyCard.css";

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

  margin: {
    margin: theme.spacing.unit * 1,
  },

  habitRoot: {
    width: 360,
    display: 'grid',
    justifyContent: 'space-evenly',
    gridTemplateColumns: '50px 50px 50px 50px', /*Make the grid smaller than the container*/
    gridGap: 10,
    // backgroundColor: '#808E95',
    padding: 5,
  },

  menu: {
    backgroundColor: '#808E95',
    borderRadius: 50,
    textAlign: 'center',
    padding: 5,
    fontSize: 25,
    marginBottom: 5,
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



class WeeklyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      best: '',
      worst: '',
      nextWeek: '',
      selectedDate: '',
      weekStart: '',
      weekEnd: '',
      habits: '',
      isInEditMode: false
    };
  }

  notEditMode = () => {
    this.setState({
      isInEditMode: false,
      })
  }

  handleChangeBest = best => event => {
    this.setState({ [best]: event.target.value});
  };

  handleChangeWorst = worst => event => {
    this.setState({ [worst]: event.target.value });
  };

  handleChangeNextWeek = nextWeek => event => {
    this.setState({ [nextWeek]: event.target.value });
  };

  

  editMode = () =>{
    
    this.setState({
      best: this.props.best,
      worst: this.props.worst,
      nextWeek: this.props.nextWeek,
      isInEditMode: true,

      
    })
  }


  toggleHidden () {
    this.setState({
      isHidden: false,
    })
  }

  hideIcons = () =>{
    this.setState({
      isHidden: true,
    });
  }

  loadWeeklies = () => {
    this.props.loadWeeklies()
  }
  handleClickAway = () => {
    if (!this.state.isInEditMode){
    this.setState({
      isHidden: true,
    });
    }
  };
  deleteWeekly = (id) => {
    this.props.deleteWeekly(id)
  }


  render() {
    const {
      props,
    } = this;
    const { classes } = props;
    const habits = props.updates.habits.filter(String);
    const weekStart = props.updates.weekStart
    const weekEnd = props.updates.weekEnd
    const newState = {
      best: this.state.best,
      worst: this.state.worst,
      nextWeek: this.state.nextWeek,
    }
   


    function compressArray(original) {
 
      var compressed = [];
      // make a copy of the input array
      var copy = original.slice(0);
     
      // first loop goes over every element
      for (var i = 0; i < original.length; i++) {
     
        var myCount = 0;	
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
          if (original[i] == copy[w]) {
            // increase amount of times duplicate is found
            myCount++;
            // sets item to undefined
            delete copy[w];
          }
        }
     
        if (myCount > 0) {
          var a = new Object();
          a.value = original[i];
          a.count = myCount;
          compressed.push(a);
        }
      }
     
      return compressed;
    };

    var habitCounter = compressArray(habits);




    return (

      <ClickAwayListener onClickAway={this.handleClickAway}>

      <Grid item>
  {!this.state.isHidden && <Child props={props} editMode={this.editMode} loadWeeklies={this.loadWeeklies} notEditMode={this.notEditMode} deleteWeekly={this.deleteWeekly} hideIcons={this.hideIcons} newState={newState} />}

      <Card onClick={this.toggleHidden.bind(this)} className={classes.root} id="card">
        <CardContent className={classes.root}>
          
  
{/* Begginning of time section. */}
          <Grid container spacing={0} id="header">
            <Grid item xs={3} >
            <Typography className="headerText" variant="h6">
                {weekStart}
              </Typography>
            </Grid>


            <Grid item xs={5}>
              <Typography className="headerText" variant="h6">
                Weekly Summary
              </Typography>
            </Grid>

            <Grid item xs={3}>
            <Typography className="headerText" variant="h6">
               {weekEnd}
              </Typography>
            </Grid>

          </Grid>
  
  {/* End of time section. */}



  {/* Beginning of weekly three. */}
{!this.state.isInEditMode ? 
      <form  noValidate autoComplete="off" id="textSection">
      
        <Grid container alignItems="center">
          <Grid item id="textIcon">
            <Icon>stars</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Best"
            placeholder="What was the best thing from this week?"
            multiline
            onChange={this.handleChangeBest}
            className={classes.textField}
            margin="normal"
            // disableUnderline
            disabled
            value={props.best}
            onChange={this.handleChangeBest('best')}
            />
           
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>cancel</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Worst"
            placeholder="What was the worst thing from this week?"
            multiline
            onChange={this.handleChangeWorst}
            className={classes.textField}
            margin="normal"
            disabled
            value={props.worst}
            onChange={this.handleChangeWorst('worst')}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>next_week</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Next"
            placeholder="What do I need to do next week?"
            multiline
            onChange={this.handleChangeNextWeek}
            className={classes.textField}
            margin="normal"
            disabled
            value={props.nextWeek}
            onChange={this.handleChangeNextWeek('nextWeek')}
            />
            
          </Grid>
        </Grid>
       

      </form>
      :
      <form  noValidate autoComplete="off" id="textSection">
      
        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>stars</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Best"
            placeholder="What was the best thing from this week?"
            multiline
            onChange={this.handleChangeBest}
            className={classes.textField}
            margin="normal"
            value={this.state.best}
            onChange={this.handleChangeBest('best')}
            />
           
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>cancel</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Worst"
            placeholder="What was the worst thing from this week?"
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
          <Icon>next_week</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Next"
            placeholder="What do I need to do next week?"
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
      }

  {/* End of daily three section. */}

  {/* Beginning of habit section. */}
          <Grid id="footer" className={classes.habitRoot} container spacing={0}>
             
              {habitCounter.map(({value, count}, index)=>(
                <Badge key={index} className={classes.margin} badgeContent={count} color="primary">
                  <Icon className={classes.menu}>{value}</Icon>
                </Badge>
              ))
              }

          </Grid>


  {/* End of habit section. */}

        </CardContent>
      </Card>
    </Grid>

    </ClickAwayListener>

    );
  }
}


// Beginning of hidden FAB buttons.

const Child = (props) => (
  

  <Grid container className="fab"> 
  
  <Grid item xs={4}>
    <Fab onClick={() => {
      props.props.updatedWeekly(props.props.index, props.newState)
      props.notEditMode();
      props.hideIcons()

      } } size="small" id="saveButton" aria-label="Check" color='secondary'>
      <Icon  fontSize="small">check_icon</Icon> 
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab onClick={() => {props.editMode()}} size="small" id="editButton" aria-label="Edit" color='primary'>
      <Icon  fontSize="small">edit_icon</Icon>
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab onClick={() => {
      props.props.deleteWeekly(props.props.index)
      props.hideIcons()
      }} size="small" id="deleteButton" aria-label="Delete">
      <Icon  fontSize="small">delete_icon</Icon>
    </Fab>
  </Grid>

  </Grid>
)

// End of hidden FAB buttons.

WeeklyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeeklyCard);