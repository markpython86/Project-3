import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Paper from '@material-ui/core/Paper';
import Palette from '../../pages/Grid/Palette'
import './style.css';


class Signout extends Component {
    componentDidMount() {
        this.props.signUserOut()
    }
    render() {
        return (
            <Palette>
                <div className="bye">
                    <h1>See you tomorrow.</h1>
                    <br></br>
                    {/* <h3>You made today a mimimalist day. Keep it up! </h3>
                    <br></br>
                    <h3>You're logged out and good to go.</h3>
                    <br></br>
                    <h3>See you next time.</h3> */}

                    <img id="logo" src="../utils/favicon/ML3.png"/>
                    <h3>Minimalist</h3>

                </div>

               
            </Palette>
        );
    }
}

export default connect(null, actions)(Signout)