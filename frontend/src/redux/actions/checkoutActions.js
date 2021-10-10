import * as actionTypes from '../constants/checkoutConstants';
import axios from 'axios';

export const createPaymentIntent = (cartItems) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.CREATE_PAYMENT_INTENT_REQUEST,
        })

        axios.post("http://localhost:5000/api/checkout/create-payment-intent", {
            body: JSON.stringify(cartItems)
        })
            .then(res => {
                return res.data;
            })
            .then(data => {
                dispatch({
                    type: actionTypes.CREATE_PAYMENT_INTENT_SUCCESS,
                    payload: data,
                });
            })
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PAYMENT_INTENT_FAILURE,
        })
    }
}