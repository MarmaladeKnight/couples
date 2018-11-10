import React, {Component} from 'react'
import { connect } from 'react-redux'
import './_head.scss'

class Head extends Component {
    render() {
        return (
            <div className="head">
                Your score: { " " + this.props.gameStates.score }
            </div>
        )
    }
}

export default connect(
    state => ({
        gameStates: state.gameStates
    })
)(Head)