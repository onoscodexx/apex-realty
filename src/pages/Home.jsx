import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Home as HomeIcon, KeyRound, MapPin, Search, ShieldCheck, Sparkles, UserCheck } from 'lucide-react'
import { getFeaturedProperties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import { useAuth } from '../context/AuthContext'

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

export default function Home() {
  const [location, setLocation] = useState('')
  const navigate = useNavigate()
  const featured = getFeaturedProperties()
  const { user } = useAuth()

  useEffect(() => { document.title = 'Houxkeys - Verified Homes for Rent in Nigeria' }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties?location=${encodeURIComponent(location)}`)
  }

  return (
    <>
      <section
        className="hero-photo"
        style={{ backgroundImage: 'linear-gradient(90deg, rgba(5,14,29,0.86), rgba(5,14,29,0.56)), url(https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=80)' }}
      >
        <div className="container position-relative" style={{ zIndex: 1, paddingTop: '8rem', paddingBottom: '5rem' }}>
          <div className="row align-items-end g-5">
            <motion.div className="col-lg-7" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} initial="hidden" animate="visible">
              <motion.p variants={fadeUp} className="section-label mb-3">Verified rental homes</motion.p>
              <motion.h1 variants={fadeUp} style={{ color: 'white', fontWeight: 800, maxWidth: 760 }}>
                Houxkeys
              </motion.h1>
              <motion.p variants={fadeUp} style={{ color: 'rgba(255,255,255,0.78)', fontSize: '1.12rem', maxWidth: 620 }}>
                Browse real houses for rent, unlock precise locations and landlord details after verification, and book inspections with more confidence.
              </motion.p>
              <motion.form variants={fadeUp} onSubmit={handleSearch} className="search-panel">
                <MapPin size={18} color="var(--gold)" />
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Search Lagos, Abuja, Asaba..." />
                <button className="btn-gold" type="submit"><Search size={16} /> Search</button>
              </motion.form>
              <motion.div variants={fadeUp} className="d-flex gap-3 flex-wrap mt-4">
                <Link to="/properties" className="btn-gold"><HomeIcon size={16} /> Browse Rentals</Link>
                <Link to="/landlord" className="btn-outline-white"><KeyRound size={16} /> List a House</Link>
              </motion.div>
            </motion.div>

            {!user && (
              <motion.div className="col-lg-4 ms-auto" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <div className="glass-panel">
                  <Sparkles color="var(--gold)" size={26} />
                  <h3>Unlock full listing details</h3>
                  <p>Sign up with email or phone, verify with OTP, and return to the exact house page with hidden information opened.</p>
                  <Link to="/auth" className="btn-gold w-100 justify-content-center" style={{ display: 'flex' }}>Start Verification</Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="row g-4">
            {[
              { icon: ShieldCheck, title: 'Verified rentals', text: 'Listings are reviewed before they go live, with admin approval for landlord submissions.' },
              { icon: UserCheck, title: 'Private until verified', text: 'Sensitive landlord and exact address details stay blurred until renter signup and OTP verification.' },
              { icon: CheckCircle2, title: 'Landlord controls', text: 'Landlords can submit homes, upload pictures, track approvals, and manage a free listing trial.' },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="col-md-4">
                <motion.div className="feature-tile" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Icon size={28} color="var(--gold)" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-4">
            <div>
              <p className="section-label">Available now</p>
              <h2 style={{ color: 'var(--navy)' }}>Featured Rentals</h2>
              <div className="gold-divider" />
            </div>
            <Link to="/properties" className="btn-outline-gold">View All <ArrowRight size={16} /></Link>
          </div>
          <div className="row g-4">
            {featured.map((property, i) => (
              <div key={property.id} className="col-12 col-md-6 col-lg-4">
                <PropertyCard property={property} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
