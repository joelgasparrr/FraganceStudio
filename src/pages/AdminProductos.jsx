import React, { useEffect, useState } from 'react';

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagenes: '',
    calificacion: '',
    recomendacion: '',
    entrega: '',
  });

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      setProductos(JSON.parse(productosGuardados));
    }
  }, []);

  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    });
  };

  const agregarProducto = (e) => {
    e.preventDefault();
    const productoConId = {
      ...nuevoProducto,
      id: Date.now(),
    };
    const nuevosProductos = [...productos, productoConId];
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    setNuevoProducto({
      nombre: '',
      precio: '',
      stock: '',
      imagenes: '',
      calificacion: '',
      recomendacion: '',
      entrega: '',
    });
  };

  const guardarEdicion = (id, campo, valor) => {
    const nuevos = productos.map((prod) =>
      prod.id === id ? { ...prod, [campo]: valor } : prod
    );
    setProductos(nuevos);
    localStorage.setItem('productos', JSON.stringify(nuevos));
  };

  const eliminarProducto = (id) => {
    const nuevos = productos.filter((prod) => prod.id !== id);
    setProductos(nuevos);
    localStorage.setItem('productos', JSON.stringify(nuevos));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>CRUD de Productos</h2>

      <form onSubmit={agregarProducto} style={{ marginBottom: '2rem' }}>
        <h3>Agregar nuevo producto</h3>
        <input name="nombre" value={nuevoProducto.nombre} onChange={handleChange} placeholder="Nombre" required /><br />
        <input name="precio" type="number" value={nuevoProducto.precio} onChange={handleChange} placeholder="Precio" required /><br />
        <input name="stock" type="number" value={nuevoProducto.stock} onChange={handleChange} placeholder="Stock" required /><br />
        <input name="imagenes" value={nuevoProducto.imagenes} onChange={handleChange} placeholder="URL de imágenes (separadas por coma)" /><br />
        <input name="calificacion" type="number" max="5" value={nuevoProducto.calificacion} onChange={handleChange} placeholder="Calificación (1-5)" /><br />
        <input name="recomendacion" value={nuevoProducto.recomendacion} onChange={handleChange} placeholder="Recomendación" /><br />
        <input name="entrega" value={nuevoProducto.entrega} onChange={handleChange} placeholder="Días estimados de entrega" /><br />
        <button type="submit">Agregar</button>
      </form>

      <h3>Lista de productos</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Calificación</th>
            <th>Entrega</th>
            <th>Recomendación</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>
                {productoEditando === prod.id ? (
                  <input
                    value={prod.nombre}
                    onChange={(e) => guardarEdicion(prod.id, 'nombre', e.target.value)}
                  />
                ) : (
                  prod.nombre
                )}
              </td>
              <td>
                {productoEditando === prod.id ? (
                  <input
                    type="number"
                    value={prod.precio}
                    onChange={(e) => guardarEdicion(prod.id, 'precio', e.target.value)}
                  />
                ) : (
                  `$${prod.precio}`
                )}
              </td>
              <td>
                {productoEditando === prod.id ? (
                  <input
                    type="number"
                    value={prod.stock}
                    onChange={(e) => guardarEdicion(prod.id, 'stock', e.target.value)}
                  />
                ) : (
                  prod.stock
                )}
              </td>
              <td>{prod.calificacion}</td>
              <td>{prod.entrega} días</td>
              <td>{prod.recomendacion}</td>
              <td>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {prod.imagenes &&
                    prod.imagenes.split(',').map((url, idx) => (
                      <img
                        key={idx}
                        src={url.trim()}
                        alt={`img-${idx}`}
                        width="40"
                        height="40"
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/40?text=X';
                        }}
                      />
                    ))}
                </div>
              </td>
              <td>
                {productoEditando === prod.id ? (
                  <button onClick={() => setProductoEditando(null)}> Guardar</button>
                ) : (
                  <button onClick={() => setProductoEditando(prod.id)}> Editar</button>
                )}
                <button onClick={() => eliminarProducto(prod.id)} style={{ marginLeft: '5px' }}>
                   Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductos;
