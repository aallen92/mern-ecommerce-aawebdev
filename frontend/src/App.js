import './App.css';
import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


// Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import PrivateScreen from './screens/PrivateScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';

// Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';
import { signInUser, signOutUser } from './redux/actions/userActions';
import { useDispatch } from 'react-redux';

function App() {

  const [sideToggle, setSideToggle] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
        dispatch(signInUser());
    }
    else {
      dispatch(signOutUser());
    }
  },[dispatch]);

  return (
    <Router>
      <Navbar click={() => setSideToggle(true)} />
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)} />
      <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      <main>
        <Switch>
          <PrivateRoute exact path="/private" component={PrivateScreen} />
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/product/:id" component={ProductScreen} />
          <Route exact path="/cart" component={CartScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
          <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
        </Switch>
      </main>
      {/* HomeScreen */}
      {/* ProductScreen */}
      {/* CartScreen */}
    </Router>
  );
}

export default App;
