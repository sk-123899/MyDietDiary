import axios from 'axios'
import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGOUT,
    GET_PROFILE_DATA,
    UPDATE_PROFILE_DATA,
    GET_ERRORS
} from './types'


// check the token and load user

export const loadUser = () => (dispatch,getState) => {
    // user loading
    dispatch({
        type:USER_LOADING
    })
    //get token from the state

    const token = getState().auth.token

    //headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    // if token add to headers config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    axios.get('http://localhost:8000/api/auth/user',config)
        .then(res => {
            dispatch({
                type:USER_LOADED,
                payload:res.data
            })
        }).catch(err => {
            const errors = {
                msg:err.response.data,
                status:err.response.status
            }
            dispatch({
                type:GET_ERRORS,
                payload:errors
            })
        })
}


// login user
export const login = (username,password) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    // request body
    const body = JSON.stringify({username,password})

    axios.post('http://localhost:8000/api/auth/login',body,config)
        .then(res => {
            dispatch({
                type:LOGIN_SUCCESS,
                payload:res.data
            })
        }).catch(err => {
            const errors = {
                msg:err.response.data,
                status:err.response.status
            }
            dispatch({
                type:GET_ERRORS,
                payload:errors
            })
        })
}

export const register = (username,password) => dispatch => {

    //headers
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }

    // request body
    const body = JSON.stringify({username,password})

    axios.post('http://localhost:8000/api/auth/register',body,config)
        .then(res => {
            dispatch({
                type:REGISTER_SUCCESS,
                payload:res.data
            })
        }).catch(err => {
            const errors = {
                msg:err.response.data,
                status:err.response.status
            }
            dispatch({
                type:GET_ERRORS,
                payload:errors
            })
        })
}

export const logout = () => (dispatch,getState) => {
    //headers
    const config = configureConfig(getState)
    
    axios.post('http://localhost:8000/api/auth/logout',null,config)
        .then(res => {
            dispatch({
                type:LOGOUT,
                //payload:res.data
            })
        }).catch(err => {
            const errors = {
                msg:err.response.data,
                status:err.response.status
            }
            dispatch({
                type:GET_ERRORS,
                payload:errors
            })
        })
}

export const getProfileData = () => (dispatch,getState) => {
    const config = configureConfig(getState)
    axios.get('http://localhost:8000/api/profile',config)
    .then(res=>{
        dispatch({
            type:GET_PROFILE_DATA,
            payload:res.data
        })
    }).catch(err=>{
        const errors = {
            msg:err.response.data,
            status:err.response.status
        }
        dispatch({
            type:GET_ERRORS,
            payload:errors
        })
    })
}

export const updateProfileData = (calories) => (dispatch,getState) => {
    const config = configureConfig(getState)
    const body = JSON.stringify({"daily_calories":calories})
    axios.put('http://localhost:8000/api/profile',body,config)
    .then(res=>{
        dispatch({
            type:UPDATE_PROFILE_DATA,
            payload:res.data
        })
    }).catch(err=>{
        const errors = {
            msg:err.response.data,
            status:err.response.status
        }
        dispatch({
            type:GET_ERRORS,
            payload:errors
        })
    })
}
// helper function
const configureConfig = (getState) => {
    const token = getState().auth.token

    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }
    
    if (token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}
