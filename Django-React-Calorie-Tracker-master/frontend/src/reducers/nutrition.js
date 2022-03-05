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
    UPDATE_WEIGHT
    
} from '../actions/types'

const initialState = {
    B:[],
    L:[],
    D:[],
    S:[],
    C:[],
    calories:{
        total:0,
        fat:0,
        protein:0,
        carbs:0
    },
    user_weight:0
}

export default function(state=initialState,action){
    switch(action.type){
        case GET_BREAKFAST:
            return{
                ...state,
                B:action.payload
            }
        case GET_LUNCH:
            return{
                ...state,
                L:action.payload
            }
        
        case GET_DINNER:
            return{
                ...state,
                D:action.payload
            }            
        case GET_SNACKS:
            return {
                ...state,
                S:action.payload
            }
        case GET_CHEAT:
            return {
                ...state,
                C:action.payload
            }

        case ADD_FOOD:
            return{
                ...state,
                [action.payload.category]:[...state[action.payload.category],action.payload]
            }

        case DELETE_FOOD:
           return {
               ...state,
               [action.payload.category]: state[action.payload.category].filter(food => food.id !== action.payload.id)
           }

        case EDIT_FOOD:
            return {
                ...state,
                [action.payload.category]: state[action.payload.category].map(food =>{
                    if (food.id !== action.payload.id){
                        return food
                    } else {
                        return {
                            ...food,
                            ...action.payload
                        }
                    }
                })
            }

        case GET_CALORIES:
            return {
                ...state,
                calories:{
                    total:action.payload.totalCalories,
                    fat:action.payload.fatCalories,
                    protein:action.payload.proteinCalories,
                    carbs:action.payload.carbsCalories
                }
            }

        case UPDATE_CALORIES:
            return {
                ...state,
                calories:{
                    total:state.calories.total + action.payload.total_calories,
                    fat:state.calories.fat + action.payload.fat,
                    protein:state.calories.protein + action.payload.protein,
                    carbs:state.calories.carbs + action.payload.carbs
                }
            }
        case GET_WEIGHT:
        case UPDATE_WEIGHT:
            return {
                ...state,
                user_weight:action.payload
            }

        default:
            return state
    }
}
