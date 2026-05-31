import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handlePostRequest = (e) => {
    if (!user) {
      e.preventDefault();
      openAuthModal();
    }
  };

  const navLinks = [
    ...(user ? [{ to: "/profile", text: "פרופיל" }] : []),
    { to: "/chat",      text: "הודעות" },
    { to: "/dashboard", text: "בקשות" },
    { to: "/",          text: "גלה" },
  ];

  return (
    <header className="navbar-header">
      <div className="nav-content">
        <div className="nav-left">
          <div className="nav-user-actions">
            {user ? (
              <>
                <img
                  alt="User avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtbEFKkRo4he01oZOVEFsfVcjpqThez3_xAMKwMF4C1zV23MSWOR5J7O7qIBmUvywgguO8Tc_O9a3ggvuMEC77q5M939HwK0Z-s7a9NZanIvug-55q7Md6JY78gIxbTiu4gKL6XLdH2vNneJie9aKJPYFpwoymx1kkHntICTQzni8aCY6RH2eLELRAT05eL-djxo5zXGblVa_ZDMMPdJ0KBA71wrXVRevLet60IhikIQGQHlwkNJUccM4iHq_ZMIA3e3Mt-UO_QSMk"
                  className="nav-avatar"
                  onClick={() => navigate('/profile')}
                  style={{ cursor: 'pointer' }}
                />
                <button className="nav-icon-button">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <Link to="/new-request" className="post-request-btn" onClick={handlePostRequest}>
                  פרסם בקשה
                </Link>
                <button className="nav-logout-btn" onClick={handleLogout}>
                  יציאה
                </button>
              </>
            ) : (
              <Link to="/auth" className="post-request-btn">
                כניסה
              </Link>
            )}
          </div>
        </div>

        <nav className={`nav-center ${isMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(link => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              className="nav-link-item"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.text}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <Link to="/" className="nav-logo">BringIt</Link>
        </div>
        
        <button className="hamburger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
    </header>
  );
}
