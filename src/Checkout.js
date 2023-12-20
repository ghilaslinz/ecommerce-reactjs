import React, { useEffect } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user, history]);


  return (
    <div className="checkout">
      <div className="checkout__left">
       <div  className="checkout__ad"></div>
       

        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
        
          {basket.length > 0 ? (
            basket.map((item, index) => (
              <CheckoutProduct
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <div className="checkout__emptyMessage">
            <p>Your basket is empty.</p>
            <Link to="/">Start shopping now!</Link>
          </div>
          )}


        </div>
      </div>

      <div className="checkout__right">
      {basket.length > 0 && <Subtotal />}
      </div>
    </div>
  );
}

export default Checkout;
