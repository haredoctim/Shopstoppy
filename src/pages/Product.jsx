import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.handleCart); // Fetch cart state
  const dispatch = useDispatch();

  // Calculate quantity of the product in the cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.qty : 0;
  };

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row my-5">
            <div className="col-md-6">
              <img
                src={product.image}
                alt={product.title}
                className="img-fluid"
              />
            </div>
            <div className="col-md-6">
              <h2>{product.title}</h2>
              <h3>${product.price}</h3>
              <p>{product.description}</p>
              <button
                className="btn btn-dark"
                onClick={() => addProductToCart(product)}
              >
                Add to Cart ({getProductQuantity(product.id)})
              </button>
              <Link to="/cart" className="btn btn-outline-dark mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
