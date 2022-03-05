import React,{useState} from 'react'
import EditFoodForm from '../forms/EditFoodForm'
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const FoodRow = (props) => {
    const [isShown,setIsShown] = useState(true)

    const onClickEdit=(food)=>{
        setIsShown(!isShown)
    }

    const onClickCancel = () =>{
       setIsShown(!isShown)
    }
    
    return (
        <>
            {isShown ? <tr key={props.food.key}>
                <td>{props.food.name}</td>
                <td>{props.food.total_calories}</td>
                <td>{props.food.fat}</td>
                <td>{props.food.protein}</td>
                <td>{props.food.carbs}</td>
                <td>
                    <button onClick={()=>props.onClickTrash(props.food)} style={{border:"none",background:"none"}}><FontAwesomeIcon icon={faTrash} /></button>
                    <button onClick= {()=> onClickEdit(props.food)} style={{border:"none",background:"none"}}><FontAwesomeIcon icon={faEdit}/></button>
                </td>
            </tr>: <EditFoodForm food={props.food} onClickCancel={onClickCancel}/> }
        </>
    )
}

export default FoodRow