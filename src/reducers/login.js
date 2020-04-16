import Action from '../actions' 

var initialState = {
    MEMBER: null,
}

function loginReducer(state = initialState, action) {
    switch (action.type) {
        case Action.LOGIN:
            return {
                MEMBER: "pito",
            }
        case Action.GET_MEMBER:
            return {
                MEMBER: "pito",
            }
        default:
            return state
    }
}

export default loginReducer;