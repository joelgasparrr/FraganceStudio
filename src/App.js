import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminProductos from './pages/AdminProductos';
import ClienteHome from './pages/ClienteHome'; 
import HistorialCliente from './pages/HistorialCliente';
import InventarioCompras from './pages/InventarioCompras';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminproductos" element={<AdminProductos />} /> 
        <Route path="/clientehome" element={<ClienteHome />} />
        <Route path="/historialcliente" element={<HistorialCliente />} />
        <Route path="/inventariocompras" element={<InventarioCompras />} />

      </Routes>
    </Router>
  );
}

export default App;
