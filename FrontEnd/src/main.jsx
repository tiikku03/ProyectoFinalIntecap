import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, BrowserRouter, Route  } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LogIn from './pages/LogIn.jsx'
import CrearUsuario from './pages/CrearUsuario.jsx'
import { AuthProvider } from './Context/LogInContext.jsx'
import { CarritoProvider } from './Context/CarritoContex.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
/*========================= RUTAS DEL CLIENTE ==========================*/
import CostumerLayout from './layouts/CostumerLayout.jsx'
import Home from './pages/Costumer/Home.jsx'
import Carrito from './pages/Costumer/Carrito.jsx'
import Producto from './pages/Costumer/Producto.jsx'
import Categoria from './pages/Costumer/Categoria.jsx'


/*========================= RUTAS DEL USUARIO ==========================*/
import AdminLayout from './layouts/AdminLayout.jsx'
import Dashboard from './pages/Admin/Dashboard.jsx'
import GestionProductos from './pages/Admin/GestionProductos.jsx'
import GestionPedidos from './pages/Admin/GestionPedidos.jsx'
import GestionUsuarios from './pages/Admin/GestionUsuarios.jsx'
import GestionResenas from './pages/Admin/GestionReseñas.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          {/* Rutas del Cliente */}
          <Routes>
        <Route path="/" element={<CostumerLayout />} >
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='carrito' element={<Carrito />} />
          <Route path='producto/:id' element={<Producto />} />
          <Route path='categoria/:categoria' element={<Categoria />}></Route>
        </Route>
        
        {/* Rutas de autenticación */}
        <Route path="login" element={<LogIn />} />
        <Route path="register" element={<CrearUsuario />} />


        {/* Rutas del Admin */}
        <Route path="admin" element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<GestionProductos />} />
          <Route path="pedidos" element={<GestionPedidos />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="resenas" element={<GestionResenas />} />
        </Route>
        </Routes>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
