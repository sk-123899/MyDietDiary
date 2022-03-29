import React from 'react'
import {connect} from 'react-redux'
import {loadCheatList,deleteFood} from '../../actions/nutrition'
import FoodTable from './FoodTable'

class Cheat extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.loadCheatList()
    }

    deleteCheat = (food) => {
        this.props.deleteFood(food)
        
    }
    render(){ 
        return (
            <>
                <h4 className="text-warning">Cheat</h4>
                <FoodTable 
                    foodList = {this.props.cheatList}
                    category="C"
                    onClick={this.deleteCheat}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cheatList:state.nutrition.C
    }
}

export default connect(mapStateToProps,{
    loadCheatList,
    deleteFood
})(Cheat)