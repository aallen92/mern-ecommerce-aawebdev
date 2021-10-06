import React from 'react';
import { Link } from 'react-router-dom';
import './AccountNav.css';

const AccountNav = () => {

    return (
        <div className='accountnav'>
            <ul className='accountnav__links'>
                <li>
                    <Link to='/account/profile'>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to='/account/orders'>
                        Orders
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AccountNav
