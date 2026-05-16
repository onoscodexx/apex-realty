import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  Search, MapPin, ChevronRight, ShieldCheck, Users, Zap,
  HeartHandshake, Star, Quote, Building2, Home as HomeIcon, Briefcase
} from 'lucide-react'
import { getFeaturedProperties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'

/* ── Animated count-up number ── */
function CountUp({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

/* ── Fade-up motion variant ── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Home() {
  const navigate   = useNavigate()
  const featured   = getFeaturedProperties()
  const [filter,   setFilter]   = useState('All')
  const [location, setLocation] = useState('')
  const [propType, setPropType] = useState('Buy')

  const filteredProps = filter === 'All'
    ? featured
    : featured.filter(p => p.status === filter)

  useEffect(() => { document.title = 'Apex Realty — Premium Real Estate in Nigeria' }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/properties?location=${encodeURIComponent(location)}&type=${propType}`)
  }

  return (
    <>
      {/* ════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════ */}
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #050e1d 0%, #0a1628 40%, #0f2040 70%, #1a2e4a 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
        aria-label="Hero"
      >
        {/* Decorative grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Gold glow blob */}
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', zIndex: 0,
        }} />

        <div className="container position-relative" style={{ zIndex: 1, paddingTop: '7rem', paddingBottom: '5rem' }}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-9 col-xl-8">

              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <motion.p variants={fadeUp} className="section-label mb-3">
                  Nigeria's Premier Real Estate Partner
                </motion.p>

                <motion.h1
                  variants={fadeUp}
                  style={{ color: 'var(--white)', fontWeight: 800, lineHeight: 1.1 }}
                  className="mb-4"
                >
                  Find Your Perfect
                  <br />
                  <span style={{
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    Property in Nigeria
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.7)', maxWidth: 580, margin: '0 auto 2.5rem' }}
                >
                  Premium residential and commercial real estate across Nigeria's finest locations
                </motion.p>

                {/* Search Bar */}
                <motion.form
                  variants={fadeUp}
                  onSubmit={handleSearch}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    alignItems: 'center',
                  }}
                >
                  {/* Location */}
                  <div style={{ flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem' }}>
                    <MapPin size={18} color="var(--gold)" />
                    <input
                      type="text"
                      placeholder="Search city, area or estate..."
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--white)', flex: 1, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  {/* Property Type */}
                  <div style={{ flex: '1 1 160px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem' }}>
                    <select
                      value={propType}
                      onChange={e => setPropType(e.target.value)}
                      style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--white)', width: '100%', fontSize: '0.9rem', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                    >
                      <option value="Buy"        style={{ color: 'var(--navy)' }}>Buy</option>
                      <option value="Rent"       style={{ color: 'var(--navy)' }}>Rent</option>
                      <option value="Commercial" style={{ color: 'var(--navy)' }}>Commercial</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <motion.button
                    type="submit"
                    className="btn-gold"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ flex: '0 0 auto' }}
                  >
                    <Search size={16} />
                    Search
                  </motion.button>
                </motion.form>

                {/* Quick links */}
                <motion.div variants={fadeUp} className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                  {['Lagos', 'Abuja', 'Port Harcourt', 'Lekki'].map(city => (
                    <Link
                      key={city}
                      to={`/properties?location=${city}`}
                      style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '0.25rem', transition: 'color 0.2s' }}
                      className="text-decoration-none"
                      onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                    >
                      <ChevronRight size={12} /> {city}
                    </Link>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, var(--off-white), transparent)' }} />
      </section>

      {/* ════════════════════════════════════════
          STATS SECTION
      ════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--navy)' }} aria-label="Statistics">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[
              { end: 500,  suffix: '+', label: 'Properties Listed',   icon: Building2 },
              { end: 1200, suffix: '+', label: 'Happy Clients',        icon: Users },
              { end: 15,   suffix: '+', label: 'Years Experience',     icon: Star },
              { end: 20,   suffix: '+', label: 'Cities Covered',       icon: MapPin },
            ].map(({ end, suffix, label, icon: Icon }, i) => (
              <div key={label} className="col-6 col-lg-3">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>
                    <Icon size={28} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                  }}>
                    <CountUp end={end} suffix={suffix} />
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
                    {label}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED PROPERTIES
      ════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }} aria-label="Featured Properties">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Handpicked for You</p>
            <h2 style={{ color: 'var(--navy)' }}>Featured Properties</h2>
            <div className="gold-divider center" />
            <p style={{ color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto 2rem' }}>
              Discover our curated selection of premium properties across Nigeria's most sought-after locations.
            </p>

            {/* Filter Tabs */}
            <div className="d-flex justify-content-center gap-2 flex-wrap">
              {['All', 'For Sale', 'For Rent'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '0.5rem 1.4rem',
                    borderRadius: 'var(--radius-full)',
                    border: filter === f ? 'none' : '1.5px solid #ddd',
                    background: filter === f ? 'var(--navy)' : 'transparent',
                    color: filter === f ? 'var(--gold)' : 'var(--text-muted)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="row g-4">
            {filteredProps.slice(0, 6).map((property, i) => (
              <div key={property.id} className="col-12 col-md-6 col-lg-4">
                <PropertyCard property={property} index={i} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/properties" className="btn-gold">
              View All Properties <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--navy)' }} aria-label="Why Choose Apex Realty">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label">Our Advantage</p>
            <h2 style={{ color: 'var(--white)' }}>Why Choose Apex Realty?</h2>
            <div className="gold-divider center" />
          </motion.div>

          <div className="row g-4">
            {[
              {
                icon: ShieldCheck,
                title: 'Verified Listings',
                desc: 'Every property on our platform is physically inspected, legally verified, and cleared of encumbrances before listing.',
              },
              {
                icon: Users,
                title: 'Expert Agents',
                desc: '15+ years of deep local market expertise across Lagos, Abuja, Port Harcourt and beyond — we know the terrain.',
              },
              {
                icon: Zap,
                title: 'Seamless Process',
                desc: 'From your first search to handing over the keys, we streamline every step so you move faster with less stress.',
              },
              {
                icon: HeartHandshake,
                title: 'After-Sale Support',
                desc: 'Our relationship doesn\'t end at completion. We stay with you for maintenance referrals, management, and more.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="col-12 col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem 1.5rem',
                    height: '100%',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{ background: 'rgba(201,168,76,0.06)', borderColor: 'rgba(201,168,76,0.35)' }}
                >
                  <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-md)',
                    background: 'rgba(201,168,76,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon size={26} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <h4 style={{ color: 'var(--white)', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>
                    {title}
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
                    {desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════ */}
      <section className="section-pad" style={{ background: 'var(--white)' }} aria-label="Client Testimonials">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Client Stories</p>
            <h2 style={{ color: 'var(--navy)' }}>What Our Clients Say</h2>
            <div className="gold-divider center" />
          </motion.div>

          <div className="row g-4 justify-content-center">
            {[
              {
                name: 'Adaeze Okonkwo',
                location: 'Lekki, Lagos',
                quote: 'Apex Realty found us our dream home in three weeks. Their attention to our specific needs and budget was extraordinary — something we had not experienced with any other agency.',
                rating: 5,
              },
              {
                name: 'Emeka Nwosu',
                location: 'Asokoro, Abuja',
                quote: 'As a returning diaspora, I was nervous about buying property in Nigeria remotely. The Apex team handled everything with complete transparency. I could not be happier with the outcome.',
                rating: 5,
              },
              {
                name: 'Folake Adeyemi',
                location: 'GRA, Ikeja, Lagos',
                quote: 'From the first viewing to the day we got our keys, Apex Realty was professional, prompt, and genuinely caring. They negotiated a price far below what we expected to pay.',
                rating: 5,
              },
            ].map(({ name, location, quote, rating }, i) => (
              <div key={name} className="col-12 col-md-6 col-lg-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  style={{
                    background: 'var(--off-white)',
                    border: '1px solid var(--light-gray)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    height: '100%',
                    position: 'relative',
                  }}
                >
                  <Quote size={36} color="var(--gold)" style={{ opacity: 0.25, position: 'absolute', top: '1.5rem', right: '1.5rem' }} />
                  
                  <div className="d-flex gap-1 mb-3">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} size={15} fill="var(--gold)" color="var(--gold)" />
                    ))}
                  </div>

                  <p style={{ color: 'var(--text-body)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.92rem', fontStyle: 'italic' }}>
                    "{quote}"
                  </p>

                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      width: 46, height: 46, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-heading)', fontWeight: 700,
                      color: 'var(--gold)', fontSize: '1.1rem', flexShrink: 0,
                    }}>
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>{name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={11} /> {location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA SECTION
      ════════════════════════════════════════ */}
      <section
        className="section-pad"
        style={{
          background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-label="Call to Action"
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-40px', width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div className="container position-relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Building2 size={48} color="rgba(10,22,40,0.3)" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ color: 'var(--navy)', marginBottom: '1rem', fontWeight: 800 }}>
              Ready to Find Your Dream Property?
            </h2>
            <p style={{ color: 'rgba(10,22,40,0.7)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 2.5rem' }}>
              Whether you're buying, renting, or selling — our expert team is here to guide you every step of the way.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/properties" className="btn-outline-white" style={{ borderColor: 'rgba(10,22,40,0.4)', color: 'var(--navy)' }}>
                <HomeIcon size={16} />
                Browse Properties
              </Link>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.875rem 2rem',
                background: 'var(--navy)', color: 'var(--gold)',
                borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.9rem',
                transition: 'all 0.25s',
              }}>
                <Briefcase size={16} />
                Talk to an Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
