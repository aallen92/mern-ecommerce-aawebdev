import * as actionTypes from '../constants/checkoutConstants';
import axios from 'axios';

export const createPaymentIntent = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.CREATE_PAYMENT_INTENT_REQUEST,
        })

        axios.get("https://mern-ecommerce-aawebdev.herokuapp.com/checkout/create-payment-intent", {
            body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: actionTypes.CREATE_PAYMENT_INTENT_SUCCESS,
                    payload: data.clientSecret,
                });
            })
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PAYMENT_INTENT_FAILURE,
        })
    }
}

export const checkout = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.CHECKOUT_REQUEST
        });

        const { checkoutResult } = await axios.get("");

        dispatch({
            type: actionTypes.CHECKOUT_SUCCESS,
            payload: checkoutResult
        });
    } catch (error) {
        dispatch({
            type: actionTypes.CHECKOUT_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}
