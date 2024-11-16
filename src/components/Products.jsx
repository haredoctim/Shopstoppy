import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // To track the hash in the URL

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (category) => {
    if (!category) {
      setFilter(data);
    } else {
      const updatedList = data.filter((item) => item.category === category);
      setFilter(updatedList);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const products = await response.json();
        setData(products);
        setFilter(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Listen to the URL hash and filter accordingly
    const hash = location.hash.replace("#", ""); // Remove the '#' from the hash
    if (hash) {
      filterProduct(hash);
    } else {
      setFilter(data); // Show all products if no hash is present
    }
  }, [location.hash, data]); // Run when hash or data changes

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-5">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelry
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>

      {filter.map((product) => (
        <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <div className="product-card">
            <Link to={`/product/${product.id}`}>
              <img
                className="product-img"
                src={product.image}
                alt={product.title}
                style={{ objectFit: "contain", height: "350px" }}
              />
            </Link>
            <div className="product-details">
              <h5 className="product-title">{product.title}</h5>
              <p className="product-description">
                {product.description.substring(0, 90)}...
              </p>
            </div>
            <ul className="product-price">
              <li>$ {product.price}</li>
            </ul>
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="btn btn-primary m-1">
                View Details
              </Link>
              <button
                className="btn btn-success m-1"
                onClick={() => {
                  toast.success("Added to cart");
                  addProduct(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <div>Loading...</div> : <ShowProducts />}
      </div>
    </div>
  );
};

export default Products;
