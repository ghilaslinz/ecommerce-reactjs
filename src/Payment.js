import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: 'post',
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        }
    
        getClientSecret();
    }, [basket]);
    
    
    useEffect(() => {
        console.log("Fetched Client Secret:", clientSecret);
    }, [clientSecret]); // Th

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        console.log("Client Secret on Frontend:", clientSecret);
        // Check if Stripe, elements, clientSecret, and user UID are available
        if (!stripe ) {
            console.error("Missing required stripe information for payment processing");
            setError("Payment processing error. Please try again.");
            setProcessing(false);
            return;
        } else if(!elements){
            console.error("Missing required elements information for payment processing");
            setError("Payment processing error. Please try again.");
            setProcessing(false);
        }else if(!clientSecret){
            console.error("Missing required clientssecret information for payment processing");
            setError("Payment processing error. Please try again.");
            setProcessing(false);
        }else if(!user?.uid){
            console.error("Missing required user id information for payment processing");
            setError("Payment processing error. Please try again.");
            setProcessing(false);
        }
    
        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });
    
            if (payload.error) {
                setError(payload.error.message);
                setProcessing(false);
            } else if (payload.paymentIntent.status === 'succeeded') {
                // Firebase operation
                db.collection('users')
                  .doc(user.uid)
                  .collection('orders')
                  .doc(payload.paymentIntent.id)
                  .set({
                      basket: basket,
                      amount: payload.paymentIntent.amount,
                      created: payload.paymentIntent.created
                  });
    
                setSucceeded(true);
                setError(null);
                setProcessing(false);
                dispatch({ type: 'EMPTY_BASKET' });
                history.replace('/orders');
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            setError("Payment failed. Please try again.");
            setProcessing(false);
        }
    };
    

    const handleChange = event => {
        // Listen for changes in the CardElement
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
