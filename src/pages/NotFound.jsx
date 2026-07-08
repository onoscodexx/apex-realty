import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  useEffect(() => { document.title = '404 — Page Not Found | Houxkeys' }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 60%, var(--navy-light) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Building2 size={64} color="rgba(201,168,76,0.35)" style={{ margin: '0 auto 1.5rem' }} />
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          fontWeight: 800,
          lineHeight: 1,
          background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0',
        }}>
          404
        </div>
        <h1 style={{ color: 'var(--white)', fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', maxWidth: 440, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link to="/" className="btn-gold">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link to="/properties" className="btn-outline-white">
            Browse Properties
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
