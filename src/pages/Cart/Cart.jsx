import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../components/product/ProductCard";
import classes from "./Cart.module.css"; // Import css style
import CurrencyFormat from "../../components/product/currencyformatter/CurrencyFormat"
import { Link } from 'react-router-dom'


function Cart() {
  const [{ basket }] = useContext(DataContext);
  const total=basket.reduce((amount,item)=>{
   return item.price+amount
  },0)
  return (
    <>
    <Layout/>
      <section className={classes.container}>
        <div>
          <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket </h3>
          </div>
          <hr />
          <div className={classes.cartContainer}>
            {/* cart-container style*/}
            {basket?.length == 0 ? (
              <p>Opps! No item in your cart</p>
            ) : (
              basket?.map((item, i) => {
                return (
                  <div className={classes.cartItem} key={i}>

                    <ProductCard
                      key={i}
                      product={item}
                      renderDesc={true}
                      showAddToCart={false}
                      flex={true}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
        {basket?.length!==0&&(

        <div className={classes.subtotal}>
          <div>
            <p>Subtotal({basket?.length} items)</p>
            <CurrencyFormat amount={total}/>
          </div>
          <div className={classes.subtotalCheckbox}>
          <span><input type="checkbox" />
          <small>This order contains a gift</small>
          </span>
          </div>
          <Link to="/payment">continue to checkout</Link>

        </div>
          )}
      </section>
      </>
    
  );
}
export default Cart;
