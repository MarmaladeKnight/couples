import { combineReducers } from 'redux'
import io from 'socket.io-client';

const socket = io('http://localhost:2000');

socket.on('new_user', function(msg){
    console.log("yey");
});

const initialState = {
    socket,
    cardStates: {
        selected: [],
        answered: [],
        pulse: undefined
    },
    gameStates: {
        score: 0
    }
}

function gameStates(state = initialState.gameStates, action) {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                gameStates: [...state.gameStates, action.payload]
            };
        case 'UP_SCORE':
            return {
                ...state,
                score: state.score + 1
            };
        case 'END_GAME':
            return {
                ...state,
                gameStates: {
                    score: state.gameStates.score + 1
                }
            };
        default:
            return state;
    }
}

 function cardStates(state = initialState.cardStates, action) {
    switch (action.type) {
        case 'SELECTED':
            return {
                ...state,
                selected: [...state.selected, action.payload]
            };
        case 'CORRECT_ANSWER':
            return {
                ...state,
                selected: [],
                answered: [...state.answered, ...state.selected],
            };
        case 'WRONG_ANSWER':
            return {
                ...state,
                selected: [],
            };
        case 'PULSE':
            return {
                ...state,
                pulse: action.payload
            }
        case 'STOP_PULSE':
            return {
                ...state,
                pulse: undefined
            }
        default:
            return state;
    }
}

export default combineReducers({
    cardStates,
    gameStates  
})