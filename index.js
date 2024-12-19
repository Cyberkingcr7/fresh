import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Importing react-router components
import airmaxImage from './public/airmax.jpg';
import drifitImage from './public/drifit.jpg';
import legging from './public/leggings.jpg';
import cartIcon from './cart-icon.jpg'; 
import './styles.css';

// About Us and Contact Components
function AboutUs() {
  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p>
        Nike is a global leader in athletic wear, inspiring athletes worldwide to push their limits. We combine innovative designs with cutting-edge technology to create performance-driven gear that empowers individuals to perform at their best.
      </p>
      <p>
        Our mission is to bring inspiration and innovation to every athlete in the world. We believe that if you have a body, you are an athlete.
      </p>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <p>
        Have questions or need support? Reach out to us through the following methods:
      </p>
      <ul>
        <li>Email: support@nike.com</li>
        <li>Phone: +1-800-123-4567</li>
        <li>Address: Nike Headquarters, Beaverton, Oregon</li>
      </ul>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false); // New state to control cart visibility

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const toggleCart = () => {
    setShowCart(!showCart); // Toggle cart visibility
  };

  return (
    <Router> {/* Wrap your app with Router to enable routing */}
      <div className="app">
        <Header cart={cart} cartIcon={cartIcon} toggleCart={toggleCart} />
        <Routes>
          {/* Define the default route for the main content (Home Page) */}
          <Route path="/" element={<HeroSection />} /> {/* Main landing page */}
          <Route path="/products" element={<ProductsSection addToCart={addToCart} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {showCart && <Cart cart={cart} removeFromCart={removeFromCart} />}
        <Footer />
      </div>
    </Router>
  );
}

function Header({ cart, cartIcon, toggleCart }) {
  return (
    <header className="header">
      <h1 className="logo">Nike</h1>
      <nav className="nav">
        <Link to="/products" className="nav-link">Shop</Link> {/* Link to Products page */}
        <Link to="/about" className="nav-link">About Us</Link> {/* Link to About Us page */}
        <Link to="/contact" className="nav-link">Contact</Link> {/* Link to Contact page */}
        <CartIcon cart={cart} cartIcon={cartIcon} toggleCart={toggleCart} />
      </nav>
    </header>
  );
}

function CartIcon({ cart, cartIcon, toggleCart }) {
  return (
    <div className="cart-icon" onClick={toggleCart}>
      <img src={cartIcon} alt="Cart" className="cart-image" />
      {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <h2>Unleash Your Potential</h2>
      <p>Elevate your performance with Nike's latest collection.</p>
      <p className="brand-description">
        Crafted with precision and designed for greatness, Nike’s apparel combines cutting-edge technology with unmatched comfort. Whether you’re pushing your limits or taking it easy, each piece empowers you to move faster, train harder, and look your best. Experience the perfect balance of style, performance, and innovation—because you deserve the best.
      </p>
    </section>
  );
}

function ProductsSection({ addToCart }) {
  const products = [
    { id: 1, name: "Air Max 2024", price: "$R1600", image: airmaxImage },
    { id: 2, name: "Dri-FIT Tee", price: "R420", image: drifitImage },
    { id: 3, name: "Pro Leggings", price: "R850", image: legging },
  ];

  return (
    <section id="products" className="products">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button className="buy-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cart({ cart, removeFromCart }) {
  return (
    <div className="cart-popup">
      <h3>Your Cart</h3>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div>
              <h4>{item.name}</h4>
              <p>{item.price}</p>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 Nike. All Rights Reserved.</p>
      <div className="social-media">
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
