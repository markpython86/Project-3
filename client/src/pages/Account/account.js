// Leave this as a separate account settings page?

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {tryConnect, getUserProfile, updateUserProfile} from '../../actions';
import CenterCard363 from '../../components/centerCard363';
import "./account.css";
import Wrapper from "../Grid/Wrapper";
import Palette from "../Grid/Palette";
import API from "../../utils/API";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Table from './table'
import MaterialTable from "material-table";
import { Flag, ArrowUpward, ArrowDownward, AlarmOn, AccessibilityNew, Book, Build, Code, EventSeat, Explore, Motorcycle, Pets, QuestionAnswer, Rowing, ShoppingCart, Search, Today, SwapVert, WatchLater, Work, Mic, Movie, Call, Email, SentimentSatisfied, Waves, Weekend, AttachMoney, Headset, ColorLens, Brush, Camera, Edit, Landscape, LinkedCamera, Timer, DirectionsBike, DirectionsBus, DirectionsCar, DirectionsRun, DirectionsRailway, LocalLaundryService, LocalActivity, LocalAtm, LocalBar, LocalCafe, LocalCarWash, LocalDining, LocalDrink, LocalHotel, ChildFriendly, Pool, Spa, SmokeFree, FreeBreakfast, GolfCourse, Casino, FitnessCenter, Kitchen, School, LocalLibrary, Watch, } from '@material-ui/icons/';


const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 500,
    // backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});

function AlignItemsList(props) {
  const { classes, state} = props;

  return (
    <div className="card">
      <div className="row">
        <div className="col-sm-8 col-md-6">
          <List className={classes.root}>
            <div className="card-header">
              <h4>Account Statistics</h4>
            </div>
            <div className="card-body">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Daily" src="../utils/images/dailyIcon.png" />
                </ListItemAvatar>
                <ListItemText
                  primary="Daily"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Total Number of Daily Entries: {state.daily.length}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Total Number of Daily Habits: {state.allHabits.length}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" light={true} />

              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Weekly" src="../utils/images/weeklyIcon.png" />
                </ListItemAvatar>
                <ListItemText
                  primary="Weekly"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Total Number of Weekly Entries: {state.weekly.length}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="middle" light={true} />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Monthly"
                    src="../utils/images/monthlyIcon.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Monthly"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Total Number of Monthly Entries:{state.monthly.length}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          </List>
        </div>
      </div>
    </div>
  );
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StatList = withStyles(styles)(AlignItemsList);




class Account extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      daily: [],
      weekly: [],
      monthly: [],
      dailyTable: [],
      allHabits: []
    };
  }

  componentWillMount() {
    this.props.tryConnect();
    this.props.getUserProfile();
    this.loadDaily();
    this.loadWeeklies();
  }

  loadDaily = () => {
    API.getDailies()
      .then(res => {
        this.setState({
          daily: res.data.daily,
          // weekly: res.data.weekly,
          // monthly: res.data.monthly
        });
        console.log("DAILY")
        console.log(this.state.daily);
        // this.getArray();
      })
      .catch(err => console.log(err));
  };

  loadWeeklies = () => {
    API.getWeeklies()
      .then(res => {
        this.setState({
          weekly: res.data.weekly,
        });
        console.log("WEEKLY ");
        console.log(this.state.weekly);
        this.getArray();

      })
      .catch(err => console.log(err));
  };

  getArray = () => {
    let dailyArray = [];
    let weeklyArray = [];
    let monthlyArray = [];

    this.state.daily.map((item, index) => {
      dailyArray.push({
        _id: item._id,
        selectedDate: item.selectedDate,
        highlights: item.highlights,
        positive: item.positive,
        negative: item.negative,
        wakeup: item.wakeup,
        sleep: item.sleep,
        habits: item.habit1 + item.habit2 + item.habit3
      });
    });

    this.state.weekly.map((item, index) => {
      weeklyArray.push({
        _id: item._id,
        best: item.best,
        worst: item.worst,
        nextWeek: item.nextWeek,
        habits: item.habits,
        week: item.week,
        weekEnd: item.weekEnd,
        weekStart: item.weekStart,
        year: item.year
      });
    });
    console.log(weeklyArray);

    return this.setState({
      dailyTable: dailyArray,
      weeklyTable: weeklyArray
      // monthlyTable: monthlyArray
    });
  };

  render() {
    let { status, profile } = this.props;

    return (
      <Palette>
        <Wrapper>
          <div className="row">
            <CenterCard363>
              <div className="card border-secondary">
                <h4 className="card-header">Account Information</h4>
                <div className="card-body">
                  {profile && this.renderProfileForm()}
                </div>
              </div>
            </CenterCard363>
          </div>

          <div className="row">
            <StatList state={this.state} />
          </div>

          <div className="row">
            <div className="table">
              <MaterialTable
                columns={[
                  { title: "Entries", field: "_id", hidden: true },
                  { title: "Date", field: "selectedDate" },
                  { title: "Highlights", field: "highlights" },
                  { title: "Positive", field: "positive" },
                  { title: "Negative", field: "negative" },
                  { title: "Wake Up", field: "wakeup" },
                  { title: "Sleep", field: "sleep" },
                  { title: "Habits", field: "habits" }
                ]}
                data={this.state.dailyTable}
                title="Daily Statistics"
              />
            </div>
          </div>

          <div className="row">
            <div className="table">
              <MaterialTable
                columns={[
                  { title: "Entries", field: "_id", hidden: true },
                  { title: "Year", field: "year" },
                  { title: "Week Start", field: "weekStart" },
                  { title: "Week End", field: "weekEnd" },
                  { title: "Best of the Week", field: "best" },
                  { title: "Worst of the Week", field: "worst" },
                  { title: "Goal for Next Week", field: "nextWeek" },
                  { title: "Habits", field: "habits" }
                ]}
                data={this.state.weeklyTable}
                title="Weekly Statistics"
              />
            </div>
          </div>
        </Wrapper>
      </Palette>
    );
  }
  handleFormSubmit(d) {
    this.props.updateUserProfile(d);
  }
  switchEditing() {
    this.setState({ editing: !this.state.editing });
  }
  cancelForm() {
    this.switchEditing();
    this.props.reset();
  }
  renderButtons() {
    const { submitting, dirty } = this.props;
    if (this.state.editing) {
      return (
        <div className="form-group marginButton">
          <Button
            disabled={!dirty}
            type="submit"
            variant="contained"
            color="primary"
            className="button"
          >
            Save Change
          </Button>

          <Button
            disabled={submitting}
            variant="contained"
            color="primary"
            className="button"
            onClick={this.cancelForm.bind(this)}
          >
            Cancel
          </Button>
        </div>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          className="marginButton"
          onClick={this.switchEditing.bind(this)}
        >
          Update Information
        </Button>

      );
    }

  }
  renderProfileForm() {
    const { editing } = this.state;
    const { handleSubmit, dirty, updateProfileFailMsg } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group margin">
          <label>First Name:</label>
          <Field
            disabled={!editing}
            type="text"
            name="firstName"
            component="input"
            className=" input form-control form-control-lg"
            placeholder="First Name"
            required
          />
        </div>

        <div className="form-group margin">
          <label>Last Name:</label>
          <Field
            disabled={!editing}
            type="text"
            name="lastName"
            component="input"
            className="input form-control form-control-lg"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="form-group margin">
          <label>Email:</label>
          <Field
            disabled
            readOnly
            type="email"
            name="email"
            component="input"
            className="input form-control form-control-lg"
            placeholder="sample@email.com"
            required
          />
        </div>
        {dirty && (
          <div className="form-group margin">
            <label>Password:</label>
            <Field
              type="password"
              name="password"
              component="input"
              className={
                updateProfileFailMsg
                  ? "input form-control form-control-lg is-invalid"
                  : "input form-control form-control-lg"
              }
              placeholder="your password"
              required
            />
            {updateProfileFailMsg && (
              <div className="invalid-feedback">{updateProfileFailMsg}</div>
            )}
          </div>
        )}
        <div style={{ paddingTop: "30px" }}>{this.renderButtons()}</div>
      </form>
    );
  }
}

function mapStateToProps({auth, user}) {
  return user.profile?{
      status: auth.status,
      profile: user.profile,
      initialValues: {
        email: user.profile.email,
        firstName: user.profile.name.first,
        lastName: user.profile.name.last
      },
      updateProfileFailMsg: user.updateProfileFailMsg
  }:{
    status: auth.status,
    profile: user.profile
  }
}


export default connect(mapStateToProps, {tryConnect, getUserProfile, updateUserProfile})(reduxForm({
  form: 'profileUpdate',
})(Account));