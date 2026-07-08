import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, ChevronRight, Menu, UserCircle, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/properties', label: 'Rentals' },
  { to: '/landlord', label: 'Landlords' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`apex-navbar w-100 position-fixed top-0 start-0 z-3 ${scrolled ? 'scrolled' : ''}`}
        style={{ background: scrolled ? undefined : 'rgba(10,22,40,0.18)' }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="apex-navbar navbar-brand" onClick={() => setMobileOpen(false)}>
            <Building2 size={26} color="var(--gold)" strokeWidth={1.5} />
            Houx<span>keys</span>
          </Link>

          <div className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `apex-navbar nav-link${isActive ? ' active' : ''}`}>
                {label}
              </NavLink>
            ))}
            {user ? (
              <Link to={user.role === 'landlord' ? '/landlord' : '/dashboard'} className="btn-gold ms-3" style={{ padding: '0.65rem 1.1rem' }}>
                <UserCircle size={17} /> Profile
              </Link>
            ) : (
              <Link to="/auth" className="btn-gold ms-3" style={{ padding: '0.65rem 1.3rem' }}>
                Sign In
              </Link>
            )}
          </div>

          <button className="d-lg-none border-0 bg-transparent text-white p-2" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle navigation">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 z-2"
            style={{ background: 'rgba(10,22,40,0.98)', paddingTop: '5rem' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="container py-3">
              {navLinks.map(({ to, label }, i) => (
                <motion.div key={to} initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `d-flex align-items-center justify-content-between py-4 border-bottom text-decoration-none ${isActive ? 'text-gold' : 'text-white'}`}
                    style={{ borderColor: 'rgba(201,168,76,0.15)', fontSize: '1.35rem', fontFamily: 'var(--font-heading)' }}
                  >
                    {label}
                    <ChevronRight size={20} />
                  </NavLink>
                </motion.div>
              ))}
              <Link to={user ? '/dashboard' : '/auth'} className="btn-gold w-100 justify-content-center mt-5" onClick={() => setMobileOpen(false)} style={{ display: 'flex' }}>
                {user ? 'Open Profile' : 'Sign In or Sign Up'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
