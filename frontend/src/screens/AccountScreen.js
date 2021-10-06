import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AccountNav from '../components/AccountNav';
import './AccountScreen.css';

const AccountScreen = ({history}) => {

    const user = useSelector(state => state.user);

    const signedIn = user.signedIn.signedIn

    useEffect(() => {
        if(!signedIn) {
            history.push("/");
        }
    })
    
    return (
        <div className='accountscreen'>
            <div className='accountscreen__nav'>
                <AccountNav />
            </div>
        </div>
    )
}

export default AccountScreen
