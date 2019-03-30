import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import API from "../../utils/API";
import { postDaily} from "../../actions";
// import postDaily from '../../actions/index'
import Wrapper from "../Grid/Wrapper";
import FAB from "../FAB/FAB";
import Palette from "../Grid/Palette";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import MenuAppBar from "../../components/Nav/";
import DailyCard from "../Daily/DailyCard";


class App extends Component {

  constructor() {
    super();
    this.state = {
      dailies: [],
      value: "initial value",
      
    }
  }


  componentDidMount() {
    
    // this.props.tryConnect();
    this.loadDailies();
  }




  //edit section==========================================================
  //function to load them and set state of daily ,weekly, or monthly
  loadDailies() {
    API.getDailies()
      .then(res => {
        
        this.setState({ dailies: res.data.daily })
        console.log('dailies from updated state', res.data)
      })
      .catch(err => console.log(err));
  }

  deleteDailies(id){
    // this.props.deleteDaily(id)
    console.log(id)
    API.deleteDaily(id)
     .then(()=>  window.location.reload(true))
      .catch(err => console.log(err));
  };
  updateDailies(id, update) {
      API.updateDaily(id, update)
      .then(()=>  window.location.reload(true))
      .catch(err => console.log(err));
  }; 

    handleFormSubmit(data) {
       console.log('data',data)
      //  console.log("props",props)
      API.saveDaily(data)
      .then(()=>  window.location.reload(true))
      .catch(err => console.log(err));

      //  this.props.postDaily(data)
        
    };


  render() {
    const {handleSubmit} = this.props;
    return (
      <Palette>
      <MenuAppBar />
      <Wrapper>
        <Container spacing="32">
        <form >
          <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="highlight"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="pos"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="neg"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="wake"
                            type='text'
                            component="input"
                            className="form-control form-control-lg"
                            placeholder="First Name"
                            required/>
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <Field
                            name="sleep"
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

            {this.state.dailies.map((person, index) => (
              <Item xs='12' sm='3'>
              

                <DailyCard 
                  key={person._id}
                  index={person._id}
                  deleteDaily = {this.deleteDailies}
                  updatedDaily={this.updateDailies}
                  preUpdate={this.updateDailies}
                  updates={person}
                  Highlights={person.highlights}
                  positive={person.positive}
                  negative={person.negative}
                  wakeup={person.wakeup}
                  sleep={person.sleep}
                  habit1={person.habit1}
                  habit2={person.habit2}
                  habit3={person.habit3}
                  
                />
              
              </Item>
              
            ))}
            {/* <Item xs='12' sm='3'>
                
              </Item> */}
          </Container>
          </Container>
      <FAB page="daily" submit={this.handleFormSubmit}/>
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


export default connect(mapStateToProps,{ postDaily })(reduxForm({
    form: 'postDaily'
})(App));