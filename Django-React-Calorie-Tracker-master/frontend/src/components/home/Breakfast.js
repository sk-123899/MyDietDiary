import React from 'react'
import {connect} from 'react-redux'
import FoodTable from './FoodTable'
import {loadBreakfastList,deleteFood} from '../../actions/nutrition'


class Breakfast extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.loadBreakfastList()
    }

    deleteBreakfast = (food) => {
        this.props.deleteFood(food)
    }
    
    render(){
        return (
            <>
                <h4 className="text-warning">Breakfast</h4>
                <FoodTable 
                    foodList = {this.props.breakfastList}
                    category="B"
                    onClickTrash = {this.deleteBreakfast}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        breakfastList:state.nutrition.B
    }
}

export default connect(mapStateToProps,{
    loadBreakfastList,
    deleteFood
})(Breakfast)