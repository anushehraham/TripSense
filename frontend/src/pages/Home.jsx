import React from 'react';
import './Home.css';
import SearchBar from '../components/navbar/SearchBar';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="overlay" />
        <div className="hero-content">
          <h1><span>Explore</span><br /> your amazing city</h1>
          <p>Find great places to stay, eat, shop, or visit from local experts.</p>
          <SearchBar />
        </div>
      </section>

      <div className="categories">
        {["Restaurant", "Hotel", "Places", "Shopping"].map(cat => (
          <button key={cat}>{cat}</button>
        ))}
      </div>

      <section className="features">
        <div className="card">
          <div className="icon">🏷️</div>
          <h3>Best Price Guarantee</h3>
          <p>A small river named Dudon flows by their place and supplies it with the best prices.</p>
        </div>
        <div className="card">
          <div className="icon">❤️</div>
          <h3>Travellers Love Us</h3>
          <p>A small river named Dudon flows by their place and supplies it with loyal travelers.</p>
        </div>
        <div className="card">
          <div className="icon">🎒</div>
          <h3>Best Travel Agent</h3>
          <p>A small river named Dudon flows by their place and supplies it with great service.</p>
        </div>
        <div className="card">
          <div className="icon">💬</div>
          <h3>Our Dedicated Support</h3>
          <p>A small river named Dudon flows by their place and supports your travel journey.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
