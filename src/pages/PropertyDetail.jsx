import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BedDouble, Bath, Maximize2, Car, CalendarDays, MapPin,
  CheckCircle2, Phone, Mail, MessageCircle, ArrowLeft, Tag
} from 'lucide-react'
import { getPropertyById, getRelatedProperties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'

export default function PropertyDetail() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const property   = getPropertyById(id)
  const related    = getRelatedProperties(id)
  const [tab,      setTab]      = useState('overview')
  const [form,     setForm]     = useState({ name: '', email: '', phone: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (property) document.title = `${property.title} — Apex Realty`
    else document.title = 'Property Not Found — Apex Realty'
  }, [property])

  if (!property) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)' }}>Property Not Found</h2>
        <Link to="/properties" className="btn-gold">← Back to Properties</Link>
      </div>
    )
  }

  const { title, status, priceLabel, location, bedrooms, bathrooms, sqft,
          parking, yearBuilt, description, features, gradient, type } = property

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const tabs = ['overview', 'features', 'location', 'agent']

  return (
    <>
      {/* Hero Image */}
      <div style={{ height: '55vh', minHeight: 350, background: gradient, position: 'relative', marginTop: 0 }}>
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.5)' }} />
        {/* Pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <div className="container h-100 d-flex align-items-end pb-4 position-relative">
          <div>
            <button
              onClick={() => navigate(-1)}
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: 'var(--radius-sm)', padding: '0.45rem 1rem', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem', backdropFilter: 'blur(8px)', fontFamily: 'var(--font-body)' }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section style={{ background: 'var(--off-white)', paddingBottom: '5rem' }}>
        <div className="container">
          <div className="row g-4" style={{ marginTop: '-2rem', position: 'relative', zIndex: 2 }}>

            {/* Left Column */}
            <div className="col-lg-8">

              {/* Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-md)', marginBottom: '1.5rem' }}
              >
                <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
                      <span className={`property-card__badge property-card__badge--${status === 'For Sale' ? 'sale' : 'rent'}`} style={{ position: 'static' }}>
                        {status}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Tag size={12} /> {type}
                      </span>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                      {title}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <MapPin size={15} color="var(--gold)" />
                      {location}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--gold-dark)', whiteSpace: 'nowrap' }}>
                    {priceLabel}
                  </div>
                </div>

                {/* Key Details */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--light-gray)' }}>
                  {[
                    { icon: BedDouble,    label: `${bedrooms} Bedrooms`,       show: bedrooms > 0 },
                    { icon: Bath,         label: `${bathrooms} Bathrooms`,      show: bathrooms > 0 },
                    { icon: Maximize2,    label: `${sqft.toLocaleString()} sqft`, show: true },
                    { icon: Car,          label: `${parking} Parking`,          show: parking > 0 },
                    { icon: CalendarDays, label: `Built ${yearBuilt}`,          show: yearBuilt > 0 },
                  ].filter(d => d.show).map(({ icon: Icon, label }) => (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                      background: 'var(--off-white)', borderRadius: 'var(--radius-sm)',
                      padding: '0.5rem 1rem', fontSize: '0.83rem', color: 'var(--text-body)', fontWeight: 500,
                    }}>
                      <Icon size={15} color="var(--gold)" />
                      {label}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}
              >
                {/* Tab Nav */}
                <div style={{ display: 'flex', borderBottom: '1px solid var(--light-gray)', padding: '0 1.5rem' }}>
                  {tabs.map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        padding: '1.1rem 1.25rem',
                        border: 'none', background: 'transparent',
                        borderBottom: `2.5px solid ${tab === t ? 'var(--gold)' : 'transparent'}`,
                        color: tab === t ? 'var(--navy)' : 'var(--text-muted)',
                        fontWeight: tab === t ? 700 : 500,
                        fontSize: '0.88rem', cursor: 'pointer',
                        textTransform: 'capitalize', fontFamily: 'var(--font-body)',
                        transition: 'all 0.2s', whiteSpace: 'nowrap',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div style={{ padding: '2rem' }}>
                  {tab === 'overview' && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.3rem' }}>
                        Property Overview
                      </h3>
                      {description.split('\n\n').map((para, i) => (
                        <p key={i} style={{ color: 'var(--text-body)', lineHeight: 1.85, marginBottom: '1rem' }}>{para}</p>
                      ))}
                    </div>
                  )}

                  {tab === 'features' && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                        Property Features & Amenities
                      </h3>
                      <div className="row g-3">
                        {features.map(feature => (
                          <div key={feature} className="col-12 col-md-6">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'var(--off-white)', borderRadius: 'var(--radius-sm)' }}>
                              <CheckCircle2 size={18} color="var(--gold)" />
                              <span style={{ fontSize: '0.9rem', color: 'var(--text-body)', fontWeight: 500 }}>{feature}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tab === 'location' && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.3rem' }}>
                        Location
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <MapPin size={18} color="var(--gold)" />
                        <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>{location}</span>
                      </div>
                      {/* Map Placeholder */}
                      <div style={{
                        height: 320, borderRadius: 'var(--radius-lg)',
                        background: 'linear-gradient(135deg, #e8f4f8 0%, #d0e8f0 100%)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        border: '2px dashed #b0d0e0', gap: '0.75rem',
                      }}>
                        <MapPin size={36} color="var(--navy)" style={{ opacity: 0.4 }} />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                          Map view — {location}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
                          Integrate Google Maps API for live map
                        </p>
                      </div>
                    </div>
                  )}

                  {tab === 'agent' && (
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                        Listing Agent
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{
                          width: 80, height: 80, borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--gold)',
                          flexShrink: 0,
                        }}>
                          C
                        </div>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '0.25rem' }}>Chukwuemeka Obi</h4>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Senior Property Consultant · Lagos</p>
                          <div className="d-flex gap-2 flex-wrap">
                            <a href="tel:+2348001234567" className="btn-gold" style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}>
                              <Phone size={14} /> Call Agent
                            </a>
                            <a href="mailto:c.obi@apexrealty.ng" className="btn-outline-gold" style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}>
                              <Mail size={14} /> Email
                            </a>
                            <a href="https://wa.me/2348001234567" target="_blank" rel="noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.25rem', fontSize: '0.82rem', background: '#25D366', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontFamily: 'var(--font-body)' }}
                            >
                              <MessageCircle size={14} /> WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ position: 'sticky', top: '6rem' }}
              >
                {/* Price Box */}
                <div style={{
                  background: 'var(--navy)', borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem', marginBottom: '1.25rem', boxShadow: 'var(--shadow-lg)',
                }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '0.25rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Listing Price</p>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold)', marginBottom: '0.5rem' }}>
                    {priceLabel}
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0 }}>{status} · {type}</p>
                </div>

                {/* Booking Form */}
                <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-md)', marginBottom: '1.25rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
                    Book a Viewing
                  </h4>

                  {submitted ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                      <CheckCircle2 size={48} color="var(--gold)" style={{ margin: '0 auto 1rem' }} />
                      <h5 style={{ color: 'var(--navy)', fontFamily: 'var(--font-heading)' }}>Request Sent!</h5>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>We'll contact you within 24 hours to confirm your viewing.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {[
                        { label: 'Full Name',       key: 'name',    type: 'text',  placeholder: 'Your name' },
                        { label: 'Email Address',   key: 'email',   type: 'email', placeholder: 'your@email.com' },
                        { label: 'Phone Number',    key: 'phone',   type: 'tel',   placeholder: '+234...' },
                        { label: 'Preferred Date',  key: 'date',    type: 'date',  placeholder: '' },
                      ].map(({ label, key, type, placeholder }) => (
                        <div className="form-group" key={key}>
                          <label className="form-label">{label} *</label>
                          <input
                            type={type}
                            required
                            className="form-control-apex"
                            placeholder={placeholder}
                            value={form[key]}
                            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          />
                        </div>
                      ))}
                      <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea
                          className="form-control-apex"
                          rows={3}
                          placeholder="Any questions or special requirements..."
                          value={form.message}
                          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                          style={{ minHeight: 80 }}
                        />
                      </div>
                      <motion.button
                        type="submit"
                        className="btn-gold w-100 justify-content-center"
                        style={{ display: 'flex', marginTop: '0.5rem' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Viewing
                      </motion.button>
                    </form>
                  )}
                </div>

                {/* Agent Quick Contact */}
                <div style={{ background: 'var(--off-white)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--light-gray)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                      background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--gold)',
                    }}>C</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem', fontFamily: 'var(--font-heading)' }}>Chukwuemeka Obi</p>
                      <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.78rem' }}>Senior Consultant</p>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <a href="tel:+2348001234567" className="btn-gold flex-fill justify-content-center" style={{ display: 'flex', padding: '0.6rem', fontSize: '0.8rem' }}>
                      <Phone size={14} />
                    </a>
                    <a href="mailto:c.obi@apexrealty.ng" className="btn-outline-gold flex-fill justify-content-center" style={{ display: 'flex', padding: '0.6rem', fontSize: '0.8rem' }}>
                      <Mail size={14} />
                    </a>
                    <a href="https://wa.me/2348001234567" target="_blank" rel="noreferrer"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.6rem', background: '#25D366', color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: 600, fontSize: '0.8rem' }}
                    >
                      <MessageCircle size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related Properties */}
          <div className="mt-5 pt-3">
            <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '0.5rem' }}>Similar Properties</h2>
            <div className="gold-divider" />
            <div className="row g-4 mt-2">
              {related.map((p, i) => (
                <div key={p.id} className="col-12 col-md-6 col-lg-4">
                  <PropertyCard property={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
