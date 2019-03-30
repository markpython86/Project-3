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
      value: "initial value",
      
    }
  }


  componentDidMount() {
    
    // this.props.tryConnect();
    this.loadWeeklies();
    console.log(this.state.weeklies)
  }




  //edit section==========================================================
  //function to load them and set state of daily ,weekly, or monthly
  loadWeeklies() {
    API.getWeeklies()
      .then(res => {
        console.log(res.data)
        this.setState({ weeklies: res.data.weekly })
        console.log('weeklies from updated state', res.data)
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
      this.props.postWeekly(data)
        
    };


  render() {
    const {handleSubmit} = this.props;
    return (
      <Palette>
      <Nav />
      <Wrapper>
        <Container spacing="32">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="best"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="worst"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="next week"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    
                
          <button type="submit">Post Up</button>
        </form> 
        
        
          <Container spacing="16">

          {/* // Add edit button to this page
          // Add onClick to button to change to edit mode */}
          {/* Whatever submit button is used we need to add the onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} */}

            {this.state.weeklies.map((person, index) => (
              <Item xs='12' sm='3'>
              

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
      <FAB />
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