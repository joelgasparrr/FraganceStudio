// src/pages/HistorialCliente.jsx
import React, { useEffect, useState } from 'react';

const HistorialCliente = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('historialCompras');
    if (data) {
      setCompras(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2> Historial de Compras del Cliente</h2>
      {compras.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        compras.map((compra, idx) => (
          <div key={idx} style={{ border: '1px solid gray', marginBottom: '1rem', padding: '1rem' }}>
            <h3>Compra #{idx + 1}</h3>
            <p><strong>Fecha:</strong> {compra.fecha}</p>
            <p><strong>Dirección:</strong> {compra.direccion}</p>
            <p><strong>Tarjeta:</strong> {compra.tarjeta}</p>
            <p><strong>Estado:</strong> {compra.estado}</p>
            <h4>Productos:</h4>
            <ul>
              {compra.productos.map((prod, i) => (
                <li key={i}>
                  {prod.nombre} - ${prod.precio}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default HistorialCliente;
