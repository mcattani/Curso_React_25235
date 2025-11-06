// Bibliotecas
import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Header from "./components/Header"
import Footer from "./components/Footer";
import SecRoute from "./components/SecRoute"

// Páginas
import Home from './pages/Home'
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Equipo from './pages/Equipo';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Admin from './pages/Admin'

// Context
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext';

function App() {
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <div>
      <ProductosProvider>
        <AuthProvider>
          <CarritoProvider>
            <Router>
              {/* Pasamos la cantidad de productos al Header */}
              <Header />
              <Routes>

                <Route path='/' element={<Home />} />
                {/* Pasamos el carrito a Productos y la función para modificarlo*/}
                <Route path='/productos' element={<Productos />} />
                {/* Lo mismo para la página Carrito */}
                <Route path='/carrito' element={<Carrito />} />

                <Route path='/equipo' element={<Equipo />} />
                <Route path='/contacto' element={<Contacto />} />
                <Route path='/login' element={<Login />} />

                {/*Ruta protegida*/}
                <Route path='/admin' element={<SecRoute><Admin /></SecRoute>} />

                {/*Ruta no existente*/}
                <Route path='*' element={<NotFound />} />

              </Routes>
              <Footer />

            </Router>
          </CarritoProvider>
        </AuthProvider>
      </ProductosProvider>
    </div>
  );
};

export default App
