import * as actionTypes from '../constants/userConstants';

export const signInUser = () => async (dispatch, getState) => {
    dispatch ({
        type: actionTypes.SIGN_IN_USER,
        payload: {
            signedIn: true,
        }
    })
}

export const signOutUser = () => async (dispatch, getState) => {
    dispatch ({
        type: actionTypes.SIGN_OUT_USER,
        payload: {
            signedIn: false,
        }
    })
}