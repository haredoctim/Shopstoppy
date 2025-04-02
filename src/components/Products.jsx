import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { ProductData } from "../data/ProductData.js";
import "../styles/Products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("A-Z");
  const [activeCategory, setActiveCategory] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.handleCart);
  const location = useLocation();

  // Get quantity of a product in cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find((item) => item.id === productId);
    return cartItem ? cartItem.qty : 0;
  };

  // Handle cart operations
  const addProduct = (product) => {
    if (getProductQuantity(product.id) >= product.quantity) {
      toast.error("Maximum available quantity reached!");
      return;
    }
    dispatch(addCart(product));
    toast.success("Item added to cart");
  };

  const removeProduct = (product) => {
    dispatch(delCart(product));
    toast.error("Item removed from cart");
  };

  // Filter products by category
  const filterProduct = useCallback((category) => {
    setActiveCategory(category);
    setFilteredProducts(category ? data.filter(item => item.category === category) : data);
  }, [data]);

  // Sort products based on selected option
  const sortProducts = useCallback((option, products) => {
    const sortedProducts = [...products];
    switch (option) {
      case "A-Z": sortedProducts.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "Date Added (Newest)": sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
      case "Date Added (Oldest)": sortedProducts.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); break;
      case "Price (Low to High)": sortedProducts.sort((a, b) => a.price - b.price); break;
      case "Price (High to Low)": sortedProducts.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    setFilteredProducts(sortedProducts);
  }, []);

  // Initialize data
  useEffect(() => {
    setData(ProductData);
    setFilteredProducts(ProductData);
    setLoading(false);
  }, []);
  
  // Handle URL parameters for category filtering
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    
    if (hash) filterProduct(hash);
    else if (categoryParam) filterProduct(categoryParam);
    else {
      setFilteredProducts(data);
      setActiveCategory(null);
    }
  }, [location.hash, location.search, data, filterProduct]);

  // Apply sorting when option changes
  useEffect(() => {
    sortProducts(sortOption, filteredProducts);
  }, [sortOption, sortProducts]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // Category buttons component 
  const categories = ["Paintings", "EpoxyArt", "Handicraft", "FabricWork"];
  const CategoryButtons = () => (
    <div className="category-filter">
      <button 
        className={`category-btn ${activeCategory === null ? 'active' : ''}`} 
        onClick={() => filterProduct(null)}
      >All</button>
      {categories.map(cat => (
        <button 
          key={cat}
          className={`category-btn ${activeCategory === cat ? 'active' : ''}`} 
          onClick={() => filterProduct(cat)}
        >{cat}</button>
      ))}
    </div>
  );

  // Product card component
  const ProductCard = ({ product }) => {
    const quantityInCart = getProductQuantity(product.id);
    const isOutOfStock = product.quantity <= 0;
    const isMaxQuantityInCart = quantityInCart >= product.quantity;
    
    return (
      <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
        <div className="product-image-container">
          <Link to={isOutOfStock ? "#" : `/product/${product.id}`} className={isOutOfStock ? 'disabled-link' : ''}>
            <img src={product.image} alt={product.title} className="product-img" />
            {isOutOfStock && <div className="out-of-stock-overlay">OUT OF STOCK</div>}
          </Link>
        </div>
        
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-description">{product.description.substring(0, 90)}...</p>
          <p className="product-price">Rs. {product.price}</p>
          {!isOutOfStock && <p className="product-quantity">Available: {product.quantity}</p>}
        </div>
        
        <div className="product-actions">
          {!isOutOfStock ? (
            <div className="buttons-row">
              {quantityInCart === 0 ? (
                <button className="add-to-cart-btn green-btn" onClick={() => addProduct(product)}>ADD TO CART</button>
              ) : (
                <div className="quantity-control green-bg">
                  <button className="quantity-btn" onClick={() => removeProduct(product)}>-</button>
                  <div className="quantity-display">{quantityInCart}</div>
                  <button 
                    className={`quantity-btn ${isMaxQuantityInCart ? 'disabled' : ''}`}
                    onClick={() => addProduct(product)}
                    disabled={isMaxQuantityInCart}
                  >+</button>
                </div>
              )}
              <Link to={`/product/${product.id}`} className="view-details-btn">VIEW</Link>
            </div>
          ) : (
            <Link to={`/product/${product.id}`} className="view-details-btn full-width">VIEW DETAILS</Link>
          )}
        </div>
      </div>
    );
  };

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
      
      <div className="products-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Browse our collection of handcrafted items</p>
      </div>
      
      <div className="filter-container">
        <CategoryButtons />
        <div className="sort-container">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select" 
            className="sort-select" 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="A-Z">A-Z</option>
            <option value="Date Added (Newest)">Date Added (Newest)</option>
            <option value="Date Added (Oldest)">Date Added (Oldest)</option>
            <option value="Price (Low to High)">Price (Low to High)</option>
            <option value="Price (High to Low)">Price (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="products-container">
        {filteredProducts.length === 0 ? (
          <div className="no-products">No products found in this category</div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>

      <style jsx>{`
        .curly-background { position: relative; overflow: hidden; }
        .buttons-row { display: flex; gap: 0.75rem; width: 100%; }
        .green-btn { background-color: #28a745 !important; border-color: #28a745 !important; flex: 2; }
        .green-btn:hover { background-color: #218838 !important; }
        .green-bg { background-color: #28a745 !important; flex: 2; }
        .green-bg .quantity-btn { background-color: #28a745; }
        .green-bg .quantity-btn:hover { background-color: #218838; }
        .view-details-btn { flex: 1; background-color: transparent; color: var(--primary-color); border: 2px solid var(--primary-color); border-radius: 30px; padding: 0.75rem 0; font-size: 0.95rem; font-weight: 500; text-align: center; text-decoration: none; transition: var(--transition); }
        .view-details-btn:hover { background-color: var(--primary-color); color: white; transform: translateY(-3px); }
        .full-width { width: 100%; }
        .add-to-cart-btn { background-color: #28a745; color: white; border: none; border-radius: 30px; padding: 0.75rem 0; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: var(--transition); }
        .add-to-cart-btn:hover { background-color: #218838; transform: translateY(-3px); }
      `}</style>
    </div>
  );
};

export default Products;