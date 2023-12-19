import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import logo from './logo.png';
import { white } from '@mui/material/colors';

const saveBasketToLocal = (userId, basket) => {
  localStorage.setItem(`basket_${userId}`, JSON.stringify(basket));
};

const loadBasketFromLocal = (userId) => {
  return JSON.parse(localStorage.getItem(`basket_${userId}`)) || [];
};

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      // Save current basket to localStorage
      saveBasketToLocal(user.uid, basket);
  
      // Sign out
      auth.signOut();
    }
  }
  
  
  

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={logo} alt="logo"
        />
        
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon style={{ color: 'white' }} className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        



        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon color="primary" />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
