import React from 'react'
import PropTypes from 'prop-types'
import './_cardFace.scss'

const CardFace = ({ wordEl }) => (
    <div className="CardFace">
        <ul>
            <li>{ wordEl.word }</li>
            <li>{ wordEl.transcription }</li>
            <li>{ wordEl.translation }</li>
        </ul>
    </div>
)


CardFace.propTypes = {
    wordEl: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default CardFace