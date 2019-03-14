import React, { Component } from 'react'
import API from "../utils/API";
import {tryConnect, getUserProfile} from '../actions';


class dailyPage extends Component {
  constructor(){
    super();
    this.state = {
      dailies: []
    }
  }

      // componentWillMount(){
      //   this.props.tryConnect(),
      //   this.props.getUserProfile();
      // };
      // load the daily, weekly, or monthlies
      componentDidMount() {
        this.loadDailies();
      };
    
      // function to load them and set state of daily ,weekly, or monthly
      loadDailies() {
        API.getDailies()
          .then(res => this.setState({ dailies: res.data }))
          .catch(err => console.log(err));
      };

  render() {
    return (
      <div>
        daily page
        <p>{this.state.dailies.highlights}</p>
      </div>
    )
  }
}

export default dailyPage;
