import React from 'react'
import {Container,Col,Row,Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getProfileData} from '../../actions/auth'
import UpdateWeight from '../forms/UpdateWeight'
import UpdateCalorieGoal from '../forms/UpdateCalorieGoal'
import DailyFoodLog from './DailyFoodLog'
import TotalCalories from './TotalCalories'
import Staistics from '../statistics/Statistics'



class Home extends React.Component {

    state = {
        hideStatistics:true,
        statsButtonColor:'outline-warning',
        foodLogButtonColor:'warning'
    }

    componentDidMount(){
        this.props.getProfileData()
    }

    onClickShowStats = () => {
        this.setState({hideStatistics:false,statsButtonColor:'warning',foodLogButtonColor:'outline-warning'})
    }

    onClickShowFoodLog = () => {
        this.setState({hideStatistics:true,statsButtonColor:'outline-warning',foodLogButtonColor:'warning'})
    }

    render(){
            return (
                <>
                    <TotalCalories />

                    <Container fluid className="mt-3">

                        <Row className="justify-content-center">
                            <Button variant={this.state.foodLogButtonColor} className="mr-3" onClick={this.onClickShowFoodLog} >
                                Daily Food Log
                            </Button>

                            <Button variant={this.state.statsButtonColor} onClick={this.onClickShowStats}>
                                User Statistics
                            </Button>
                        </Row>

                        <Row>
                            
                            {this.state.hideStatistics ? 
                            <>
                            <Col xs={12} s={12} md={{span:6,offset:2}}>
                                <DailyFoodLog />
                            </Col>

                            <Col xs={12} s={12} md={{span:2,offset:1}}>
                                <UpdateWeight />
                                <UpdateCalorieGoal />
                            </Col></> : <Staistics /> }
                        </Row>
                    </Container>
                </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps,{getProfileData})(Home)