import React,{useEffect} from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {getCalories} from '../../actions/nutrition'
import {Doughnut} from 'react-chartjs-2'

const TotalCalories = () => {
    const auth = useSelector(state=>state.auth)
    const total = useSelector(state => state.nutrition.calories)
    const dispatch= useDispatch()

    useEffect(()=>{
        if (auth.isAuthenticated){
            dispatch(getCalories())
        } else {
            console.log("Nah")
        }
        
    },[])

    const dataSet = {
        labels : ['Fat','Protein','Carbs'],
        datasets : [
            {
                label:'Calorie breakdown',
                backgroundColor:[
                    '#B21F00',
                    '#C9DE00',
                    '#2FDE00',
                ],
                data:[total.fat,total.protein,total.carbs]
            }
        ]

    }

    return(
        <>
            <Container fluid className="mt-3">
                <Row>
                    <Col xs={12} md={{span:6,offset:2}}>
                        <Card body className="border-0" style={{marginTop:'40px'}}>
                            <Row>   
                                <Doughnut 
                                    data={dataSet}
                                    height={200}
                                    options={{
                                        title:{
                                            display:true,
                                            text:"Today's calorie breakdown",
                                            fontSize:20
                                        
                                        },
                                        legend:{
                                            display:true,
                                            position:'bottom'
                                        },
                                        maintainAspectRatio:false
                                    }}
                                
                                
                                />
                            </Row>
                        </Card>
                        
                    </Col>

                    <Col xs={12} md={{span:2,offset:1}}>
                        <Card body className="text-center" style={{marginTop:'40px', backgroundColor:'#FFC107'}}>
                            <h4>Daily Total Calories</h4>
                            <h6>{total.total ? total.total:0}</h6>   
                            <hr style={{width:"4rem"}} />
                            <h6>{auth.userCalorieGoal.daily_calories}</h6>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TotalCalories