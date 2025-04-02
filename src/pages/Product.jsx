import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import { ProductData } from "../data/ProductData.js";
import toast from "react-hot-toast";
import "../styles/Products.css"; // Using the existing CSS file

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
    if (getProductQuantity(product.id) >= product.quantity) {
      toast.error("Maximum available quantity reached!");
      return;
    }
    dispatch(addCart(product));
    toast.success("Item added to cart");
  };

  const removeProductFromCart = (product) => {
    dispatch(delCart(product));
    toast.error("Item removed from cart");
  };

  useEffect(() => {
    const findProduct = () => {
      setLoading(true);
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

  const BackgroundDecoration = () => (
    <div className="background-decoration">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.1}}>
        {[20, 30, 40, 50, 60, 70, 80, 90].map(y => (
          <path key={y} d={`M0,${y} Q25,${y-20} 50,${y} T100,${y}`} stroke="#c3a080" strokeWidth="1" fill="none" />
        ))}
      </svg>
    </div>
  );

  return (
    <div className="page-container curly-background">
      <BackgroundDecoration />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      ) : (
        <div className="products-container">
          <div className="products-header">
            <h1 className="page-title">Product Details</h1>
            
          </div>
          
          <div className="product-detail-wrapper">
            <div className="product-image-section">
              <div className="product-image-container" style={{height: "400px"}}>
                <img src={product.image} alt={product.title} className="product-img" />
              </div>
            </div>
            
            <div className="product-info-container">
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                
                <div className="product-meta">
                  {product.category && (
                    <span className="category-btn active" style={{cursor: "default"}}>
                      {product.category}
                    </span>
                  )}
                  {product.dateAdded && (
                    <span className="product-date">
                      Added on: {new Date(product.dateAdded).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <p className="product-price">Rs. {product.price}</p>
                
                <div className="product-stock">
                  {product.quantity > 0 ? (
                    <p className="product-quantity">In Stock: {product.quantity} available</p>
                  ) : (
                    <p className="out-of-stock">Out of Stock</p>
                  )}
                </div>
                
                <div className="product-description" style={{fontSize: "1rem", marginTop: "1.5rem"}}>
                  <h3 style={{marginBottom: "0.75rem", color: "var(--primary-color)"}}>Description</h3>
                  <p>{product.description}</p>
                </div>
              </div>
              
              <div className="product-actions">
                {product.quantity > 0 ? (
                  getProductQuantity(product.id) === 0 ? (
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addProductToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <div className="quantity-control">
                      <button 
                        className="quantity-btn"
                        onClick={() => removeProductFromCart(product)}
                      >
                        -
                      </button>
                      <div className="quantity-display">
                        {getProductQuantity(product.id)}
                      </div>
                      <button 
                        className={`quantity-btn ${getProductQuantity(product.id) >= product.quantity ? 'disabled' : ''}`}
                        onClick={() => addProductToCart(product)}
                        disabled={getProductQuantity(product.id) >= product.quantity}
                      >
                        +
                      </button>
                    </div>
                  )
                ) : (
                  <button 
                    className="add-to-cart-btn" 
                    style={{backgroundColor: "#d9534f", cursor: "not-allowed"}}
                    disabled
                  >
                    OUT OF STOCK
                  </button>
                )}
                <Link to="/cart" className="view-details-btn">
                  GO TO CART
                </Link>
                <Link to="/product" className="view-details-btn">
              ← Back to Products
            </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .curly-background { 
          position: relative; 
          overflow: hidden; 
          min-height: 80vh;
        }
        
        .product-detail-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
          padding: 0;
        }
        
        .product-info-container {
          display: flex;
          flex-direction: column;
        }
        
        .product-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin: 1rem 0;
        }
        
        .product-date {
          color: #666;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
        }
        
        .out-of-stock {
          color: #d9534f;
          font-weight: 500;
        }
        
        @media (min-width: 768px) {
          .product-detail-wrapper {
            flex-direction: row;
          }
          
          .product-image-section {
            flex: 1;
          }
          
          .product-info-container {
            flex: 1;
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Product;