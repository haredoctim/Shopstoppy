import React from "react";
import '../styles/Footer.css'
const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Decorative divider */}
        <div className="decorative-divider">
          <div className="divider-line"></div>
          <div className="divider-ornament">💛</div>
          <div className="divider-line"></div>
        </div>
        
        {/* Main footer content */}
        <div className="footer-main">
          <div className="footer-section brand-section">
            <h3 className="footer-heading">Tasneem Decor</h3>
            <p className="footer-tagline">Creating beautiful spaces since 2020</p>
            <div className="footer-address">
              <p>Neemuch, M.P.</p>
            </div>
          </div>
          
          <div className="footer-section links-section">
            <h4 className="footer-subheading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/product">Products</a></li>
              {/* <li><a href="/about">About</a></li> */}
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section contact-section">
            <h4 className="footer-subheading">Connect With Us</h4>
            <div className="social-icons">
              <a href="https://instagram.com/tasneemdecor" aria-label="Instagram" target="_blank" rel="noreferrer">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="tel:+919876543210" aria-label="Phone">
                <i className="fa fa-phone"></i>
              </a>
              <a href="https://wa.me/919876543210" aria-label="WhatsApp" target="_blank" rel="noreferrer">
                <i className="fa fa-whatsapp"></i>
              </a>
              <a href="mailto:contact@tasneemdecor.com" aria-label="Email">
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright bar */}
        <div className="copyright-bar">
          <p>© {currentYear} Tasneem Decor. All rights reserved.</p>
        </div>
        
        {/* Developer credit */}
        <div className="developer-credit">
          <p className="dev-text">Developed by Hatim Decor</p>
          <div className="dev-social">
            <a href="https://github.com/haredoctim" target="_blank" rel="noreferrer">
              <i className="fa fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/hatimdecor66" target="_blank" rel="noreferrer">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="mailto:hatimdecor66@gmail.com">
              <i className="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;