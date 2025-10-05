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
          <Route path='/carrito' element={<Carrito elemCarrito={carrito} setCarrito={setCarrito} />} />        </Routes>
        <Footer />

      </Router>
    </div>
  );
};

export default App
