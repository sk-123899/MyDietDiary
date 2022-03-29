import React from 'react'
import {connect} from 'react-redux'
import {loadLunchList,deleteFood} from '../../actions/nutrition'
import FoodTable from './FoodTable'

class Lunch extends React.Component {
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.props.loadLunchList()
    }

    deleteLunch = (food) => {
        this.props.deleteFood(food)
        
    }
    render(){
        return (
            <>
                <h4 className="text-warning">Lunch</h4>
                <FoodTable 
                    foodList = {this.props.lunchList}
                    category="L"
                    onClickTrash={this.deleteLunch}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lunchList:state.nutrition.L
    }
}

export default connect(mapStateToProps,{
    loadLunchList,
    deleteFood
})(Lunch)