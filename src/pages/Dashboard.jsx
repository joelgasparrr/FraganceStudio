import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const tipoUsuario = location.state?.tipoUsuario || 'Cliente';
  const navigate = useNavigate();

  const irASiguienteVista = () => {
    if (tipoUsuario === 'Administrador') navigate('/adminproductos');
    else if (tipoUsuario === 'Cliente') navigate('/clientehome');
    else if (tipoUsuario === 'Inventario') navigate('/inventariocompras');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem 3rem',
        borderRadius: '15px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Bienvenido, {tipoUsuario}</h2>
        <p style={{ marginBottom: '2rem' }}>
          A continuación puedes acceder a tu panel como <strong>{tipoUsuario}</strong>.
        </p>
        <button
          onClick={irASiguienteVista}
          style={{
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
        >
          Ir a tu panel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
