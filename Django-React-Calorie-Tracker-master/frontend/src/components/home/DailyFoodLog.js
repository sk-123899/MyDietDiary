import React from 'react'
import Snacks from './Snacks'
import Breakfast from './Breakfast'
import Cheat from './Cheat'
import Dinner from './Dinner'
import Lunch from './Lunch'



class DailyFoodLog extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <>
                <Breakfast />
                <Lunch />
                <Dinner />
                <Snacks />
                <Cheat />
            </>
        )
    }
}

export default DailyFoodLog