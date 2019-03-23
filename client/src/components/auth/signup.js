import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {signUserUp} from '../../actions';
import CenterCard363 from '../centerCard363';
import Input from '@material-ui/core/Input';
import './style.css';


class Signup extends Component {
    renderAlert(error) {
        let errorMsg = error || this.props.errorMsg
        if (this.props.errorMsg) {
            return (
                <div className="alert alert-warning">
                    <strong>Oops!
                    </strong> {errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit(data) {
        if (data.password == data.password2) {
            this.props.signUserUp(data);
        }else{
            this.renderAlert('password does not match');
        }
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <CenterCard363>
                <div className='card-wrapper'>
                    <div className='card'>
                    <h4 className="card-header">
                        Make an Account for Minimalist
                    </h4>
                        <div className="card-body">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div className="form-group">
                            {/* <label>First name:</label> */}
                            <Input
                                name="firstName"
                                type='text'
                                component="input"
                                className="form-control form-control-lg"
                                placeholder="First Name"
                                required
                                inputProps={{
                                'aria-label': 'Description',
                                }}
                                />
                        </div>
                        <div className="form-group">
                            {/* <label>Last name:</label> */}
                            <Input
                                name="lastName"
                                type='text'
                                component="input"
                                className="form-control form-control-lg"
                                placeholder="Last Name"
                                required
                                inputProps={{
                                'aria-label': 'Description',
                                }}
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Email:</label> */}
                            <Input
                                name="email"
                                type='email'
                                component="input"
                                className="form-control form-control-lg"
                                placeholder="sample@email.com"
                                required
                                inputProps={{
                                'aria-label': 'Description',
                                }}
                            />
                        </div>
                        <div className="form-group">
                            {/* <label>Password:</label> */}
                            <Input
                                type='password'
                                name="password"
                                component="input"
                                className="form-control form-control-lg"
                                placeholder="your password"
                                required
                                inputProps={{
                                'aria-label': 'Description',
                                }}
                            />
                        </div>
                        
                        <div className="form-group">
                            {/* <label>Comfirm Password:</label> */}
                            <Input
                                type='password'
                                name="password2"
                                component="input"
                                className="form-control form-control-lg"
                                placeholder="confirm password"
                                required
                                inputProps={{
                                'aria-label': 'Description',
                                }}
                            />
                        </div>
                        {this.renderAlert()}
                        <div style={{'paddingTop': '30px'}}>
                            <button type="submit" className="btn btn-lg btn-light btn-block submit">Sign Up</button>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
            </CenterCard363>
        );
    }
}

function validate(formProps) {
    const errors = {}
    if(formProps.password !== formProps.password2){
        errors.password = 'Password must match';
    }
    return errors;
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}

export default connect(mapStateToProps, {signUserUp})(reduxForm({
    form: 'signup',
    validate 
})(Signup));