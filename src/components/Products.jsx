import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ProductData } from "../data/ProductData.js";
import "../styles/Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("A-Z");
  const dispatch = useDispatch();
  const location = useLocation();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // Function to filter products based on category
  const filterProduct = useCallback(
    (category) => {
      let filtered = category ? data.filter((item) => item.category === category) : data;
      setFilteredProducts(filtered);
    },
    [data]
  );

  // Function to sort products
  const sortProducts = useCallback(
    (option, products) => {
      let sortedProducts = [...products];
      switch (option) {
        case "A-Z":
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "Date Added (Newest)":
          sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
          break;
        case "Date Added (Oldest)":
          sortedProducts.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
          break;
        case "Price (Low to High)":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "Price (High to Low)":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
      setFilteredProducts(sortedProducts);
    },
    []
  );

  // Load product data
  useEffect(() => {
    setData(ProductData);
    setFilteredProducts(ProductData);
    setLoading(false);
  }, []);

  // Handle URL hash change for category filtering
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      filterProduct(hash);
    } else {
      setFilteredProducts(data);
    }
  }, [location.hash, data, filterProduct]);

  // Sort products when the sort option changes
  useEffect(() => {
    sortProducts(sortOption, filteredProducts);
  }, [sortOption, sortProducts]);

  const ShowProducts = () => (
    <>
      <div className="buttons text-center py-3">
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct(null)}>All</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Paintings")}>Paintings</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("EpoxyArt")}>EpoxyArt</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("Handicraft")}>Handicraft</button>
        <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("FabricWork")}>FabricWork</button>
      </div>

      <div className="sort-options text-center py-3">
        <select className="form-select w-auto d-inline-block" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="A-Z">A-Z</option>
          <option value="Date Added (Newest)">Date Added (Newest)</option>
          <option value="Date Added (Oldest)">Date Added (Oldest)</option>
          <option value="Price (Low to High)">Price (Low to High)</option>
          <option value="Price (High to Low)">Price (High to Low)</option>
        </select>
      </div>

      <div className="products-container">
        <h2 className="section-title">Latest Products</h2>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="product-img"
                />
              </Link>
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description.substring(0, 90)}...</p>
                <p className="product-price">${product.price}</p>
              </div>
              <button 
                className="buy-button" 
                onClick={() => { 
                  toast.success("Added to cart"); 
                  addProduct(product); 
                }}
              >
                Add to Cart
              </button>
              <Link to={`/product/${product.id}`} className="btn btn-primary mt-2" style={{width: '100%'}}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
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