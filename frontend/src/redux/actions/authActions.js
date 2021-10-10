import * as actionTypes from '../constants/authConstants';

export const signInUser = (user) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SIGN_IN_USER,
        payload: {
            signedIn: true,
            user,
        }
    })
}

export const signOutUser = () => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SIGN_OUT_USER,
        payload: {
            signedIn: false,
            user: null,
        }
    })
}