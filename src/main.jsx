import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import App from './App.jsx'
import CartaPage from './pages/CartaPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<CartaPage />} />
            <Route path="/nosotros" element={<App />} />
            <Route path="/contacto" element={<ContactoPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
