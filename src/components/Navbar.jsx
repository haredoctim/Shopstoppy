import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/Navbar.css';

const Navbar = () => {
    const state = useSelector(state => state.handleCart);
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-left">
                    <NavLink className="navbar-logo" to="/">
                        <span className="logo-text">ShopStoppy</span>
                    </NavLink>
                </div>
                
                <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    <NavLink className="navbar-link" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                    <NavLink className="navbar-link" to="/product" onClick={() => setMenuOpen(false)}>Products</NavLink>
                    <NavLink className="navbar-link" to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
                </div>
                
                <div className="navbar-actions">
                    <NavLink to="/login" className="navbar-btn login-btn">
                        <i className="fa fa-sign-in-alt"></i> 
                        <span className="btn-text">Login</span>
                    </NavLink>
                    <NavLink to="/register" className="navbar-btn register-btn">
                        <i className="fa fa-user-plus"></i> 
                        <span className="btn-text">Register</span>
                    </NavLink>
                    <NavLink to="/cart" className="cart-btn">
                        <i className="fa fa-shopping-cart"></i> 
                        <span className="cart-count">{state.length}</span>
                    </NavLink>
                </div>
                
                <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;