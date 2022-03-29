import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {loadSnackList,deleteFood} from '../../actions/nutrition'
import FoodTable from './FoodTable'

class Snacks extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.loadSnackList()
    }
    
    deleteSnacks=(food) => {
        this.props.deleteFood(food)
    }

    render(){
        return (
            <>
                <h4 className="text-warning">Snacks</h4>
                <FoodTable 
                    foodList = {this.props.snackList}
                    category="S"
                    onClickTrash={this.deleteSnacks}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        snackList:state.nutrition.S
    }
}

export default connect(mapStateToProps,{
    loadSnackList,
    deleteFood
})(Snacks)