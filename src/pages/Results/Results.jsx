import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import classes from "./Results.module.css";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/Loader/Loader"; // Import your Loader component

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { categoryName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Use async/await for cleaner code
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get(
          `${productUrl}/products/category/${categoryName}`
        );
        setResults(response.data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
        // Optionally, you could set an error state here to display an error message to the user
      } finally {
        setLoading(false); // Set loading to false, whether successful or not
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <>
      <Layout />
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
        <div className={classes.product_container}>
          {loading ? ( // Conditionally render based on loading state
            <Loader /> // Show Loader while loading
          ) : (
            results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default Results;
