import { combineReducers } from 'redux'

const initialState = {
    cardStates: {
        selected: [],
        answered: []
    },
    gameStates: [
        "not kek"
    ]
}

function gameStates(state = initialState.gameStates, action) {
    switch (action.type) {
        case 'CHECKING_ANSWER':
            return {
                ...state,
                gameStates: [...state.gameStates, action.payload]
            };
        // case 'CORRECT_ANSWER':
        //     return {
        //         ...state,
        //         gameStates: [...state.gameStates, action.payload]
        //     };
        // case 'WRONG_ANSWER':
        //     return {
        //         ...state,
        //         gameStates: [...state.gameStates, action.payload]
        //     };
        default:
            // /console.log("lel")
            return state;
    }
}

 function cardStates(state = initialState.cardStates, action) {
    switch (action.type) {
        case 'SELECTED':
            return {
                ...state,
                selected: [...state.selected, action.payload],
                answered: [...state.answered]
            };
        case 'CORRECT_ANSWER':
            return {
                ...state,
                selected: [],
                answered: [...state.answered, ...state.selected]
            };
        case 'WRONG_ANSWER':
            return {
                ...state,
                selected: [],
                answered: [...state.answered]
            };
        default:
            return state;
    }
}

export default combineReducers({
    cardStates,
    gameStates  
})