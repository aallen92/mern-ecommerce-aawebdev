import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../redux/actions/userActions';


const SideDrawer = ({show, click}) => {
    const sideDrawerClass = ["sidedrawer"];
    const dispatch = useDispatch();

    if(show) {
        sideDrawerClass.push("show");
    }

    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;
    const signedIn = user.signedIn.signedIn


    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
    }

    const logoutClick = () => {
        dispatch(signOutUser());
        localStorage.removeItem("authToken");
        console.log(signedIn);
    }

    return (
        <div className={sideDrawerClass.join(" ")}>
            <ul className="sidedrawer__links" onClick={click}>
                <li>
                    <Link to="/cart">
                        <i className="fas fa-shopping-cart"></i>
                        <span>
                            Cart <span className='sidedrawer__cartbadge'>{getCartCount()}</span>
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Shop
                    </Link>
                </li>
                <li className={signedIn ? "hidden" : ""}>
                    <Link to='/login'>
                        Log In
                    </Link>
                </li>
                <li className={signedIn ? "" : "hidden"}>
                    <button onClick={logoutClick}>
                        Log Out
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default SideDrawer
