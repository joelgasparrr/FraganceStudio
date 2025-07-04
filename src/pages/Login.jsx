import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail(correo)) {
      setError('Correo inválido');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setError('');
    navigate('/dashboard', { state: { tipoUsuario } });
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1598207548924-fcab47e9b272?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjUwfHxwZXJmdW1lc3xlbnwwfHwwfHx8MA%3D%3D)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem 3rem',
        borderRadius: '12px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Iniciar sesión</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={{ marginTop: '1rem' }}>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <label style={{ marginTop: '1rem' }}>Tipo de usuario:</label>
          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="Administrador">Administrador</option>
            <option value="Cliente">Cliente</option>
            <option value="Inventario">Personal de Inventario</option>
          </select>

          <button
            type="submit"
            style={{
              marginTop: '1.5rem',
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: '5px',
  border: '1px solid #ccc',
  marginTop: '0.3rem',
  marginBottom: '0.8rem'
};

export default Login;
