// Leave this as a separate account settings page?

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {tryConnect, getUserProfile, updateUserProfile} from '../actions';
import CenterCard363 from './centerCard363';
import IconButton from "@material-ui/core/IconButton";
import {Edit} from '@material-ui/icons';
import "./account.css";
import Palette from "../pages/Grid/Palette";

class Account extends Component {
  constructor(){
    super();
    this.state = {
      editing: false
    }
  }
  componentWillMount() {
    this.props.tryConnect();
    this.props.getUserProfile();
  }
  render() {
    let {status, profile} = this.props;
    return (
      <Palette>
        <CenterCard363>
          <div className="card border-secondary">
            <h4 className="card-header">Account Information</h4>
            <div className="card-body">
              {/* <p className="text-muted">Server status: {status} ☀</p> */}
              {profile && this.renderProfileForm()}
            </div>
          </div>
        </CenterCard363>
      </Palette>
    );
  }
  handleFormSubmit(d){
    this.props.updateUserProfile(d)
  }
  switchEditing() {
    this.setState({editing: !this.state.editing})
  }
  cancelForm(){
    this.switchEditing();
    this.props.reset();
  }
  renderButtons() {
    const {submitting, dirty} = this.props;
    if(this.state.editing){
      return (
        <div className="form-group margin">
          <IconButton
            disabled={!dirty}
            type="submit"
            className="btn-lg btn btn-light btn-block"
          >
            Save Change
          </IconButton>
          <button
            disabled={submitting}
            className="btn-lg btn btn-secondary btn-block"
            onClick={this.cancelForm.bind(this)}
          >
            Cancel
          </button>
        </div>
      );
    }else{
      return (
        // <button
        //   className="btn btn-light btn-lg btn-block"
        //   onClick={this.switchEditting.bind(this)}
        // >
          <IconButton
            onClick={this.switchEditing.bind(this)}
            color="inherit"
          >
            <Edit />
          </IconButton>
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
  renderProfileForm(){
    const {editing} = this.state;
    const {handleSubmit, dirty, updateProfileFailMsg} = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <div className="form-group margin">
          <label>First Name:</label>
          <Field
            disabled={!editing}
            type= 'text'
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
          type= 'text'
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
            type= 'email'
            name="email"
            component="input"
            className="input form-control form-control-lg"
            placeholder="sample@email.com"
            required
            />
      </div>
      {dirty && <div className="form-group margin">
        <label>Password:</label>
        <Field
          type= 'password'
          name="password"
          component="input"
          className={(updateProfileFailMsg)?"input form-control form-control-lg is-invalid":"input form-control form-control-lg"}
          placeholder="your password"
          required
        />
        {(updateProfileFailMsg) && <div className="invalid-feedback">
          {updateProfileFailMsg}
        </div>}
      </div>}
      <div style={{'paddingTop': '30px'}}>
        {this.renderButtons()}
      </div>
    </form>);
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