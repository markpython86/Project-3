import React, { Component } from 'react'
import API from "../utils/API";
import {tryConnect, getUserProfile, getDailies} from '../actions';


class dailyPage extends Component {
  constructor(){
    super();
    this.state = {
      dailies: []
    }
  }
  // state = {

  // }

     
      // load the daily, weekly, or monthlies
      componentDidMount() {
        this.loadDailies();
      };
    
      //function to load them and set state of daily ,weekly, or monthly
      loadDailies() {
        API.getDailies()
          .then(res => {
            this.setState({ dailies: res.data })
             console.log(res.data)
             console.log('dailies from updated state',this.state.dailies)
             })
          .catch(err => console.log(err));
      };

  render() {
    return (
      <div>
        daily page

        <div>{this.state.dailies.map((person, index) => (
        <div key={index}>
        <ol>
          <li>_id: {person._id}</li>
          <li>Highlights: {person.highlights}</li>
          <li>positive: {person.positive}</li>
          <li>negative: {person.negative}</li>
          <li>wakeup: {person.wakeup}</li>
          <li>sleep: {person.sleep}</li>
        </ol>
        
        </div>
    ))}</div>
        {/* <p>{this.state.dailies._id}</p> */}
      </div>
    )
  }
}

export default dailyPage;
