import React, { Component } from 'react'
import { connect } from 'react-redux'
//import posed from 'react-pose'

import Card from './Card.jsx'
import words from './example.js'
import './_table.scss'

// const GameCard = posed.Card({
//     default: { backgrondColor: "red" },
// });

class CardList extends Component {
    actionTimer = setTimeout(() => {
        this.timerTick();
    }, 10000);

    timerTick = () => {
        let selectedCards = this.props.cardStore.selected;
        let answeredCards = this.props.cardStore.answered;

        let id = Math.random().toFixed(1) * 10;
        id += Math.random().toFixed(1) * 10;

        id = (id > 15) ? 15 : id;

        if(selectedCards.indexOf(id) !== -1 || answeredCards.indexOf(id) !== -1) {
            while (selectedCards.indexOf(id) !== -1 || answeredCards.indexOf(id) !== -1) {
                id = Math.random().toFixed(1) * 10 
                   + Math.random().toFixed(1) * 10;
            }
        }

        this.props.onIncation(id);
        this.actionTimer = setTimeout(() => {
            this.timerTick();
        }, 10000);
    }

    restartTimer = () => {
        clearTimeout(this.actionTimer);
        this.actionTimer = setTimeout(() => {
            this.timerTick();
        }, 10000);
    }

    selectionCount = (selectedCards) => {
        let index1 = selectedCards[0];
        let index2 = selectedCards[1];
        
        if(words[index1].word === words[index2].word) {
            setTimeout(() => { 
                this.props.onCorrectAnswer();
                this.props.onUpScore();
            }, 300);
        } else {
            setTimeout(() => { 
                this.props.onWrongAnswer();
            }, 1000);
        }
    }
    
    render() {
        return (
            <div className="table">
                { 
                    words.map((word, index) => 
                    <Card 
                        key = { index } 
                        id = { index } 
                        wordEl = { word } 
                        counter = { this.selectionCount }
                        restartTimer = { this.restartTimer }
                    />)
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        cardStore: state.cardStates,
        gameStore: state.gameStates
    }),
    dispatch => ({
        
        onSelect: (index) => {
            dispatch({ type: 'SELECTED', payload: index })
        },
        onWrongAnswer: () => {
            dispatch({ type: 'WRONG_ANSWER'})
        },
        onCorrectAnswer: () => {
            dispatch({ type: 'CORRECT_ANSWER'})
        },
        onUpScore: () => {
            dispatch({ type: 'UP_SCORE' })
        },
        onIncation: (index) => {
            dispatch({ type: 'PULSE', payload: index });
        }
    })
)(CardList)