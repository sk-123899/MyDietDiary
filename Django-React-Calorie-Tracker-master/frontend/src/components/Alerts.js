import React,{Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withAlert } from 'react-alert'



class Alerts extends React.Component {
    
    componentDidUpdate(prevProps){
        const {error,alert} = this.props
        if (error !== prevProps.error){
            if (error.msg.non_field_errors){
                alert.error(`Login Failed: ${error.msg.non_field_errors.join()}`)
            }
            if(error.msg.username){
                alert.error(`Registration Failed: ${error.msg.username.join()}`)
            }
            if(error.msg.total_calories || error.msg.fat || error.msg.protein || error.msg.carbs){
                alert.error(`Food Entry Error: A valid integer is required for the Calorie, Fat, Protien and Carb field.`)
            }
            if(error.msg.number){
                alert.error(`Weight Update Error: ${error.msg.number.join()}`)
            }
            if(error.msg.daily_calories){
                alert.error(`Daily Calorie Update Error: ${error.msg.daily_calories.join()}`)
            }
        }
    }
    
    render(){
        return (
            <Fragment />
        )
    }
    
}

const mapStateToProps = state => {
    return {
        error:state.errors
    }
}

export default connect(mapStateToProps)(withAlert()(Alerts))