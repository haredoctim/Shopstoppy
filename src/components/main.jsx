import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import P1 from "../photos/paintingSailBoat.jpg";
import E1 from "../photos/epoxySeaCoasters.jpg";
import H1 from "../photos/handicraftRingBasket.jpg";
import F1 from "../photos/fabricFull.jpg";
import MOD from "../photos/modArt.png";
import Abt from "../photos/about.jpg";
const Main = () => {
  return (
    <>
      {/* Hero Section with Rounded Corners */}
      <div className="hero-container">
        <div className="hero-card">
          <div className="hero-image-container">
            <img
              className="hero-image"
              src={MOD}
              alt="New Arrivals"
            />
            <div className="hero-overlay">
              <div className="hero-content">
                <h1 className="hero-title">Welcome to my Art Heaven</h1>
                <p className="hero-text">
                  A place where I implement my creativity in day to day products.
                  <br />
                  Hope you find what you're looking for :)
                </p>
                <Link to="/product" className="hero-button">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="section-title">About</h2>
            <p className="about-text">
              Welcome my fellow friends, I am Tasneem Decor and I am a passionate artist with a degree in fashiom designing, looking to make an impact in the world by sharing my little art pieces with everyone.
            </p>
            <p className="about-text">
              From stunning paintings to intricate handicrafts, my mission is to connect you with extraordinary works that inspire and delight.
            </p>
            {/* <Link to="/about" className="about-button">
              Learn More
            </Link> */}
          </div>
          <div className="about-image-container">
            <img
              className="about-image"
              src={Abt}
              alt="Our Workshop"
            />
          </div>
        </div>
      </section>

      {/* Explore Products Section */}
      <section className="explore-section">
        <div className="explore-container">
          <h2 className="section-title">Explore Our Collection</h2>
          <p className="explore-text">
            Discover unique pieces crafted with love and attention to detail.
            Each item tells a story and brings a touch of artistry to your space.
          </p>
        </div>
      </section>

      {/* Category Cards Section */}
      <section className="category-section">
        <div className="category-container">
          <div className="category-card">
            <div className="category-image-container">
              <img
                src={P1}
                alt="Paintings"
                className="category-image"
              />
            </div>
            <h3 className="category-title">Paintings</h3>
            <p className="category-text">
              Unique paintings to add color and character to your walls.
            </p>
            <Link to="/product?category=Paintings" className="category-button">
              View Collection
            </Link>
          </div>

          <div className="category-card">
            <div className="category-image-container">
              <img
                src={E1}
                alt="Epoxy Art"
                className="category-image"
              />
            </div>
            <h3 className="category-title">Epoxy Art</h3>
            <p className="category-text">
              Stunning resin creations that capture light and imagination.
            </p>
            <Link to="/product?category=EpoxyArt" className="category-button">
              View Collection
            </Link>
          </div>

          <div className="category-card">
            <div className="category-image-container">
              <img
                src={H1}
                alt="Handicraft"
                className="category-image"
              />
            </div>
            <h3 className="category-title">Handicraft</h3>
            <p className="category-text">
              Skillfully crafted items that showcase traditional artistry.
            </p>
            <Link to="/product?category=Handicraft" className="category-button">
              View Collection
            </Link>
          </div>

          <div className="category-card">
            <div className="category-image-container">
              <img
                src={F1}
                alt="Fabric Work"
                className="category-image"
              />
            </div>
            <h3 className="category-title">Fabric Work</h3>
            <p className="category-text">
              Beautiful textile creations that add warmth and texture.
            </p>
            <Link to="/product?category=FabricWork" className="category-button">
              View Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;