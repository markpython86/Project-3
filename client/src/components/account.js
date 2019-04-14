// Leave this as a separate account settings page?

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {tryConnect, getUserProfile, updateUserProfile} from '../actions';
import CenterCard363 from './centerCard363';
import IconButton from "@material-ui/core/IconButton";
import {Edit} from '@material-ui/icons';
import "./account.css";
import Wrapper from "../pages/Grid/Wrapper";
import Container from "../pages/Grid/Container";
import Palette from "../pages/Grid/Palette";
import { Grid } from "@material-ui/core";
import API from "../utils/API";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
  const { classes, state, getHabitStats } = props;
  // const getHabitStats = props.getHabitStats;

  // function stats(obj, type) {
  //   let results = [];

  //   let search = search;

  //   for (var i = 0; i < obj.length; i++) {
  //     for (key in obj[i]) {
  //       if (obj[i][key].indexOf(search) != -1) {
  //         results.push(obj[i]);
  //       }
  //     }
  //   } return results

  // }

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
                      <br></br>
                      <Typography
                        component="span"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Total Number of Daily Habits:   {getHabitStats(state.daily)}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              

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
                        Total Number of Monthly Entries:{" "}
                        {state.monthly.length}
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
      monthly: []
    };
  }
  componentDidMount() {
    this.props.tryConnect();
    this.props.getUserProfile();
    this.loadDaily();
    // this.loadWeekly();
  }

  loadDaily = () => {
    API.getDailies()
      .then(res => {
        this.setState({
          daily: res.data.daily,
          weekly: res.data.weekly,
          monthly: res.data.monthly,
        });
      })
      .catch(err => console.log(err));
  };



      
   
  getHabitStats(array) {
    let value = [];

    for (let i = 0; i < array.length; i ++) {
      if (array[i].habit1 !== "") {
        value.push(array[i].habit1);
      }
      if (array[i].habit2 !== "") {
        value.push(array[i].habit2);
      }
      if (array[i].habit3 !== "") {
        value.push(array[i].habit3);
      }
      return (value.length)


    }
  }


  render() {
    let { status, profile,  } = this.props;
    return (
      <Palette>
        <Wrapper>
          <div className="row">
            <CenterCard363>
              <div className="card border-secondary">
                <h4 className="card-header">Account Information</h4>
                <div className="card-body">
                  {/* <p className="text-muted">Server status: {status} ☀</p> */}
                  {profile && this.renderProfileForm()}
                </div>
              </div>
            </CenterCard363>
          </div>

          <div className="row">
            <StatList
              state={this.state}
              getHabitStats={this.getHabitStats}
            />
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
                  <Button disabled={!dirty} type="submit" variant="contained" color="primary" className="button" >Save Change</Button>

                  <Button disabled={submitting} variant="contained" color="primary" className="button"  onClick={this.cancelForm.bind(this)}>Cancel</Button>
      </div>
      );
    } else {
      return (
        // <button
        //   className="btn btn-light btn-lg btn-block"
        //   onClick={this.switchEditting.bind(this)}
        // >
        <Button variant="contained" color="primary" className="marginButton" onClick={this.switchEditing.bind(this)}>Update Information</Button>
        // </button>
      );
    }

    //     if(this.state.editing){
    //   return (<div className="form-group margin">
    //     <Button disabled={!dirty} type="submit" variant="contained" color="primary" className="button" >Save Change</Button>
    //     <Button disabled={submitting} variant="contained" color="primary" className="button"  onClick={this.cancelForm.bind(this)}>Cancel</Button>
    //   </div>)
    // }else{
    //   return (<Button variant="contained" color="primary" className="button" onClick={this.switchEditing.bind(this)}>Update Information</Button>)
    // }
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