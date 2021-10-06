import * as actionTypes from '../constants/userConstants';

export const userReducer = (state = { user: [] }, action) => {
    switch(action.type) {
        case actionTypes.SIGN_IN_USER:
            return {
                user: action.payload,
            }
        
        case actionTypes.SIGN_OUT_USER:
            return {
                user: action.payload,
            }

        default:
            return state;
    }
}