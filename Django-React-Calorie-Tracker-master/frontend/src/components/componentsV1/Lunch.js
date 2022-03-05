import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {loadLunchList,deleteFood,getCalories} from '../actions/nutrition'
import {Table} from 'react-bootstrap'
import CreateFoodForm from './forms/CreateFoodForm'

import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome' 

const Lunch = (props) => {
    const lunchList = useSelector(state => state.nutrition.lunch)
    const dispatch = useDispatch()

    // console log the data from the backend
    useEffect(()=>{
        dispatch(loadLunchList())
    },[])

    const updateFood = (food) => {
        dispatch(deleteFood(food))
    }
    const renderLunchList = (lunchList) => {
        return lunchList.map(lunch =>{
            return (
                <tr key={lunch.id}>
                    <td>{lunch.name}</td>
                    <td>{lunch.total_calories}</td>
                    <td>{lunch.carbs}</td>
                    <td>{lunch.fat}</td>
                    <td>{lunch.protein}</td>
                    <td>
                        <button onClick={()=>updateFood(lunch)} style={{border:"none",background:"none"}}><FontAwesomeIcon icon={faTrash} /></button>
                        <button style={{border:"none",background:"none"}}><FontAwesomeIcon icon={faEdit}/></button>
                    </td>
                </tr>
            )
        })
    }
    return (
    <>
        <div>Lunch</div>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Calories</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                    <th>Protein</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <CreateFoodForm category="L"/>
                {renderLunchList(lunchList)}
            </tbody>
        </Table>
    </>
    )
}


export default Lunch