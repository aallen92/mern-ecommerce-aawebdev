import * as actionTypes from '../constants/checkoutConstants';

export const createPaymentIntentReducer = (state = { clientSecret: "" }, action) => {
    switch (action.type) {
        case actionTypes.CREATE_PAYMENT_INTENT_REQUEST:
            return {
                loading: true,
                clientSecret: "",
            }
        case actionTypes.CREATE_PAYMENT_INTENT_SUCCESS:
            return {
                loading: false,
                clientSecret: action.payload
            }
        case actionTypes.CREATE_PAYMENT_INTENT_FAILURE:
            return {
                loading: false,
            }
        default: return state;
    }
}