import * as actionTypes from '../constants/userConstants';

export const userReducer = (state = { signedIn: false }, action) => {
    switch(action.type) {
        case actionTypes.SIGN_IN_USER_REQUEST:
            return {
                loading: true,
                signedIn: false,
                products: []
            }
        
        case actionTypes.SIGN_OUT_USER:
            const signedOut = action.payload;
            return {
                signedIn: signedOut,
            }

        default:
            return state;
    }
}