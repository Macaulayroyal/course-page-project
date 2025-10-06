import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';

function Navbar({ cartCount, toggleCart }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const navLinks = ['shirts', 'shorts', 'jeans', 'hoodies', 'snickers'];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          maxWidth: '1200px',
          height: '4.2rem',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: '12px',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontWeight: '600',
          color: darkMode ? '#dbb949' : '#cd5c5c',
          zIndex: 1000,
          transition: 'color 0.3s',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          userSelect: 'none',
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            HIM lothiers
          </a>
        </div>

        <ul
          className="nav-links"
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            margin: 0,
            padding: 0,
            alignItems: 'center',
            flexWrap: 'nowrap',
          }}
        >
          {navLinks.map((link) => (
            <li key={link} style={{ cursor: 'pointer' }}>
              <a
                href={`/${link.toLowerCase()}`}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              cursor: 'pointer',
              fontSize: '1.5rem',
            }}
            aria-label="Cart"
            tabIndex={0}
            onClick={toggleCart}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleCart();
            }}
          >
            <FaShoppingCart />
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-10px',
                backgroundColor: darkMode ? '#dbb949' : '#cd5c5c',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                userSelect: 'none',
                transition: 'background-color 0.3s',
                border: '1px solid white',
              }}
            >
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1.5rem',
              userSelect: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="hamburger-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '1.8rem',
              userSelect: 'none',
              display: 'none',
              alignItems: 'center',
              marginLeft: '0.5rem',
              padding: 0,
              transition: 'color 0.3s',
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '4.7rem',
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            color: darkMode ? '#dbb949' : '#cd5c5c',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            zIndex: 9999,
            userSelect: 'none',
            animation: 'menuFadeIn 0.3s ease forwards',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`/${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: darkMode ? '#dbb949' : '#cd5c5c',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = darkMode ? '#a58e2a' : '#7a2222';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = darkMode ? '#dbb949' : '#cd5c5c';
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes menuFadeIn {
          from {opacity: 0; transform: translateY(-10px);}
          to {opacity: 1; transform: translateY(0);}
        }
        ul.nav-links a.nav-link {
          color: inherit;
          text-decoration: none;
          font-size: 1.1rem;
          transition: color 0.3s;
          user-select: none;
        }
        ul.nav-links a.nav-link:hover {
          color: var(--hover-color);
          text-decoration: underline;
        }
        ul.nav-links a.nav-link:active {
          color: var(--active-color);
        }
        @media (max-width: 768px) {
          nav {
            height: 4rem;
            width: 95% !important;
            padding: 0 1rem !important;
          }
          ul.nav-links {
            display: none !important;
          }
          .hamburger-btn {
            display: flex !important;
          }
        }
      `}</style>

      <style>{`
        :root {
          --hover-color-light: #7a2222;
          --active-color-light: #7a2222;
          --hover-color-dark: #a58e2a;
          --active-color-dark: #a58e2a;
        }
        html.light-mode {
          --hover-color: var(--hover-color-light);
          --active-color: var(--active-color-light);
        }
        html.dark-mode {
          --hover-color: var(--hover-color-dark);
          --active-color: var(--active-color-dark);
        }
      `}</style>
    </>
  );
}

export default Navbar;
