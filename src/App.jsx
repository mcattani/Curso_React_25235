// Bibliotecas
import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Header from "./components/Header"
import Footer from './components/Footer';

// Páginas
import Home from "./pages/Home"
import Productos from './pages/Productos';
import Carrito from './pages/Carrito';
import Equipo from './pages/Equipo';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';



function App() {
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);

  // Carrito -> usamos App() para pasar toda la info entre componentes
  const [carrito, setCarrito] = useState([]);

  return (
    <div>
      <Router>
        {/* Pasamos la cantidad de productos al Header */}
        <Header cantCarrito={carrito.length} />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* Pasamos el carrito a Productos y la función para modificarlo*/}
          <Route path='/productos' element={<Productos carrito={carrito} setCarrito={setCarrito} />} />
          {/* Lo mismo para la página Carrito */}
          <Route path='/carrito' element={<Carrito elemCarrito={carrito} setCarrito={setCarrito} />} />
          <Route path='/equipo' element={<Equipo/>} />
          <Route path='/contacto' element={<Contacto/>} />

          {/*Ruta no existente*/}
          <Route path='*' element={<NotFound/>} />

        </Routes>
        <Footer />

      </Router>
    </div>
  );
};

export default App
