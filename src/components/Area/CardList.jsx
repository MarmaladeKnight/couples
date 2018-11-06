import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from './Card.jsx'
import words from './example.js'
import './_table.scss'

class CardList extends Component {
    selectionCount = (selectedArray) => {
        let index1 = selectedArray[0];
        let index2 = selectedArray[1];
        
        setTimeout(() => { 
            if(words[index1].word === words[index2].word) {
                this.props.onCorrectAnswer();
            } else {
                this.props.onWrongAnswer();
            }
        }, 1000);
    }
    
    render() {
        return (
            <div className="table">
                { words.map((word, index) => 
                    <Card 
                        key = {index} 
                        id = {index} 
                        wordEl = {word} 
                        counter = {this.selectionCount} 
                    />
                )}
            </div>
        )
    }
}

export default connect(
    state => ({
        cardStore: state.cardStates,
        //gameStore: state.gameStates
    }),
    dispatch => ({
        onWrongAnswer: () => {
            dispatch({ type: 'WRONG_ANSWER'})
        },
        onCorrectAnswer: () => {
            dispatch({ type: 'CORRECT_ANSWER'})
        }
    })
)(CardList)