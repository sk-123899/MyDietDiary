import React, {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {login} from '../../actions/auth'
import {Redirect} from 'react-router-dom'
import {Form,Col,Row,Button,Card} from 'react-bootstrap'



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
            <Card style={{width:'40rem'}}>
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

                        <Button variant="primary" type="submit">
                            Login
                        </Button>            
                    </Form>
                </Card.Body>
            </Card>            
        )
    }

    return (
    <>
    {auth.isAuthenticated ? <Redirect to="/" /> : returnForm() }
    </>)
}

export default Login