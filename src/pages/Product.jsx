import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { ProductData } from "../data/ProductData.js"; // Import ProductData instead of using API

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  // Calculate quantity of the product in the cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === parseInt(productId) || item.id === productId);
    return cartItem ? cartItem.qty : 0;
  };

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    // Find the product from ProductData instead of fetching from API
    const findProduct = () => {
      setLoading(true);
      // Find the product with the matching id
      const foundProduct = ProductData.find(item => item.id === parseInt(id) || item.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        console.error("Product not found");
      }
      
      setLoading(false);
    };
    
    findProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="row my-5">
            <div className="col-md-6 mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{product.title}</h2>
              <h3 className="text-success mb-4">${product.price}</h3>
              
              {product.category && (
                <p className="badge bg-secondary mb-3">{product.category}</p>
              )}
              
              <div className="mb-4">
                <h4 className="mb-2">Description</h4>
                <p className="lead">{product.description}</p>
              </div>
              
              {product.dateAdded && (
                <p className="text-muted mb-4">
                  <small>Added on: {new Date(product.dateAdded).toLocaleDateString()}</small>
                </p>
              )}
              
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => addProductToCart(product)}
                >
                  Add to Cart {getProductQuantity(product.id) > 0 && 
                    `(${getProductQuantity(product.id)} in cart)`}
                </button>
                <Link to="/cart" className="btn btn-outline-dark">
                  Go to Cart
                </Link>
                <Link to="/products" className="btn btn-outline-secondary">
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;