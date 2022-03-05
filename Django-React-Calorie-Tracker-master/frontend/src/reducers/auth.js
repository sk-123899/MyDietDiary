import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
    GET_PROFILE_DATA,
    UPDATE_PROFILE_DATA
} from '../actions/types'


const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    isLoading:false,
    user:null,
    userCalorieGoal:0
}


export default function(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isLoading:false,
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false
            }
        case GET_PROFILE_DATA:
        case UPDATE_PROFILE_DATA:
            return {
                ...state,
                userCalorieGoal:action.payload
            }
        default:
            return state
    }
}