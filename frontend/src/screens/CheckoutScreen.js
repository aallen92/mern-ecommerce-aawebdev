import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import './CheckoutScreen.css';

const CheckoutScreen = () => {
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);

    const user = auth.user;

    const [buyerDetails, setBuyerDetails] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        email: "",
        userID: "",
    });

    const [shippingAddress, setShippingAddress] = useState({
        addressOne: "",
        addressTwo: "",
        city: "",
        postcode: "",
    });
    const [billingAddress, setBillingAddress] = useState({
        addressOne: "",
        addressTwo: "",
        city: "",
        postcode: "",
    });

    const [hideBilling, setHideBilling] = useState(false);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    return (
        <div className='checkoutscreen'>
            <div className='checkoutscreen__top'>
                <h2>
                    Checkout
                </h2>
            </div>
            <div className='checkoutscreen__left'>
                <h3>
                    Personal Details
                </h3>
                <form className='checkoutscreen__form'>
                    <div className='checkoutscreen__formOption'>
                        <label>
                            First name:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            value={buyerDetails.firstName}
                            onChange={(e) => setBuyerDetails({ ...buyerDetails, firstName: (e.target.value) })}
                        />
                    </div>
                    <div className='checkoutscreen__formOption'>
                        <label>
                            Last name:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            value={buyerDetails.lastName}
                            onChange={(e) => setBuyerDetails({ ...buyerDetails, lastName: (e.target.value) })}
                        />
                    </div>
                    <div className='checkoutscreen__formOption'>
                        <label>
                            Contact Number:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter contact Number"
                            value={buyerDetails.contactNumber}
                            onChange={(e) => setBuyerDetails({ ...buyerDetails, contactNumber: (e.target.value) })}
                        />
                    </div>
                    <div className='checkoutscreen__formOption'>
                        <label>
                            Email Address:
                        </label>
                        <input
                            type="text"
                            placeholder="Enter email address"
                            value={buyerDetails.email}
                            onChange={(e) => setBuyerDetails({ ...buyerDetails, email: (e.target.value) })}
                        />
                    </div>
                </form>
                <h3>
                    Shipping & Billing Address
                </h3>
                <h4>
                    Shipping Address
                </h4>
                <form className="checkoutscreen__form">
                    <div className="checkoutscreen__formOption">
                        <label>
                            Address Line One
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Address Line One"
                            value={shippingAddress.addressone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, addressOne: (e.target.value) })}
                        />
                    </div>
                    <div className="checkoutscreen__formOption">
                        <label>
                            Address Line Two
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Address Line Two"
                            value={shippingAddress.addressTwo}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, addressTwo: (e.target.value) })}
                        />
                    </div>
                    <div className="checkoutscreen__formOption">
                        <label>
                            Town/City
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Town/City"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: (e.target.value) })}
                        />
                    </div>
                    <div className="checkoutscreen__formOption">
                        <label>
                            Postcode
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Postcode"
                            value={shippingAddress.postcode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, postcode: (e.target.value) })}
                        />
                    </div>
                </form>
                <h4>
                    Billing Address
                </h4>
                <div>
                    <input
                        type="checkbox"
                        value={hideBilling}
                        onChange={() => setHideBilling(!hideBilling)}
                    />
                    <label>
                        Same as shipping
                    </label>
                </div>
                {hideBilling ? "" : (
                    <form className="checkoutscreen__form">
                        <div className="checkoutscreen__formOption">
                            <label>
                                Address Line One
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Address Line One"
                                value={billingAddress.addressOne}
                                onChange={(e) => setBillingAddress({ ...billingAddress, addressOne: (e.target.value) })}
                            />
                        </div>
                        <div className="checkoutscreen__formOption">
                            <label>
                                Address Line Two
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Address Line Two"
                                value={billingAddress.addressTwo}
                                onChange={(e) => setBillingAddress({ ...billingAddress, addressTwo: (e.target.value) })}
                            />
                        </div>
                        <div className="checkoutscreen__formOption">
                            <label>
                                Town/City
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Town/City"
                                value={billingAddress.city}
                                onChange={(e) => setBillingAddress({ ...billingAddress, city: (e.target.value) })}
                            />
                        </div>
                        <div className="checkoutscreen__formOption">
                            <label>
                                Postcode
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Postcode"
                                value={billingAddress.postcode}
                                onChange={(e) => setBillingAddress({ ...billingAddress, postcode: (e.target.value) })}
                            />
                        </div>
                    </form>
                )}
            </div>
            <div className='checkoutscreen__right'>
                <h2>
                    Order Summary
                </h2>
                <div>
                    {cartItems.length === 0 ? (
                        <div>
                            Your cart is empty <Link to="/">Go Back</Link>
                        </div>
                    ) : (
                        cartItems.map((item) =>
                            <div key={item.product}>
                                <h3>
                                    Cart Items
                                </h3>
                                <CartItem item={item} qtyChangeHandler={qtyChangeHandler} removeFromCart={removeFromCartHandler} />
                            </div>
                        )
                    )}
                </div>
                <div>
                    <h3>
                        Payment Details
                    </h3>
                    <CheckoutForm
                        shippingAddress={shippingAddress}
                        billingAddress={billingAddress}
                        buyerDetails={buyerDetails}
                        cartItems={cartItems}
                    />
                </div>
            </div>
        </div>
    )
}

export default CheckoutScreen
