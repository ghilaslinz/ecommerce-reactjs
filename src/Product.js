import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const addToBasket = () => {
    // New item to add
    const newItem = {
      id: id,
      title: title,
      image: image,
      price: price,
      rating: rating,
    };

    // Dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: newItem,
    });

    // Update basket in localStorage
    if (user) {
      const updatedBasket = [...basket, newItem];
      localStorage.setItem(`basket_${user.uid}`, JSON.stringify(updatedBasket));
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>{price}</strong>
          <small>€</small>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
