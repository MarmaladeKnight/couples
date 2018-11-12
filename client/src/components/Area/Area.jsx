import React, {Component} from 'react'
import CardList from './CardList.jsx'
//import Table from './Table.jsx'
import './_area.scss'

class Area extends Component {
    render() {
        return (
            <div className="area">
                <CardList/>
            </div>
        )
    }
}

export default Area