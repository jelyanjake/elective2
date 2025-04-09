import { useState, useEffect } from 'react';
import './App.css';
import shoppingCartIcon from './assets/shopping-cart.png';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <nav>
            <a href="#" className="logo">&#127865; arigato sa imong tanan</a>
            <ul className="nav-links">
              <li><a href="#"><img src={shoppingCartIcon}></img> Cart</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <section id="features">
          <div className="container">
            <div className="section-title">
              <h2>Our Burgers</h2>
              <p>mmmyes cheeseburgir</p>
            </div>
            <div className="features-grid">
            {data.map((burger) => (
              <div key={burger.id} className="feature-card">
                <img src={burger.avatar} alt={burger.name} />
                <h3>{burger.name}</h3>
                <p>{burger.description}</p>
                <p className="price">${burger.price}</p>
                <button className="btn">Add to Cart</button>
              </div>
            ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Burger Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;