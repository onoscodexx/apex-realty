import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import LandlordDashboard from './pages/LandlordDashboard'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Animated routes wrapper
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                  element={<Home />} />
        <Route path="/properties"        element={<Properties />} />
        <Route path="/properties/:id"    element={<PropertyDetail />} />
        <Route path="/about"             element={<About />} />
        <Route path="/contact"           element={<Contact />} />
        <Route path="/auth"              element={<Auth />} />
        <Route path="/dashboard"         element={<Dashboard />} />
        <Route path="/landlord"          element={<LandlordDashboard />} />
        <Route path="/hk-admin-access"   element={<AdminLogin />} />
        <Route path="/admin/dashboard"   element={<AdminDashboard />} />
        <Route path="*"                  element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}
