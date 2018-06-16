import React, {Component} from 'react'
import CardList from './CardList/CardList.jsx'
import './_table.scss'
import words from './example'

class Table extends Component {

    render() {
        return (
            <div className="table">
                <CardList words = {words} />
            </div>
        )
    }
}

export default Table