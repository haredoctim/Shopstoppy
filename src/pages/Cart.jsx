import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ProductData } from "../data/ProductData.js"; // Import product data to check quantities

const Cart = () => {
  const cart = useSelector((state) => state.handleCart); // Cart state
  const dispatch = useDispatch();

  // Get the product data for a cart item
  const getProductData = (productId) => {
    return ProductData.find(product => product.id === productId);
  };

  const increaseItemQty = (item) => {
    const productData = getProductData(item.id);
    
    if (!productData) {
      toast.error("Product information not available");
      return;
    }
    
    // Check if adding would exceed the available quantity
    if (item.qty >= productData.quantity) {
      toast.error(`Maximum available quantity (${productData.quantity}) reached!`);
      return;
    }
    
    dispatch(addCart(item));
    toast.success("Item quantity increased");
  };

  const decreaseItemQty = (product) => {
    dispatch(delCart(product));
    if (product.qty === 1) {
      toast.error("Item removed from cart");
    } else {
      toast.success("Item quantity decreased");
    }
  };

  const EmptyCart = () => (
    <div className="text-center my-5 py-5">
      <h3>Your cart is empty!</h3>
      <Link to="/product" className="btn btn-dark mt-3">
        Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? (subtotal >= 1000 ? 0 : 60) : 0; // Free shipping over 1000

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => {
              const productData = getProductData(item.id);
              const isMaxQuantity = productData && item.qty >= productData.quantity;
              
              return (
                <div key={item.id} className="card mb-3">
                  <div className="row g-0 p-2">
                    <div className="col-md-2 d-flex align-items-center justify-content-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px", objectFit: "contain" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text mb-1">Price: ₹{item.price.toFixed(2)}</p>
                        <p className="card-text mb-1">
                          Subtotal: ₹{(item.price * item.qty).toFixed(2)}
                        </p>
                        {productData && (
                          <small className="text-muted">
                            Available: {productData.quantity}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => decreaseItemQty(item)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <span className="btn btn-outline-dark disabled">
                          {item.qty}
                        </span>
                        <button
                          className={`btn btn-outline-dark ${isMaxQuantity ? 'disabled' : ''}`}
                          onClick={() => increaseItemQty(item)}
                          disabled={isMaxQuantity}
                          style={{ 
                            opacity: isMaxQuantity ? 0.6 : 1,
                            cursor: isMaxQuantity ? 'not-allowed' : 'pointer'
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0">Order Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 && subtotal > 0 ? (
                      <span className="text-success">Free Shipping</span>
                    ) : (
                      `₹${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal > 0 && subtotal < 1000 && (
                  <div className="alert alert-info small mt-2">
                    Add ₹{(1000 - subtotal).toFixed(2)} more to get free shipping!
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-2 fw-bold">
                  <span>Total:</span>
                  <span>₹{(subtotal + shipping).toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn btn-dark w-100 mt-3">
                  Proceed to Checkout
                </Link>
                <Link to="/product" className="btn btn-outline-dark w-100 mt-2">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1"> {/* This will push the footer down */}
        <div className="container my-4">
          <h2 className="text-center">Shopping Cart</h2>
          {cart.length === 0 ? <EmptyCart /> : <ShowCart />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;