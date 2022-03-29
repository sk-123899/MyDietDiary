import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import {Form,Col,Row,Button,Card} from 'react-bootstrap'

import hcbgImage from "./homebanner.png"; 

// const styles = StyleSheet.create({
//     userpass: {
//       color: 'black',
//       width:'40rem'
//     }
//   });

const Login = (props) => {
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const loginUser = (e) => {
        e.preventDefault()
        dispatch(login(username,password))
        setUsername("")
        setPassword("")
        return <Redirect to="/" />
    }


    const returnForm = () =>{
        return (
            <Card style={{color: 'black' , backgroundColor: '#FFC107' ,position: 'absolute', width:'40rem', marginLeft:'40px', padding:'10px',marginTop:'150px'}}>
                <Card.Body>
                    <Form onSubmit={loginUser}>
                        <Form.Group as={Row} controlId="username">
                            <Form.Label column sm={2}>
                                Username
                            </Form.Label>
                            <Col sm={10} xs={10}>
                                <Form.Control type="username"
                                value={username} placeholder ="Enter Username" 
                                onChange={(e)=>setUsername(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}controlId="password1">
                            <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                            <Col sm={10} xs={10}>
                            <Form.Control type="password"
                            value={password}  placeholder="Password" 
                            onChange={(e)=>setPassword(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{marginLeft:'250px'}}>
                            Login
                        </Button>            
                    </Form>
                </Card.Body>
            </Card>            
        )
    }

    return (
    <>
    <div class="bg_image" style={{ backgroundImage: `url(${hcbgImage})`, backgroundSize: "cover", height: "100vh", color: "#f5f5f5" }} > 
    {auth.isAuthenticated ? <Redirect to="/" /> : returnForm() }
    </div>
    </>)
}

export default Login