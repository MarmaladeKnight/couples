import React, {Component} from 'react'
import CardBack from './CardBack/CardBack.jsx'
import CardFace from './CardFace/CardFace.jsx'
import posed from 'react-pose'
//import styled from "styled-components";
import  './_card.scss'


const config = {
    default: { rotateY: 0, translateZ: 0 },
    hovered: { translateZ: 15 },
    clicked: { rotateY: 180, translateZ: 95 }
  }

const GameCard = posed.div(config);

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = { selected:false, hovering: false};
    }

    handleSelected =() => {
        if(!this.state.selected && !this.props.disable)
        {
            this.setState({ selected: true });
            this.props.counter(this.props.id, this.props.wordEl.word);
        }
    }

    render() {
        const wordObj = this.props.wordEl;
        return (
            <GameCard
                className="card"
                pose={this.state.selected ? "clicked" : (this.state.hovering ? "hovered" : "default")}
                onClick={this.handleSelected}
                onMouseEnter={() => this.setState({ hovering: true })}
                onMouseLeave={() => this.setState({ hovering: false })}>  
                <CardBack />
                <CardFace wordEl={wordObj}/>
            </GameCard>
        )
    }
}

export default Card