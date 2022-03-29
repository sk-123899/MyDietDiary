import React,{useState} from 'react'
import {Card,Form,Button} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import {getUserWeight,updateUserWeight}  from '../../actions/nutrition'
import {getProfileData,updateProfileData}  from '../../actions/auth'

const UpdateWeightForm = () =>{

    const dispatch = useDispatch()
    const [updatedWeight,setUpdatedWeight] = useState(0)
    const onWeightUpdate = (e) => {
        e.preventDefault()
        dispatch(updateUserWeight(updatedWeight))
        setUpdatedWeight("")
    }
    return (
        <>
            <Card body>
                <Form onSubmit={onWeightUpdate}>
                    <Form.Group controlId="weight" >
                        <Form.Label><h5 className="text-center">Update Current Weight</h5></Form.Label>
                        <Form.Control 
                            as="input" 
                            placeholder="Record current weight" 
                            value={updatedWeight}
                            onChange = {(e)=>setUpdatedWeight(e.target.value)}
                            />
                    </Form.Group>
                    <Button type="submit" variant="warning" size="sm">Update Weight</Button>
                </Form>
            </Card>
        </>
    )
}

export default UpdateWeightForm