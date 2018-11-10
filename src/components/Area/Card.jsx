import React, { Component } from 'react'
import { connect } from 'react-redux'
import posed from 'react-pose'

import CardBack from './CardBack.jsx'
import CardFace from './CardFace.jsx'
import  './_card.scss'

const GameCard = posed.div({
    default: { rotateY: 0, translateZ: 0 },
    hovered: { translateZ: 15 },
    selected: { 
        rotateY: 180, 
        translateZ: 0,
        transition: {
            duration: 300,
            ease: 'backInOut'
          }
    },
    correct: { backgroundColor: "green"},
    wrong: { backgroundColor: "red" },
    pulse: { 
        scale: 1,
        transition: {
            type: 'keyframes',
            values: [0.7, 1, 0.7, 1, 0.7, 1],
            duration: 1200
        }
      }
    }
);

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { answered: false, selected: false, hovered: false };
    }

    selectCard = () => {
        this.props.restartTimer();

        let id = this.props.id;
        let length = this.props.cardStore.selected.length;
        let pulse = this.props.cardStore.pulse;
        let selected = this.props.cardStore.selected.indexOf(id);
        let answered = this.props.cardStore.answered.indexOf(id);

        if (selected === -1 && answered === -1 && length < 2 && pulse !== id) {
            let addingSelectedCard = new Promise((resolve, reject) =>{
                this.props.onSelect(this.props.id);
                resolve();
            });
            
            addingSelectedCard.then(() => {
                let selectedCards = this.props.cardStore.selected;
              
                if (selectedCards.length === 2) {
                    this.props.counter(selectedCards)
                }
            })       
        }
    }

    poseProperty = () => {
        let selected = this.props.cardStore.selected.indexOf(this.props.id);
        let answered = this.props.cardStore.answered.indexOf(this.props.id);
        let pulse = false;

        if (this.props.cardStore.pulse === this.props.id) {
            pulse = true;
        }

        if (pulse) {
            setTimeout(() => {
                this.props.stopPulsing()
            }, 1300)
            return "pulse"
        } else if (selected !== -1 || answered !== -1) {
            return "selected"
        } else if(this.state.hovered) {
            return "hovered"
        } else {
            return "default"
        }
    }

    render() {
        const wordObj = this.props.wordEl;
        let poseProp = this.poseProperty()

        return (
            <GameCard
                className="card"
                pose={ poseProp }
                onClick={ this.selectCard }
                onMouseEnter={ () => this.setState({ hovered: true }) }
                onMouseLeave={ () => this.setState({ hovered: false }) }
            >  
                <CardBack />
                <CardFace wordEl={wordObj}/>
            </GameCard>
        )
    }
}

export default connect(
    state => ({
        cardStore: state.cardStates
    }),
    dispatch => ({
        onSelect: (index) => {
            dispatch({ type: 'SELECTED', payload: index})
        },
        stopPulsing: () => {
            dispatch({ type: 'STOP_PULSE'})
        }        
    })
)(Card)