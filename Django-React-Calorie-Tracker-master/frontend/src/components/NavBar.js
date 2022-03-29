import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Navbar,Nav,Button} from 'react-bootstrap'
import {logout} from '../actions/auth'

const NavBar = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    return (
        <>
        <Navbar variant="light" style={{fontFamily:'Arial,sans-serif'}}>
            {
            auth.isAuthenticated ?
            <>
                <Navbar.Brand href="/"><a style={{position: 'absolute',marginLeft:'100px',marginTop:'7px',textDecoration: 'none',fontSize: '1.5em',fontWeight: 'bold', textTransform: 'uppercase',letterSpacing: '2px',transition: '0.4s', animation: 'fadein1 2s', transform: 'translate(0,0)'}}>MYDIETDIARY</a></Navbar.Brand>
                <Nav.Link className="text-dark" href="http://localhost:7000/"><Button  style={{right:'250px',marginTop:'7px',position: 'absolute', backgroundColor: '#FFC107', border:'none', color:'black',fontSize:'20px'}}>Home</Button> </Nav.Link>
                <Nav.Link className="text-dark" href="/" onClick={() => dispatch(logout())}><Button  style={{right:'130px',marginTop:'7px',position: 'absolute', backgroundColor:'#FFC107', border:'none', color:'black', fontSize:'20px' }}>Logout</Button> </Nav.Link>
                {/* <Navbar.Brand href="/" style={{marginTop:'5px'}}>Welcome {auth.user.username} </Navbar.Brand> */}
            </> :
            <>
                <Navbar.Brand href="/"><a style={{position: 'absolute',marginLeft:'100px',marginTop:'7px',textDecoration: 'none',fontSize: '1.5em',fontWeight: 'bold', textTransform: 'uppercase',letterSpacing: '2px',transition: '0.4s', animation: 'fadein1 2s', transform: 'translate(0,0)'}}>MYDIETDIARY</a></Navbar.Brand>
                <Nav.Link className="text-dark" href="http://localhost:7000/"><Button  style={{right:'400px',marginTop:'7px',position: 'absolute', backgroundColor: '#FFC107', border:'none', color:'black',fontSize:'20px'}}>Home</Button> </Nav.Link>
                <Nav.Link className="text-dark" href="/register"><Button style={{right:'260px',position: 'absolute',marginTop:'7px', backgroundColor:'#FFC107', border:'none', color:'black', fontSize:'20px'}}>Register</Button></Nav.Link>
                <Nav.Link className="text-dark" href="/login"><Button  style={{right:'145px',marginTop:'7px',position: 'absolute', backgroundColor:'#FFC107', border:'none', color:'black', fontSize:'20px' }}>Login</Button> </Nav.Link>
            </>
            }
            
            
            
        </Navbar>
      </>
    )
}

export default NavBar