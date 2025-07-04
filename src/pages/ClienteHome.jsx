// src/ClienteHome.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClienteHome = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [direcciones, setDirecciones] = useState([]);
  const [tarjetas, setTarjetas] = useState([]);
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [nuevaTarjeta, setNuevaTarjeta] = useState('');
  const [direccionSeleccionada, setDireccionSeleccionada] = useState('');
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('productos');
    if (data) setProductos(JSON.parse(data));

    const dirs = JSON.parse(localStorage.getItem('direcciones')) || [];
    const cards = JSON.parse(localStorage.getItem('tarjetas')) || [];
    setDirecciones(dirs);
    setTarjetas(cards);
  }, []);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const agregarDireccion = () => {
    if (nuevaDireccion.trim() !== '') {
      const nuevas = [...direcciones, nuevaDireccion];
      setDirecciones(nuevas);
      setNuevaDireccion('');
      localStorage.setItem('direcciones', JSON.stringify(nuevas));
    }
  };

  const agregarTarjeta = () => {
    if (nuevaTarjeta.trim() !== '') {
      const nuevas = [...tarjetas, nuevaTarjeta];
      setTarjetas(nuevas);
      setNuevaTarjeta('');
      localStorage.setItem('tarjetas', JSON.stringify(nuevas));
    }
  };

  const total = carrito.reduce((acc, prod) => acc + Number(prod.precio), 0);

  const confirmarCompra = () => {
    if (!direccionSeleccionada || !tarjetaSeleccionada) {
      alert('Selecciona una dirección y una tarjeta antes de confirmar la compra.');
      return;
    }

    const nuevaCompra = {
      productos: carrito,
      total,
      direccion: direccionSeleccionada,
      tarjeta: tarjetaSeleccionada,
      fecha: new Date().toLocaleString(),
      estado: 'Pendiente'
    };

    const compras = JSON.parse(localStorage.getItem('historialCompras')) || [];
    compras.push(nuevaCompra);
    localStorage.setItem('historialCompras', JSON.stringify(compras));

    setCarrito([]);
    alert('Compra realizada con éxito ✅');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Bienvenido, Cliente</h2>

      <h3>Productos disponibles</h3>
      {productos.length === 0 && <p>No hay productos disponibles.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {productos.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid gray', padding: '1rem', width: '250px' }}>
            <h4>{prod.nombre}</h4>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {prod.imagenes &&
                prod.imagenes.split(',').map((url, idx) => (
                  <img
                    key={idx}
                    src={url.trim()}
                    alt={`img-${idx}`}
                    width="60"
                    height="60"
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/60?text=Imagen';
                    }}
                  />
                ))}
            </div>
            <p>Precio: ${prod.precio}</p>
            <p>Stock: {prod.stock}</p>
            <p>Entrega: {prod.entrega} días</p>
            <p>Calificación: {prod.calificacion} / 5</p>
            <p><em>{prod.recomendacion}</em></p>
            <button onClick={() => agregarAlCarrito(prod)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      <hr />

      <h3>🛒 Carrito</h3>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {carrito.map((item, idx) => (
              <li key={idx}>{item.nombre} - ${item.precio}</li>
            ))}
          </ul>
          <p><strong>Total: ${total}</strong></p>

          <h4>Selecciona una dirección:</h4>
          <select value={direccionSeleccionada} onChange={(e) => setDireccionSeleccionada(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {direcciones.map((dir, idx) => (
              <option key={idx} value={dir}>{dir}</option>
            ))}
          </select>
          <br />
          <input
            type="text"
            placeholder="Agregar nueva dirección"
            value={nuevaDireccion}
            onChange={(e) => setNuevaDireccion(e.target.value)}
          />
          <button onClick={agregarDireccion}>Agregar dirección</button>

          <h4>Selecciona una tarjeta:</h4>
          <select value={tarjetaSeleccionada} onChange={(e) => setTarjetaSeleccionada(e.target.value)}>
            <option value="">-- Selecciona --</option>
            {tarjetas.map((tar, idx) => (
              <option key={idx} value={tar}>{tar}</option>
            ))}
          </select>
          <br />
          <input
            type="text"
            placeholder="Agregar nueva tarjeta"
            value={nuevaTarjeta}
            onChange={(e) => setNuevaTarjeta(e.target.value)}
          />
          <button onClick={agregarTarjeta}>Agregar tarjeta</button>

          <br /><br />
          <button onClick={confirmarCompra}>Confirmar compra y envío</button>
        </div>
      )}

      <hr />
      <button onClick={() => navigate('/historialcliente')}>📜 Ver historial de compras</button>
    </div>
  );
};

export default ClienteHome;
