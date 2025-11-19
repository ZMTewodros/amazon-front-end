import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "../product/ProductCard";
import classes from "./Product.module.css";
import Loader from "../../components/Loader/Loader";

function Product() {
    const [products, setProducts] = useState([]); // Corrected variable name to match the API response
    const [isLoading, setIsLoading] = useState(true); // Initialize to true, to show loading initially

    useEffect(() => {
        setIsLoading(true); // Set loading to true before the API call
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err); // Log the error for debugging
                
            })
            .finally(() => {
                setIsLoading(false); // Set loading to false whether the request succeeds or fails
            });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <>
            {isLoading ? (
                <Loader /> // Show Loader if loading
            ) : (
                <section className={classes.product_container}>
                    {products.map((singleProduct) => (
                        <ProductCard key={singleProduct.id} product={singleProduct} />
                    ))}
                </section>
            )}
        </>
    );
}

export default Product;

