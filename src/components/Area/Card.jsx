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
});

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { answered: false, selected: false, hovered: false };
    }

    selectCard = () => {
        let selected = this.props.cardStore.selected.indexOf(this.props.id);
        let answered = this.props.cardStore.answered.indexOf(this.props.id);
        //console
        
        if (selected === -1  && answered === -1) {
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


    render() {
        const wordObj = this.props.wordEl;
        let selected = this.props.cardStore.selected.indexOf(this.props.id);
        let answered = this.props.cardStore.answered.indexOf(this.props.id);

        return (
            <GameCard
                className="card"
                pose={(selected !== -1 || answered !== -1) ? "selected" : (this.state.hovered ? "hovered" : "default")}
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
        }
    })
)(Card)