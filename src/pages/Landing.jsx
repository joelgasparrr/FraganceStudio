// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #ece9e6, #ffffff)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        💎 Bienvenido a UPIITA Fragance Studio 💎
      </h1>

      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '2rem' }}>
        Encuentra tu fragancia ideal. Elegancia y frescura en cada aroma.
      </p>

      <img
        src="https://images.unsplash.com/photo-1659450013573-b2d6b39f916a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQyfHxwZXJmdW1lc3xlbnwwfHwwfHx8MA%3D%3D"
        alt="perfume-banner"
        style={{
          width: '80%',
          maxWidth: '500px',
          borderRadius: '10px',
          marginBottom: '2rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      />

      <button
        onClick={() => navigate('/login')}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Empezar a comprar
      </button>

      {/* Footer */}
      <footer
        style={{
          marginTop: 'auto',
          width: '100%',
          padding: '2rem 0',
          backgroundColor: '#333',
          color: 'white',
          textAlign: 'center',
          fontSize: '1rem',
        }}
      >
        <div>
          <p>&copy; 2025 UPIITA Fragance Studio. Todos los derechos reservados.</p>
          <div>
            <a
              href="https://facebook.com"
              style={{ color: 'white', margin: '0 10px' }}
              target="blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              style={{ color: 'white', margin: '0 10px' }}
              target="blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com"
              style={{ color: 'white', margin: '0 10px' }}
              target="blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
