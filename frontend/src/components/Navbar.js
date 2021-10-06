import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutUser } from '../redux/actions/userActions';


const Navbar = ({ click }) => {

    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const { cartItems } = cart;
    const signedIn = user.user.signedIn
    

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => qty + Number(item.qty), 0);
    }

    const logoutClick = () => {
        dispatch(signOutUser());
        localStorage.removeItem("authToken");
        console.log(signedIn);
    }

    return (
        <nav className='navbar'>
           <div className='navbar__logo'>
               <Link to='/'>
                    <h2>
                        aaWebDev Ecommerce Site
                    </h2>
                </Link>
            </div>
            <ul className='navbar__links'>
                <li>
                    <Link to='/cart' className='cart__link'>
                        <i className='fas fa-shopping-cart'>

                        </i>
                        <span>
                            Cart
                        </span>
                        <span className="cartlogo__badge">{getCartCount()}</span>
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        Shop
                    </Link>
                </li>
                <li className={signedIn ? "" : "hidden"}>
                    <Link to='/account'>
                        Account
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
            <div className="hamburger__menu" onClick={click}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar
