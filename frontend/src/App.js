import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import AccountScreen from './screens/AccountScreen';

// Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';

// Routing
import { signInUser, signOutUser } from './redux/actions/authActions';
import { useDispatch } from 'react-redux';
import CheckoutScreen from './screens/CheckoutScreen';

const stripePromise = loadStripe("pk_test_51Jimn1AuWhOT7FbIarv3j682dY1bbkK4QpSN5siIWnW3iXZKDcQL3fN7U7dOxlIAkEARDZv2lEV9ZNj8Gbym1s5z00YHOQlRAL");

function App() {

  const [sideToggle, setSideToggle] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      const fetchUser = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        try {
          const { data } = await axios.get("https://mern-ecommerce-aawebdev.herokuapp.com/api/auth/userbyid", config);
          dispatch(signInUser(data.user));
        } catch (error) {
          localStorage.removeItem("authToken");
        }
      };
      fetchUser();

    }
    else {
      dispatch(signOutUser());
    }
  }, [dispatch]);

  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Navbar click={() => setSideToggle(true)} />
        <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
        <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
        <main>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
            <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
            <Route exact path="/account" component={AccountScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart" component={CartScreen} />
            <Route exact path="/checkout" component={CheckoutScreen} />
          </Switch>
        </main>
      </Router>
    </Elements>
  );
}

export default App;
