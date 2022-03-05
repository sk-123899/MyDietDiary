import axios from 'axios'
import {
    GET_BREAKFAST,
    GET_CHEAT,
    GET_DINNER,
    GET_LUNCH,
    GET_SNACKS,
    ADD_FOOD,
    EDIT_FOOD,
    DELETE_FOOD,
    GET_CALORIES,
    UPDATE_CALORIES,
    GET_WEIGHT,
    UPDATE_WEIGHT,
    GET_ERRORS
} from '../actions/types'

const foodLogUrl = 'http://localhost:8000/api/food-log/'
const foodCategoryUrl = 'http://localhost:8000/api/'

export const loadBreakfastList = () =>(dispatch,getState) => {
    const config = configureConfig(dispatch,getState)

    axios.get(foodCategoryUrl + 'breakfast',config)
    .then(res => {
        dispatch({
            type:GET_BREAKFAST,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const loadLunchList = () =>(dispatch,getState) => {
    const config = configureConfig(dispatch,getState)

    axios.get(foodCategoryUrl + 'lunch',config)
    .then(res => {
        dispatch({
            type:GET_LUNCH,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const loadDinnerList = () =>(dispatch,getState) => {
    const config = configureConfig(dispatch,getState)

    axios.get(foodCategoryUrl + 'dinner',config)
    .then(res => {
        dispatch({
            type:GET_DINNER,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const loadSnackList = () =>(dispatch,getState) => {
    const config = configureConfig(dispatch,getState)

    axios.get(foodCategoryUrl + 'snacks',config)
    .then(res => {
        
        dispatch({
            type:GET_SNACKS,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const loadCheatList = () =>(dispatch,getState) => {
    const config = configureConfig(dispatch,getState)

    axios.get(foodCategoryUrl + 'cheat',config)
    .then(res => {
        dispatch({
            type:GET_CHEAT,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const addFood = (food) => (dispatch,getState) => {
    const config = configureConfig(dispatch,getState)
    const body = JSON.stringify(food)
    console.log(food)
    axios.post(foodLogUrl,body,config)
    .then( res => {
        dispatch({
            type:UPDATE_CALORIES,
            payload:res.data
        })
        dispatch({
            type:ADD_FOOD,
            payload:res.data
        })
    }).catch(err =>{
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

export const editFood = (foodItem,original) => (dispatch,getState) => {
    const config = configureConfig(dispatch,getState)
    const body = JSON.stringify(foodItem)

    // change between edited item and original
    const total_calories =  foodItem.total_calories - original.total_calories
    const fat = foodItem.fat - original.fat
    const protein =  foodItem.protein - original.protein
    const carbs = foodItem.carbs - original.carbs

    axios.put(foodLogUrl+original.id,body,config)
    .then(res =>{
        dispatch({
            type:EDIT_FOOD,
            payload:res.data
        })
    }).then (
        dispatch({
            type:UPDATE_CALORIES,
            payload:{total_calories,fat,protein,carbs}
        })
    ).catch(err=>{
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

export const deleteFood = (food) => (dispatch,getState) => {
    const category = food.category
    const id = food.id
    const total_calories = -food.total_calories
    const fat = -food.fat
    const protein = -food.protein
    const carbs = -food.carbs
    const config = configureConfig(dispatch,getState)

    axios.delete(foodLogUrl + id,config)
    .then(
        dispatch({
            type:DELETE_FOOD,
            payload:{id,category}
        })
    ).then(
        dispatch({
            type:UPDATE_CALORIES,
            payload:{total_calories,fat,protein,carbs}
        })
    ).catch(err =>{
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

export const getCalories = () => (dispatch,getState) => {
    const config = configureConfig(dispatch,getState)
    axios.get('http://localhost:8000/api/user/total-calories',config)
    .then(res =>{
        dispatch({
            type:GET_CALORIES,
            payload:res.data.data
        })
    }).catch(err =>{
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

export const getUserWeight = () => (dispatch,getState) => {
    const config = configureConfig(dispatch,getState)
    axios.get('http://localhost:8000/api/user/weight',config)
    .then(res =>{
        dispatch({
            type:GET_WEIGHT,
            payload:res.data.weight
        })
    }).catch(err =>{
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

export const updateUserWeight = (weight) => (dispatch,getState) => {
    const config = configureConfig(dispatch,getState)
    const body = JSON.stringify({"number":weight})
    axios.post('http://localhost:8000/api/user/weight',body,config)
    .then(res =>{
        console.log(res.data)
        dispatch({
            type:UPDATE_WEIGHT,
            payload:res.data.data
        })
    }).catch(err =>{
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
const configureConfig = (dispatch,getState) => {
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


