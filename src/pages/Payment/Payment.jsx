import React, { useContext,useState } from "react";
import classes from './Payment.module.css'; // Corrected path
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard"
import CurrencyFormat from "../../components/product/currencyformatter/CurrencyFormat"
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import {axiosInstance} from "../../../src/Api/axios"
import {ClipLoader} from 'react-spinners'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../utility/firebase";
import{useNavigate} from "react-router-dom"



function Payment() {
  const [{ user, basket },dispatch] = useContext(DataContext);

  const totalItem = Array.isArray(basket)
    ? basket.reduce((amount, item) => amount + (item.amount || 1), 0)
    : 0;
     const total=basket.reduce((amount,item)=>{
   return item.price+amount
  },0)
 const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate()
  const[cardError,setCardError]=useState(null)
  const [processing,setProcessing]=useState(false)
   const handleChange = (e) => {
    if (e?.error?.message) {
      setCardError(e.error.message);
    } else {
      setCardError(null); // Clear the error if there isn't one
    }
  };
  
  const handlePayment=async (e)=>{
     e.preventDefault()
     try {
      setProcessing(true)
      // contact backend function to get the client secret
      const response=await axiosInstance({
        method:"POST",
        url:`/payment/create?total=${total*100}`
     })

     const clientSecret=response.data?.clientSecret
    //  client side (react side confirmation)
     const {paymentIntent}=await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method:{
        card:elements.getElement(CardElement)
      }
      }
     ) 
     
      //  after confirmation create  fire base database

      // old way👇👇👇 

    //  await db
    //  .collection("users")
    //  .doc(user.uid)
    //  .collection("order")
    //  .doc(paymentIntent.id)
    //  .set({
    //   basket:basket,
    //   amount:paymentIntent.amount,
    //   created:paymentIntent.created,
    //  })
    //  console.log("order written to fire store")

      // latest👇👇

      if (!user?.uid) {
  throw new Error("User UID is missing");
}

const orderRef = doc(db, "users", user.uid, "orders", paymentIntent.id);

// Write data
await setDoc(orderRef, {
  basket: basket,
  amount: paymentIntent.amount,
  created: paymentIntent.created,
});

console.log("Order written to Firestore");
// make empty basket

 dispatch({type:"EMPTY_BASKET"})

        setProcessing(false)
        navigate("/orders",{state:{msg:"you have placed new order"}})
      
     } catch (error) {
      console.error("error writing",error)
      alert("failed to write" +error.message)
    

      setProcessing(false)
      
     }
   
  
  }
  
  return (
    <>
      <Layout />
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          {user ? (  // Conditional rendering for user information
            <div>
              <div>{user.email}</div>
              <div>123 react </div>
              <div>Ethiopia,Debretabor</div>
            </div>
          ) : (
            <div>No delivery address available.</div> // Placeholder if no user
          )}
        </div>
      </section>
      {/* address */}
      <hr />
      {/* product */}
      <div className={classes.flex}>
        <h3>Review items and delivery</h3>
        <div>
          {basket?.map((item) => (
            <ProductCard key={item.id} product={item} flex={true} showAddToCart={false} />   //added item, flex and a Key for component efficiency
          ))}
        </div>
      </div>
      <hr />
      {/* card item */}
      <div className={classes.flex}>
        <h3>Payment Methods</h3>
        <div className={classes.payment_card_container}>
          <div className={classes.payment_details}>
            <form onSubmit={handlePayment}>
              {/* error */}
              {cardError && <small style={{color:"red"}}>{cardError}</small>}
              {/* card number */}
              <CardElement onChange={handleChange} />
              {/* price */}
              <div className={classes.payment_price}>
                <div>
                  <span  style={{display:"flex",gap:"10px"}}><p>Total Order |</p><CurrencyFormat amount={total}/></span>

                  </div>
                  <button type="submit">
                    {
                      processing?(
                        <div className={classes.loading}>
                          <ClipLoader color="gray"size={12}/>
                          <p>please wait..</p>
                        </div>

                      ):"Pay Now"
                    }
                    
                    
                    </button>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );

}

export default Payment;

