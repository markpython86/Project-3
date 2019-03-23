import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import API from "../../utils/API";
import {tryConnect, getUserProfile, getDailies,postDaily} from "../../actions";
// import postDaily from '../../actions/index'
import Wrapper from "../Grid/Wrapper";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import Nav from "../Nav/Nav";
import DailyCard from "../Daily/DailyCard";


class App extends Component {

  constructor() {
    super();
    this.state = {
      dailies: [],
      update: {}
    }
  }


  componentDidMount() {
    // this.props.tryConnect();
    this.loadDailies();
  };

  //function to load them and set state of daily ,weekly, or monthly
  loadDailies() {
    console.log('hello from the other side',this.state.update)
    API.getDailies()
      .then(res => {
        this.setState({ dailies: res.data })
        // console.log(this.props)
        console.log('dailies from updated state', this.state.dailies)
      })
      .catch(err => console.log(err));
  };

  updateDailies(id, update) {
    console.log("updating", id);

    // this.setState({update: "updated ass"})
   console.log("update", update)
    

  
    // API.updateDaily(id)
    //   .then(res => {
        
    //       res.send()

    //       console.log(res);
    //     // console.log(this.props)
    //   })
    //   .catch(err => console.log(err));
  }; 

    handleFormSubmit(data) {
       
       this.props.postDaily(data)
        
    }


  render() {
    const {handleSubmit} = this.props;
    return (
      <Wrapper>
        <Nav />
        <div id="sectionWrapper">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                  updatedDaily={this.updateDailies}
                  updates={person}
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

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}


export default connect(mapStateToProps,{postDaily})(reduxForm({
    form: 'postDaily'
})(App));