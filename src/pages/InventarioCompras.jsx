// src/PersonalInventario.jsx
import React, { useEffect, useState } from 'react';

const PersonalInventario = () => {
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);

  // Cargar datos al iniciar
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    const compras = JSON.parse(localStorage.getItem('historialCompras')) || [];
    setProductos(productosGuardados);
    setHistorial(compras);
  }, []);

  const actualizarProducto = (id, campo, valor) => {
    const nuevosProductos = productos.map((p) =>
      p.id === id ? { ...p, [campo]: valor } : p
    );
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
  };

  const actualizarEstadoCompra = (index, nuevoEstado) => {
    const nuevasCompras = historial.map((compra, i) =>
      i === index ? { ...compra, estado: nuevoEstado } : compra
    );
    setHistorial(nuevasCompras);
    localStorage.setItem('historialCompras', JSON.stringify(nuevasCompras));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Inventario</h2>

      <h3>Productos disponibles</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imágenes (URL)</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>
                <input
                  type="number"
                  value={prod.precio}
                  onChange={(e) => actualizarProducto(prod.id, 'precio', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={prod.stock}
                  onChange={(e) => actualizarProducto(prod.id, 'stock', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={prod.imagenes}
                  onChange={(e) => actualizarProducto(prod.id, 'imagenes', e.target.value)}
                  style={{ width: '300px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <h3>Compras realizadas</h3>
      {historial.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Dirección</th>
              <th>Tarjeta</th>
              <th>Estado</th>
              <th>Cambiar estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((compra, idx) => (
              <tr key={idx}>
                <td>{compra.fecha}</td>
                <td>
                  <ul>
                    {compra.productos.map((prod, i) => (
                      <li key={i}>{prod.nombre} - ${prod.precio}</li>
                    ))}
                  </ul>
                </td>
                <td>${compra.total}</td>
                <td>{compra.direccion}</td>
                <td>{compra.tarjeta}</td>
                <td>{compra.estado || 'Pendiente'}</td>
                <td>
                  <select
                    value={compra.estado || 'Pendiente'}
                    onChange={(e) => actualizarEstadoCompra(idx, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PersonalInventario;
