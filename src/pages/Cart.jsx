import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.handleCart); // Cart state
  const dispatch = useDispatch();

  const increaseItemQty = (product) => {
    dispatch(addCart(product));
  };

  const decreaseItemQty = (product) => {
    dispatch(delCart(product));
  };

  const EmptyCart = () => (
    <div className="text-center my-5">
      <h3>Your cart is empty!</h3>
      <Link to="/" className="btn btn-dark mt-3">
        Continue Shopping
      </Link>
    </div>
  );

  const ShowCart = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 30 : 0; // Shipping cost

    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item.id} className="d-flex align-items-center my-4">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "100px", height: "75px" }}
                  className="img-thumbnail"
                />
                <div className="mx-3">
                  <h5>{item.title}</h5>
                  <p>
                    ${item.price} x {item.qty} = ${item.price * item.qty}
                  </p>
                </div>
                <div className="ms-auto">
                  <button
                    className="btn btn-outline-dark btn-sm mx-1"
                    onClick={() => decreaseItemQty(item)}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="btn btn-outline-dark btn-sm mx-1"
                    onClick={() => increaseItemQty(item)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Shipping: ${shipping.toFixed(2)}</p>
            <h5>Total: ${(subtotal + shipping).toFixed(2)}</h5>
            <Link to="/checkout" className="btn btn-dark w-100 mt-3">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {cart.length === 0 ? <EmptyCart /> : <ShowCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
