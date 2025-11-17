import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, BrowserRouter, Route  } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
/*========================= RUTAS DEL CLIENTE ==========================*/
import CostumerLayout from './layouts/CostumerLayout.jsx'
import Home from './pages/Costumer/Home.jsx'
import Carrito from './pages/Costumer/Carrito.jsx'
import Producto from './pages/Costumer/Producto.jsx'
/* import Categoria from './pages/Costumer/Categoria.jsx' */


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* Rutas del Cliente */}
      <Routes>
        <Route path="/" element={<CostumerLayout />} >
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='carrito' element={<Carrito />} />
          <Route path='producto/:id' element={<Producto />} />
         {/*  <Route path='categoria/:id' element={<Categoria />}></Route> */}
        </Route>

        {/* Rutas del Admin */}
        <Route path='admin'>
          
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
