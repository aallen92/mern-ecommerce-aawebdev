import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
import './CheckoutScreen.css';

const CheckoutScreen = () => {
    const dispatch = useDispatch();

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
    const [disablePayNow, setDisablePayNow] = useState(true);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const hideBillingChange = () => {
        setHideBilling(!hideBilling)
        if (!hideBilling) {
            setBillingAddress({
                addressOne: shippingAddress.addressOne,
                addressTwo: shippingAddress.addressTwo,
                city: shippingAddress.city,
                postcode: shippingAddress.postcode,
            });
        } else {
            setBillingAddress({
                addressOne: "",
                addressTwo: "",
                city: "",
                postcode: "",
            });
        }
    }

    useEffect(() => {
        if (buyerDetails.firstName === "" || buyerDetails.lastName === "" || buyerDetails.email === "" || buyerDetails.contactNumber === "" ||
            shippingAddress.addressOne === "" || shippingAddress.postcode === "" || billingAddress.addressOne === "" || billingAddress.postcode === "") {
            setDisablePayNow(true);
        } else {
            setDisablePayNow(false);
        }
    }, [buyerDetails, shippingAddress, billingAddress]);

    return (
        <div className='checkoutscreen'>
            <div className={cartItems.length === 0 ? 'hidden' : 'checkoutscreen__left'}>
                <h2 className='checkoutscreen__heading'>
                    Order Details
                </h2>
                <h3 className='checkoutscreen__subheading'>
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
                <h3 className='checkoutscreen__subheading'>
                    Shipping Address
                </h3>
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
                <h3 className='checkoutscreen__subheading'>
                    Billing Address
                </h3>
                <div className="hideBilling">
                    <input
                        name="hideBilling"
                        id="hideBilling"
                        type="checkbox"
                        value={hideBilling}
                        onChange={hideBillingChange}
                    />
                    <label
                        htmlFor="hideBilling"
                    >
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
                <h2 className='checkoutscreen__heading'>
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
                                <h3 className='checkoutscreen__subheading'>
                                    Cart Items
                                </h3>
                                <CartItem item={item} qtyChangeHandler={qtyChangeHandler} removeFromCart={removeFromCartHandler} />
                            </div>
                        )
                    )}
                </div>
                <div>
                    {cartItems.length === 0 ? (
                        <></>
                    ) : (
                        <>
                            <h3 className='checkoutscreen__subheading'>
                                Payment Details
                            </h3>
                            <CheckoutForm
                                cartItems={cartItems}
                                disablePayNow={disablePayNow}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckoutScreen
