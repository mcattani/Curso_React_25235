// Bibliotecas
import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Componentes
import Header from "./components/Header"
import Footer from "./components/Footer";
import SecRoute from "./components/SecRoute"
import MaterialWrapper from './components/MaterialWrapper';

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* Usamos key para que la animación funcione al cambiar de ruta */}
      <Routes location={location} key={location.pathname}>
        
        <Route path='/' element={<MaterialWrapper><Home /></MaterialWrapper>} />

        <Route path='/productos' element={<MaterialWrapper><Productos /></MaterialWrapper>} />

        <Route path='/carrito' element={<MaterialWrapper><Carrito /></MaterialWrapper>} />

        <Route path='/equipo' element={<MaterialWrapper><Equipo /></MaterialWrapper>} />

        <Route path='/contacto' element={<MaterialWrapper><Contacto /></MaterialWrapper>} />

        <Route path='/login' element={<MaterialWrapper><Login /></MaterialWrapper>} />

        <Route path='/admin' element={<MaterialWrapper><SecRoute><Admin /></SecRoute></MaterialWrapper>} />

        <Route path='*' element={<MaterialWrapper><NotFound /></MaterialWrapper>} />

      </Routes>
    </AnimatePresence>
  );
}

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
              <Header />
              
              <AnimatedRoutes />

              <Footer />

            </Router>
          </CarritoProvider>
        </AuthProvider>
      </ProductosProvider>
    </div>
  );
};

export default App
