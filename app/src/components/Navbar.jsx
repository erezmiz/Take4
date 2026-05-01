import { useState } from 'react';
import './Navbar.css';

export default function Navbar({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="nav-content">
        <div className="logo" onClick={() => onNavigate && onNavigate('landing')} style={{ cursor: 'pointer' }}>BringIt</div>
        
        <div className={`desktop-links ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('landing'); }} className="nav-link active">גילוי</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('dashboard'); }} className="nav-link">בקשות</a>
          <a href="#" className="nav-link">קהילה</a>
          <a href="#" className="nav-link">בטיחות</a>
        </div>

        <div className="nav-actions">
          <button className="notification-btn">🔔</button>
          <div className="user-section">
            <button className="publish-btn">פרסם בקשה</button>
            <div className="profile-image">
              <img 
                alt="פרופיל משתמש" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2k9NHQoarS4VWMytB8bH4NI4edkYhAWAhjpJzANd8u2f9hbI1jtT6OgHipqegKASeOspr9hh06PJxrybrB4WSLP2afhBxSX56msIw59DMJHcIgmF0Lx-TNNIM8ozdboi3AV0iBPJsalRrNSFwnoFj_JT1wFvuilANXnP-SqZmcDkl7ZeYrJG5iSZtsGxhy53dpiJ7813_G-urUVS26DzMKvzBFhI3bDpCu6GVueXtxtpLhvbd5SGAbyndBdq0oP_H1f0CRqdtkfEq"
              />
            </div>
          </div>
          <button 
            className="hamburger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
