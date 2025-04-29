import { useState, useEffect } from 'react';
import './App.css';
import shoppingCartIcon from './assets/shopping-cart.png';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const SkeletonCard = () => (
    <div className="skeleton-card">
      <div className="skeleton-image"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
      <div className="skeleton-line shorter"></div>
    </div>
  );

  const addToCart = (burger) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItem = prevCart.find(item => item.id === burger.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item to cart
      return [...prevCart, { ...burger, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  const CartPopup = () => (
    <div className={`cart-popup ${showCart ? 'open' : ''}`}>
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button
          className="close-cart"
          onClick={() => setShowCart(false)}
        >
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.avatar} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <div className="quantity-controls">
                  <button className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >-</button>
                  <span>{item.quantity}</span>
                  <button className="quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >+</button>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="cart-footer">
        <p className="cart-total">Total: ${cartTotal.toFixed(2)}</p>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://68103cb727f2fdac2410a610.mockapi.io/api/elective2/burgers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <nav>
            <a href="#" className="logo">&#127828; Bussin' Burgers</a>
            <ul className="nav-links">
              <li><button className="cart-btn" onClick={() => setShowCart(!showCart)} ><img src={shoppingCartIcon}></img>{cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}</button></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section id="features">
          <div className="container">
            <div className="section-title">
              <h2>Delicious and Juicy. No cap, just flavor.</h2>
            </div>
            <div className="features-grid">
              {data.map((burger) => (
                <div key={burger.id} className="feature-card">
                  <div className='feature-card-content'>
                    <img src={burger.avatar} alt={burger.name} />
                    <h3>{burger.name}</h3>
                    <p>{burger.description}</p>
                    <p className="price">${burger.price}</p>
                  </div>
                  <button className="btn" onClick={() => addToCart(burger)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Bussin' Burgers. All rights not reserved.</p>
          <p>Follow us on Instagram @potatozuu</p>
        </div>
      </footer>
      <div 
      className={`cart-overlay ${showCart ? 'active' : ''}`}
      onClick={() => setShowCart(false)}
      />
      <CartPopup />
    </div>
  );
}

export default App;
