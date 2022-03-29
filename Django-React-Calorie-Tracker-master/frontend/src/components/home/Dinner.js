import React from 'react'
import {connect} from 'react-redux'
import {loadDinnerList,deleteFood} from '../../actions/nutrition'
import FoodTable from './FoodTable'

class Dinner extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.loadDinnerList()
    }

    deleteDinner = (food) => {
        this.props.deleteFood(food)
        
    }
    render(){
        return (
            <>
                <h4 className="text-warning">Dinner</h4>
                <FoodTable 
                    foodList = {this.props.dinnerList}
                    category="D"
                    onClickTrash={this.deleteDinner}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dinnerList:state.nutrition.D
    }
}
export default connect(mapStateToProps,{
    loadDinnerList,
    deleteFood
})(Dinner)