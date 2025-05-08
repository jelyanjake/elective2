import { useState, useEffect } from 'react';
import './App.css';
import shoppingCartIcon from './assets/shopping-cart.png';
import { fetchBurgers } from './api/api';
import CartPopup from './components/cartpopup';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

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

  useEffect(() => {
    const loadData = async () => {
      try {
        const burgers = await fetchBurgers();
        setData(burgers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
      <CartPopup
      showCart={showCart}
      setShowCart={setShowCart}
      cart={cart}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default App;