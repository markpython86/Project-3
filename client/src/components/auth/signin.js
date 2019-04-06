import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import {signUserIn} from '../../actions';
import CenterCard363 from '../centerCard363';
import Button from '@material-ui/core/Button';
import Palette from '../../pages/Grid/Palette'
import './style.css';

class Signin extends Component {
  
    renderAlert(){
        if(this.props.errorMsg) {
            return (
                <div className="alert alert-warning">
                    <strong>Oops! </strong>{this.props.errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit(d) {
        this.props.signUserIn(d)
    }
    render() {
        const {handleSubmit} = this.props;
        return (
                <Palette>
                <CenterCard363>
                    <div className='card-wrapper'>
                      <div className='card'>
                        <h3 id="loginHeader">
                            Login to Minimalist
                        </h3>
                        <div className="card-body">
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <div className="form-group">
                                {/* <label>Email:</label> */}
                                {/* <Field
                                    type= 'email'
                                    name="email"
                                    component="input"
                                    className="form-control form-control-lg"
                                    placeholder="your email"
                                    required
                                    /> */}
                                  <Field
                                    type= 'email'
                                    name="email"
                                    component="input"
                                    className="input form-control form-control-lg"
                                    placeholder="Email"
                                    required
                                    // inputProps={{
                                    // 'aria-label': 'Description',
                                    // }}
                                  />
                            </div>

                            <div className="form-group">
                                {/* <label>Password:</label> */}
                                <Field
                                    type= 'password'
                                    name="password"
                                    component="input"
                                    className=" input form-control form-control-lg"
                                    placeholder="Password"
                                    required
                                    // inputProps={{
                                    //   'aria-label': 'Description',
                                    //   }}
                                    />
                            </div>
                            {this.renderAlert()}
                            <div>
                                <Button type="submit" variant="contained" color="primary" className="button" >Sign in</Button>
                            </div>
                        </form>
                        </div>
                      </div>
                    </div>
                </CenterCard363>
                </Palette>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}

export default connect(mapStateToProps, {signUserIn})(reduxForm({
    form: 'signin'
})(Signin));