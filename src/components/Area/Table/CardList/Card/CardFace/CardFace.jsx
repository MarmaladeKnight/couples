import React, {Component} from 'react'
import './_cardFace.scss'

class CardFace extends Component {
    render() {
        return (
                <div className="CardFace">
                    <ul>
                        <li>{this.props.wordEl.word}</li>
                        <li>{this.props.wordEl.transcription}</li>
                        <li>{this.props.wordEl.translation}</li>
                    </ul>
                </div>
        )
    }
}

export default CardFace