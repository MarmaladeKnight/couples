import React, {Component} from 'react'
import Table from './Table/Table.jsx'
import './_area.scss'

class Area extends Component {

    render() {
        return (
            <div className="area">
                <Table />
            </div>
        )
    }
}

export default Area