import React from 'react';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './Alerts.js'
import Register from './accounts/Register'
import Login from './accounts/Login'
import {loadUser} from '../actions/auth'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './home/Home'
import NavBar from './NavBar'
import PrivateRoute from './common/PrivateRoute'

// Alert options
const alertOptions =  {
  timeout:3000,
  position:'top center'
}

class App extends React.Component {
  
  componentDidMount(){
    this.props.loadUser()
  }

  render(){
    return (
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...alertOptions}>
            <NavBar />
            <Alerts />
            <PrivateRoute path="/" exact component={Home}/>
            <Route path="/register" component= {Register}/>
            <Route path="/login" component = {Login}/>
          </AlertProvider>
        </BrowserRouter>
    )
  }
}


const mapStateToProps = state => {
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps,{
  loadUser,
})(App);
