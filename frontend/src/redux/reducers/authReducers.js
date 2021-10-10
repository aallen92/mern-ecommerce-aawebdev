import * as actionTypes from '../constants/authConstants';

export const authReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case actionTypes.SIGN_IN_USER:
            return {
                signedIn: action.payload.signedIn,
                user: action.payload.user,
            }

        case actionTypes.SIGN_OUT_USER:
            return {
                signedIn: action.payload.signedIn,
                user: action.payload.user,
            }

        default:
            return state;
    }
}