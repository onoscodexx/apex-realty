import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Bath, BedDouble, CalendarDays, CheckCircle2, Eye, LockKeyhole, Mail, MapPin, Maximize2, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { getPropertyById, getRelatedProperties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import { useAuth } from '../context/AuthContext'

export default function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const locationState = useLocation()
  const property = getPropertyById(id)
  const related = getRelatedProperties(id)
  const { user } = useAuth()
  const [activeImage, setActiveImage] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const unlocked = Boolean(user?.verified)

  useEffect(() => {
    document.title = property ? `${property.title} - Houxkeys` : 'Property Not Found - Houxkeys'
  }, [property])

  if (!property) {
    return (
      <div className="empty-state">
        <h2>Property Not Found</h2>
        <Link to="/properties" className="btn-gold">Back to Rentals</Link>
      </div>
    )
  }

  const revealPath = `/auth?next=${encodeURIComponent(locationState.pathname)}`

  return (
    <>
      <section className="detail-hero">
        <img src={property.images[activeImage]} alt={property.title} />
        <div className="detail-hero__overlay" />
        <div className="container detail-hero__content">
          <button onClick={() => navigate(-1)} className="ghost-button"><ArrowLeft size={15} /> Back</button>
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
            <div>
              <span className="property-card__badge property-card__badge--rent" style={{ position: 'static' }}>{property.status}</span>
              <h1>{property.title}</h1>
              <p><MapPin size={16} /> {unlocked ? property.address : property.blurredLocation}</p>
            </div>
            <div className="detail-price">{property.priceLabel}</div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--off-white)', paddingTop: '2rem' }}>
        <div className="container">
          <div className="thumb-row mb-4">
            {property.images.map((image, index) => (
              <button key={image} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)}>
                <img src={image} alt={`${property.title} view ${index + 1}`} />
              </button>
            ))}
          </div>

          <div className="row g-4">
            <div className="col-lg-8">
              <div className="content-panel">
                <div className="meta-grid">
                  {[
                    { icon: BedDouble, label: `${property.bedrooms} Bedrooms` },
                    { icon: Bath, label: `${property.bathrooms} Bathrooms` },
                    { icon: Maximize2, label: `${property.sqft.toLocaleString()} sqft` },
                    { icon: CalendarDays, label: `Available ${property.availableFrom}` },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label}><Icon size={18} color="var(--gold)" /> {label}</div>
                  ))}
                </div>

                <h2>Overview</h2>
                <p>{property.description}</p>

                <h2>Features</h2>
                <div className="features-grid">
                  {property.features.map(feature => (
                    <div key={feature}><CheckCircle2 size={17} color="var(--gold)" /> {feature}</div>
                  ))}
                </div>

                <h2>Location and Landlord</h2>
                <div className="secure-details">
                  <div className={!unlocked ? 'blurred-line' : ''}>
                    <strong>Exact address:</strong> {property.address}
                  </div>
                  <div className={!unlocked ? 'blurred-line' : ''}>
                    <strong>Landlord:</strong> {property.landlord}
                  </div>
                  <div className={!unlocked ? 'blurred-line' : ''}>
                    <strong>Contact:</strong> {property.landlordPhone} | {property.landlordEmail}
                  </div>
                  {!unlocked && (
                    <div className="lock-overlay">
                      <LockKeyhole size={24} />
                      <span>Verify email or phone to reveal protected details</span>
                      <Link to={revealPath} className="btn-gold"><Eye size={16} /> Unlock Details</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="content-panel sticky-panel">
                <div className="d-flex gap-2 align-items-center mb-3">
                  <ShieldCheck color="var(--gold)" />
                  <strong style={{ color: 'var(--navy)' }}>Verified by Houxkeys</strong>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Book an inspection and keep all conversations traceable from your dashboard.
                </p>
                {submitted ? (
                  <div className="success-note"><CheckCircle2 /> Inspection request saved.</div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                    <input className="form-control-apex mb-2" required placeholder="Full name" defaultValue={user?.name || ''} />
                    <input className="form-control-apex mb-2" required placeholder="Email or phone" defaultValue={user?.email || user?.phone || ''} />
                    <input className="form-control-apex mb-3" required type="date" />
                    <button className="btn-gold w-100 justify-content-center" style={{ display: 'flex' }}>Book Viewing</button>
                  </form>
                )}

                {unlocked && (
                  <div className="contact-actions">
                    <a href={`tel:${property.landlordPhone}`}><Phone size={16} /> Call</a>
                    <a href={`mailto:${property.landlordEmail}`}><Mail size={16} /> Email</a>
                    <a href={`https://wa.me/${property.landlordPhone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h2 style={{ color: 'var(--navy)' }}>Similar Rentals</h2>
            <div className="gold-divider" />
            <div className="row g-4">
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
