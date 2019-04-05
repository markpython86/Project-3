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
// import MenuAppBar from "../../components/Nav/";
import DailyCard from "../Daily/DailyCard";


class App extends Component {

  constructor() {
    super();
    this.state = {
      dailies: [],
      // value: "initial value",
      
    }
  }

  componentWillMount() {
    
    // this.props.tryConnect();
    this.loadDaily();
  }
  // componentWillMount(){
  //   this.loadDailies();
  // }


  

  loadDaily = () => {
    API.getDailies()
    .then(res => {
        console.log('ressssss', res.data.daily);
        this.setState({ dailies: res.data.daily })
        // console.log(res.data.daily)
      })
    .catch(err => console.log(err))
  }

  deleteDailies = (id) => {
    console.log('id',id)
    API.deleteDaily(id)
     .then(() => {
       this.loadDaily()
      //  setTimeout(() => {
      //    show
      //  }, 1000);
       })
      .catch(err => console.log(err));
  };
  updateDailies = (id, update) => {
    console.log('update',update)
    // console.log('old', oldValues)
    
    // this.setState({ dailies: update })
      API.updateDaily(id, update)
      .then(() => this.loadDaily())
      .catch(err => console.log(err));
  }; 

    handleFormSubmit = (data) => {
      // console.log(data)
      if(this.state.dailies.find(daily => daily.fullDate === data.fullDate)) {
        alert("OOps Daily card already exists. try to choose another date");
        // API.saveDaily(data)
        //   .then(() => this.loadDaily())
        //   .catch(err => console.log(err));


      } else {
        console.log("User doesn't exists. Show error message");
        API.saveDaily(data)
          .then(() => this.loadDaily())
          .catch(err => console.log(err));
      }
    };


  render() {
    // const {handleSubmit} = this.props;
    return (
      <Palette>
      <Wrapper>
        
          <Container spacing="16">
            {this.state.dailies.map((person, index) => (
              <Item xs='12' sm='3' key={person._id}>
              
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
                  selectedDate={person.selectedDate}
                  loadDailies={this.loadDaily}
                  
                />
              
              </Item>
              
            ))}
           
          </Container>
        
      <FAB page="daily" submit={this.handleFormSubmit} loadDailies={this.loadDaily}/>
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