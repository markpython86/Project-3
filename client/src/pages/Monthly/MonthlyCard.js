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
 
import "./MonthlyCard.css";

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



class MonthlyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      remember: '',
      start: '',
      stop: '',
      selectedDate: '',
      monthAt: '',
      habits: '',
      isInEditMode: false
    };
  }

  notEditMode = () => {
    this.setState({
      isInEditMode: false,
      })
  }

  handleChangeRemember = remember => event => {
    this.setState({ [remember]: event.target.value});
  };

  handleChangeStart = start => event => {
    this.setState({ [start]: event.target.value });
  };

  handleChangeStop = stop => event => {
    this.setState({ [stop]: event.target.value });
  };

  

  editMode = () =>{
    
    this.setState({
      remember: this.props.remember,
      start: this.props.start,
      stop: this.props.stop,
      isInEditMode: true,

      
    })
  }


  toggleHidden = () => {
    this.setState({
      isHidden: false,
    })
  }

  hideIcons = () =>{
    this.setState({
      isHidden: true,
    });
  }

  loadMonthlies = () => {
    this.props.loadMonthlies()
  }
  deleteMonthly = (id) => {
    this.props.deleteMonthly(id)
  }

  handleClickAway = () => {
    if (!this.state.isInEditMode){
    this.setState({
      isHidden: true,
    });
    }
  };

  render() {
    const {
      props,
    } = this;
    const { classes } = props;
    const habits = props.updates.habits.filter(String);
    const monthAt = props.updates.monthAt
    const newState = {
      remember: this.state.remember,
      start: this.state.start,
      stop: this.state.stop,
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
    
    // It should go something like this: 
    var habitCounter = compressArray(habits);



    return (

      <ClickAwayListener onClickAway={this.handleClickAway}>

      <Grid item>
  {!this.state.isHidden && <Child props={props} editMode={this.editMode} loadMonthlies={this.loadMonthlies} notEditMode={this.notEditMode} deleteMonthly={this.deleteMonthly} hideIcons={this.hideIcons} newState={newState}  />}

      <Card onClick={this.toggleHidden.bind(this)} className={classes.root} id="card">
        <CardContent className={classes.root}>
          
  
{/* Begginning of time section. */}
          <Grid container spacing={0} id="header">
            <Grid item xs={4} >
            <Typography className="headerText" variant="h6">
                {monthAt}
              </Typography>
            </Grid>


            <Grid item xs={8}>
              <Typography className="headerText" variant="h6">
                Monthly Summary
              </Typography>
            </Grid>

          </Grid>
  
  {/* End of time section. */}



  {/* Beginning of weekly three. */}
{!this.state.isInEditMode ? 
      <form  noValidate autoComplete="off" id="textSection">
      
        <Grid container alignItems="center">
          <Grid item id="textIcon">
            <Icon>history</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Remember"
            placeholder="What do I want to remember?"
            multiline
            onChange={this.handleChangeRemember}
            className={classes.textField}
            margin="normal"
            // disableUnderline
            disabled
            value={props.remember}
            onChange={this.handleChangeRemember('remember')}
            />
           
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>timer</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Start"
            placeholder="What do I want to start doing?"
            multiline
            onChange={this.handleChangeStart}
            className={classes.textField}
            margin="normal"
            disabled
            value={props.start}
            onChange={this.handleChangeStart('start')}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>not_interested</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Stop"
            placeholder="What do I want to stop doing?"
            multiline
            onChange={this.handleChangeStop}
            className={classes.textField}
            margin="normal"
            disabled
            value={props.stop}
            onChange={this.handleChangeStop('stop')}
            />
            
          </Grid>
        </Grid>
       

      </form>
      :
      <form  noValidate autoComplete="off" id="textSection">
      
        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>history</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Remember"
            placeholder="What do I want to remember?"
            multiline
            onChange={this.handleChangeRemember}
            className={classes.textField}
            margin="normal"
            value={this.state.remember}
            onChange={this.handleChangeRemember('remember')}
            />
           
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>timer</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Start"
            placeholder="What do I want to start doing?"
            multiline
            onChange={this.handleChangeStart}
            className={classes.textField}
            margin="normal"
            value={this.state.start}
            onChange={this.handleChangeStart('start')}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center">
          <Grid item id="textIcon">
          <Icon>not_interested</Icon>
          </Grid>
          <Grid item>
            <TextField
            id="standard-textarea"
            label="Stop"
            placeholder="What do I want to stop doing?"
            multiline
            onChange={this.handleChangeStop}
            className={classes.textField}
            margin="normal"
            value={this.state.stop}
            onChange={this.handleChangeStop('stop')}
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
      props.props.updatedMonthly(props.props.index, props.newState)
      props.notEditMode();
      props.hideIcons()

    
    }} size="small" id="saveButton" aria-label="Check" color='secondary'>
      <Icon  fontSize="small">check_icon</Icon> 
      {/* props.props.updatedDaily(props.props.index, ) */}
      {/* props.props.updatedDaily(props.props.index, {props.newState.}) */}
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab onClick={() => {props.editMode()}} size="small" id="editButton" aria-label="Edit" color='primary'>
      <Icon  fontSize="small">edit_icon</Icon>
    </Fab>
  </Grid>

  <Grid item xs={4}>
    <Fab   onClick={() => {
      props.props.deleteMonthly(props.props.index)
      props.hideIcons()
      }} size="small" id="deleteButton" aria-label="Delete">
      <Icon  fontSize="small">delete_icon</Icon>
    </Fab>
  </Grid>

  </Grid>
)

// End of hidden FAB buttons.

MonthlyCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MonthlyCard);