import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import API from "../../utils/API";
import {tryConnect, getUserProfile, getDailies} from "../../actions";

import Wrapper from "../Grid/Wrapper";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import Nav from "../Nav/Nav";
import DailyCard from "../Daily/DailyCard";


class App extends Component {

  constructor() {
    super();
    this.state = {
      dailies: []
    }
  }
  // 

  componentDidMount() {
    // this.props.tryConnect();
    this.loadDailies();
  };

  //function to load them and set state of daily ,weekly, or monthly
  loadDailies() {
    API.getDailies()
      .then(res => {
        this.setState({ dailies: res.data })
        // console.log(this.props)
        console.log('dailies from updated state', this.state.dailies)
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Wrapper>
        <Nav />
        <div id="sectionWrapper">
        <form action="/daily/new" method="POST">
          First name:<br/>
          <input type="text" name="highlight"/>
          <br/>
          Last name:<br/>
          <input type="text" name="pos"/>
          <br/>
          Last name:<br/>
          <input type="text" name="neg"/><br/>
          Last name:<br/>
          <input type="text" name="wake"/><br/>
          Last name:<br/>
          <input type="text" name="sleep"/><br/>
          <input type="submit" value="Submit"/>
        </form> 
          <Container spacing="16">
            {this.state.dailies.map((person, index) => (
              <Item xs='12' sm='3'>
                <DailyCard
                  key={person._id}
                  Highlights={person.highlights}
                  positive={person.positive}
                  negative={person.negative}
                  wakeup={person.wakeup}
                  sleep={person.sleep}
                />
              </Item>
              
            ))}
            <Item xs='12' sm='3'>
                
              </Item>
          </Container>
        </div>
      </Wrapper>
    )
  }
}


export default App;