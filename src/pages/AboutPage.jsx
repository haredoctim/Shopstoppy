import React from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
          Welcome to ShopStoppy, your ultimate destination for stylish, high-quality fashion that fits every lifestyle. 
          {/* Your existing about content */}
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/products#mens-clothing" className="text-decoration-none">
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Men's Clothing"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Men's Clothing</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/products#womens-clothing" className="text-decoration-none">
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Women's Clothing"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Women's Clothing</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/products#jewelry" className="text-decoration-none">
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Jewelry"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Jewelry</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <Link to="/products#electronics" className="text-decoration-none">
              <div className="card h-100">
                <img
                  className="card-img-top img-fluid"
                  src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Electronics"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="card-title text-center">Electronics</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
