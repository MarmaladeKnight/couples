import React from 'react'
import PropTypes from 'prop-types'
import './_cardFace.scss'

const CardFace = ({ wordEl }) => (
    <div className="CardFace">
        <p>
            { wordEl.word }<br/>
            { wordEl.transcription }<br/>
            { wordEl.translation }
        </p>
    </div>
)


CardFace.propTypes = {
    wordEl: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default CardFace