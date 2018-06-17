import React, { Component } from 'react'
import Card from './Card/Card.jsx'
import { setTimeout } from 'timers';

class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0, disable: false, ids: [], words: []};
    }

    selectionCount = (id, word) => {
        if(this.state.counter < 2){
            this.setState((prevState) => ({ counter: prevState.counter + 1,
                                            ids: prevState.ids.concat(id),
                                            words: prevState.words.concat(word)}),
                            () => {
                                if(this.state.counter >= 2)
                                {
                                    this.setState({ disable: true }, () => {this.checkingAnswer();});
                                }
                            });
        }
    }

    checkingAnswer = () => {
        if(this.state.words[0] === this.state.words[1]){
            setTimeout("alert('OK')", 500);
        }
        else{
            alert("False");
        }
    }

    /*
    shouldComponentUpdate(nextState){
        return this.state.ids !== nextState.ids;
    }

    
    componentDidUpdate(){
        if(this.state.words.length == 2 && this.state.words[1] !== 'undefined'){
            if(this.state.words[0] === this.state.words[1]){
                alert("OK");
                alert(this.state.words[0]);
                alert(this.state.words[1]);
            }
            else{
                alert("False");
                alert(this.state.words[0]);
                alert(this.state.words[1]);
            }
        }
        else{
            alert(this.state.words.length);
        }
    }
*/
    render() {
        const wordElement = this.props.words.map((word, index) => 
        <Card key = {index} id = {index} wordEl = {word} counter = {this.selectionCount} disable={this.state.disable} />)

        return (
            <span>
                {wordElement}
            </span>
        )
    }
}

export default CardList