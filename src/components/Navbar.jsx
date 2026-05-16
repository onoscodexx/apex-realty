import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Building2, ChevronRight } from 'lucide-react'

const navLinks = [
  { to: '/',           label: 'Home' },
  { to: '/properties', label: 'Properties' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  // Track scroll for blur/shrink effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 992) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.nav
        className={`apex-navbar w-100 position-fixed top-0 start-0 z-3 ${scrolled ? 'scrolled' : ''}`}
        style={{ background: scrolled ? undefined : 'transparent' }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="apex-navbar navbar-brand" onClick={() => setMobileOpen(false)}>
            <Building2 size={26} color="var(--gold)" strokeWidth={1.5} />
            Apex<span> Realty</span>
          </Link>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex align-items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `apex-navbar nav-link${isActive ? ' active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-gold ms-3" style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}>
              Book a Viewing
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="d-lg-none border-0 bg-transparent text-white p-2"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 z-2"
            style={{ background: 'rgba(10,22,40,0.98)', paddingTop: '5rem' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container py-3">
              {navLinks.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `d-flex align-items-center justify-content-between py-4 border-bottom text-decoration-none ${
                        isActive ? 'text-gold' : 'text-white'
                      }`
                    }
                    style={{ borderColor: 'rgba(201,168,76,0.15) !important', fontSize: '1.4rem', fontFamily: 'var(--font-heading)' }}
                  >
                    {label}
                    <ChevronRight size={20} />
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="mt-5"
              >
                <Link
                  to="/contact"
                  className="btn-gold w-100 justify-content-center"
                  onClick={() => setMobileOpen(false)}
                  style={{ display: 'flex', padding: '1rem' }}
                >
                  Book a Viewing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
