import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import API from "../../utils/API";
import { postWeekly} from "../../actions";
import Wrapper from "../Grid/Wrapper";
import FAB from "../FAB/FAB";
import Palette from "../Grid/Palette";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import Nav from "../../components/Nav";
import WeeklyCard from "../Weekly/WeeklyCard";



class App extends Component {

  constructor() {
    super();
    this.state = {
      weeklies: [],
    //   value: "initial value",
      
    }
  }


  componentDidMount() {
    this.loadWeeklies();
  }




  //edit section==========================================================
  //function to load them and set state of daily ,weekly, or monthly
  loadWeeklies() {
    API.getWeeklies()
      .then(res => {
        this.setState({ weeklies: res.data.weekly })
      })
      .catch(err => console.log(err));
  }

  deleteWeeklies(id){
    API.deleteWeekly(id)
     .then(()=>  window.location.reload(true))
      .catch(err => console.log(err));
  };
  updateWeeklies(id, update) {
      API.updateWeekly(id, update)
      .then(()=>  window.location.reload(true))
      .catch(err => console.log(err));
  }; 

    handleFormSubmit(data) {
        API.saveWeekly(data)
        .then(()=>  window.location.reload(true))
        .catch(err => console.log(err));        
    };


  render() {
    const {handleSubmit} = this.props;
    return (
      <Palette>
      <Wrapper>
        <Container spacing="0">
        
          <Container spacing="16">

            {this.state.weeklies.map((person, index) => (
              <Item xs='12' sm='3'key={person._id}>
              
                <WeeklyCard 
                  key={person._id}
                  index={person._id}
                  deleteWeekly = {this.deleteWeeklies}
                  updatedWeekly={this.updateWeeklies}
                  preUpdate={this.updateWeeklies}
                  updates={person}
                  best={person.best}
                  worst={person.worst}
                  nextWeek={person.nextWeek}
                />
              
              </Item>
              
            ))}
            <Item xs='12' sm='3'>
                
              </Item>
          </Container>
          </Container>
      <FAB page="weekly" submit={this.handleFormSubmit} />
      </Wrapper>
      </Palette>
    )
  }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}


export default connect(mapStateToProps,{ postWeekly })(reduxForm({
    form: 'postWeekly'
})(App));