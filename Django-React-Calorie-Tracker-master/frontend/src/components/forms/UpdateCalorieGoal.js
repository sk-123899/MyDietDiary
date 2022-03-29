import React,{useState} from 'react'
import {Card,Form,Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {getUserWeight,updateUserWeight}  from '../../actions/nutrition'
import {getProfileData,updateProfileData}  from '../../actions/auth'

const UpdateWeightForm = () =>{
    
    const dispatch = useDispatch()
    const [updatedCalorieGoal,setCalorieGoal] = useState(0)
      // form to update current weight
    const onCalorieUpdate = (e) => {
        e.preventDefault()
        // send to profile api
        dispatch(updateProfileData(updatedCalorieGoal))
        setCalorieGoal("")
    }
    return (
        <>
            <Card body className="mt-3">
                <Form onSubmit={onCalorieUpdate}>
                    <Form.Group controlId="calorie-goal">
                        <Form.Label><h5 className="text-center">Update Calorie Goal</h5></Form.Label>
                        <Form.Control 
                            as="input" 
                            placeholder="Update calorie goal"
                            value={updatedCalorieGoal}
                            onChange = {(e)=>setCalorieGoal(e.target.value)}
                            />
                            
                    </Form.Group>
                    <Button type="submit" variant="warning" size="sm">Update Calorie Goal</Button>
                </Form>
            </Card>
        </>
    )
}

export default UpdateWeightForm