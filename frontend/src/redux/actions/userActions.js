import * as actionTypes from '../constants/userConstants';
import axios from 'axios';

export const signInUser = () => async (dispatch) => {
    try {
        dispatch ({
            type: actionTypes.SIGN_IN_USER_REQUEST,
        });

        const { data } = await axios.get("https://,erom")
    } catch (error) {
        
    }

}

export const signOutUser = () => async (dispatch) => {
    dispatch ({
        type: actionTypes.SIGN_OUT_USER,
        payload: {
            signedIn: false,
        }
    })
}