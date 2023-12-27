import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SignUp from "./SignUp";

const stripePromise = loadStripe(
 "pk_test_51OPnXfCtmH0NLR6yUWaDFt6BcsLTsV3sHEpgPHwaOESz0xEy9ah0MSwXVOqQ06GC5sXbn7pkdfWLmPWvfvBbdlyc009t33ehWU"
);

const saveBasketToLocal = (userId, basket) => {
  localStorage.setItem(`basket_${userId}`, JSON.stringify(basket));
};

const loadBasketFromLocal = (userId) => {
  return JSON.parse(localStorage.getItem(`basket_${userId}`)) || [];
};


function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
  
        // Load user's basket from localStorage
        const userBasket = loadBasketFromLocal(authUser.uid);
        dispatch({
          type: 'SET_BASKET',
          basket: userBasket,
        });
      } else {
        // User logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
        dispatch({
          type: 'EMPTY_BASKET',
        });
      }
    });
  }, [dispatch]);
  
  

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            {user ? <Header /> : null}
            {user ? <Home /> : <Login />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
