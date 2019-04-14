import axios from 'axios';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    TRY_CONNECT,
    GET_USER_PROFILE,
    GET_USER_DAILY,
    UPDATE_USER_PROFILE_GOOD,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_DAILY_GOOD,
    UPDATE_DAILY_FAIL,
    UPDATE_MONTHLY_GOOD,
    UPDATE_MONTHLY_FAIL,
} from './types';
const ROOT_URL = process.env.API_URI || 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('auth_jwt_token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function signUserIn(data) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signin`, data)
            .then(res => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('auth_jwt_token', res.data.token);
                //==================== change this window location to daily================================
                window.location = '/#daily';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function signUserUp(userObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/signup`, userObj)
            .then(res => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('auth_jwt_token', res.data.token);
                //==================== change this window location to daily================================
                window.location = '/#daily';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function signUserOut() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER })
        localStorage.removeItem('auth_jwt_token');
    }
}

export function tryConnect() {
    return function (dispatch) {
        axios
            .get(`/api`)
            .then(res => {
                dispatch({
                    type: TRY_CONNECT,
                    payload: res.data
                })
            })
            .catch(error => console.log(error.response.data));
    }
}
export function getUserProfile() {
    return function (dispatch) {
        axios
            .get(`/api/userProfile`)
            .then(res => {

                window.location = '/#account';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
                dispatch({
                    type: GET_USER_PROFILE,
                    payload: res.data
                })
            })
            .catch(error => console.log(error.response.data));
    }
}

export function updateUserProfile(profile) {
    return function (dispatch) {
        axios
            .post(`/api/userProfile`, profile)
            .then(() => {
                dispatch({
                    type: UPDATE_USER_PROFILE_GOOD
                })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error.response.data)
                if (error.response.data == "Incorrect Password") {
                    dispatch({
                        type: UPDATE_USER_PROFILE_FAIL,
                        payload: "Incorrect Password. Please try it again."
                    })
                }
            });
    }
}

export function getDailies() {
    return function (dispatch) {
        axios
            .get(`/api/daily`)
            .then(res => {

                window.location = '/#daily';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
                dispatch({
                    type: GET_USER_DAILY,
                    payload: res.data
                })
            })
            .catch(error => console.log(error));
    }
}

export function postDaily(dailyObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/daily/new`, dailyObj)
            .then(() => {
                dispatch({ type: AUTH_USER })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function deleteDaily(dailyID) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .delete(`/api/daily/${dailyID}`)
            .then(() => {
                window.location.reload(true);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function updateDaily(id, update) {
    return function (dispatch) {
        axios
            .put(`/api/daily/${id}`, update)
            .then(() => {
                dispatch({
                    type: UPDATE_DAILY_GOOD
                })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: UPDATE_DAILY_FAIL
                })
            });
    }
}

// Weekly Functions

export function getWeeklies() {
    return function (dispatch) {
        axios
            .get(`/api/weekly`)
            .then(res => {

                window.location = '/#weekly';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
                dispatch({
                    type: GET_USER_WEEKLY,
                    payload: res.data
                })
            })
            .catch(error => console.log(error));
    }
}

export function postWeekly(weeklyObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/weekly/new`, weeklyObj)
            .then(() => {
                dispatch({ type: AUTH_USER })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function deleteWeekly(weeklyID) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .delete(`/api/weekly/${weeklyID}`)
            .then(() => {
                window.location.reload(true);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function updateWeekly(id, update) {
    return function (dispatch) {
        axios
            .put(`/api/weekly/${id}`, update)
            .then(() => {
                dispatch({
                    type: UPDATE_WEEKLY_GOOD
                })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: UPDATE_WEEKLY_FAIL
                })
            });
    }
}

//-------------------------------------------------------------
export function getMonthlies() {
    return function (dispatch) {
        axios
            .get(`/api/monthly`)
            .then(res => {

                window.location = '/#monthly';
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
                dispatch({
                    type: GET_USER_MONTHLY,
                    payload: res.data
                })
            })
            .catch(error => console.log(error));
    }
}

export function postMonthly(monthlyObj) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/monthly/new`, monthlyObj)
            .then(() => {
                dispatch({ type: AUTH_USER })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function deleteMonthly(monthlyID) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .delete(`/api/monthly/${monthlyID}`)
            .then(() => {
                window.location.reload(true);
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_jwt_token');
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: AUTH_ERROR, payload: 'Server Error, try later.' })
            });
    }
}

export function updateMonthly(id, update) {
    return function (dispatch) {
        axios
            .put(`/api/monthly/${id}`, update)
            .then(() => {
                dispatch({
                    type: UPDATE_MONTHLY_GOOD
                })
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: UPDATE_MONTHLY_FAIL
                })
            });
    }
}