import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "./currencyformatter/CurrencyFormat";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProvider/DataProvider";
import { useContext } from 'react'; // Import useContext
import { ADD_TO_BASKET } from '../../utility/action.type';

function ProductCard({ product, flex ,renderDesc,showAddToCart=true}) {
  const { image, title, rating, price, id, description } = product;  //Include Description
  const [state, dispatch] = useContext(DataContext);
  console.log(state)

  const addToCart = () => {
    dispatch({
      type: ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description // include description
      }
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} 
         />
      </Link>
      <div>
        <h3>{title}</h3>
        <div>
        {renderDesc&&<div style={{maxWidth:"750px"}}>{description}</div>}
        </div>
        
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />

          {/* rating counter */}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {showAddToCart&&(
        <button className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
        )
}
      </div>
    </div>
  );
}

export default ProductCard;

