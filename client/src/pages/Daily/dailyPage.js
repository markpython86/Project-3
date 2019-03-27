import React, { Component } from "react";
// import "./App.css";
// import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import API from "../../utils/API";
import {tryConnect, getUserProfile, getDailies,postDaily} from "../../actions";
// import postDaily from '../../actions/index'
import Wrapper from "../Grid/Wrapper";
import FAB from "../FAB/FAB";
import Palette from "../Grid/Palette";
import Container from "../Grid/Container";
import Item from "../Grid/Item";
import Nav from "../../components/Nav/";
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
  }

  //function to load them and set state of daily ,weekly, or monthly
  loadDailies() {
    API.getDailies()
      .then(res => {
        this.setState({ dailies: res.data })
        // console.log(this.props)
        console.log('dailies from updated state', this.state.dailies)
      })
      .catch(err => console.log(err));
  }

    handleFormSubmit(data) {
       
       this.props.postDaily(data)
        
    }

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


export default connect(mapStateToProps,{postDaily})(reduxForm({
    form: 'postDaily'
})(App));