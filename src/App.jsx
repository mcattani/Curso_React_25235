// Bibliotecas
import { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Header from "./components/Header"
import Footer from './components/Footer';

// Paginas
import Home from "./pages/Home"


function App() {
  useEffect(() => {
    document.body.setAttribute('data-bs-theme', 'dark');
  }, []);

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>}/>

        </Routes>
        <Footer />

      </Router>
    </div>
  );
};

export default App
