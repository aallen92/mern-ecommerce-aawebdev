import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../redux/actions/checkoutActions';
import './CheckoutForm.css';
import { resetCart } from '../redux/actions/cartActions';


export default function CheckoutForm({ cartItems, disablePayNow }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createPaymentIntent(cartItems));
  }, [cartItems, dispatch]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
    console.log(clientSecret);
  };

  const clientSecret = useSelector(state => state.createPaymentIntentReducer.clientSecret);

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      dispatch(resetCart());
    }
  };

  return (
    <div>
      {disablePayNow ? (
        <div>
          <p>
            Provide your details to continue to payment
          </p>
        </div>
      ) : (

        <form id="payment-form" onSubmit={handleSubmit} className='payment__form'>
          <CardElement className={succeeded ? "hidden" : "payment__input"} id="card-element" options={cardStyle} onChange={handleChange} />
          <button
            className={succeeded ? "hidden" : ""}
            disabled={processing || disabled}
            id="submit"
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay Now"
              )}
            </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* Show a success message upon completion */}
          <div className={succeeded ? "result-message" : "result-message hidden"}>
            <p>
              Payment succeeded!
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
