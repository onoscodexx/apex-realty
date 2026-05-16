import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'

export default function PropertyCard({ property, index = 0 }) {
  const { id, title, status, priceLabel, location, bedrooms, bathrooms, sqft, gradient, type } = property

  return (
    <motion.div
      className="property-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      {/* Image Placeholder */}
      <div className="property-card__image">
        <div
          className="property-card__image-inner"
          style={{ background: gradient }}
          role="img"
          aria-label={`${title} property image`}
        >
          {/* Decorative overlay pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
          }} />
          {/* Type label at bottom */}
          <div style={{
            position: 'absolute', bottom: '1rem', right: '1rem',
            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
            fontFamily: 'var(--font-body)',
          }}>
            {type}
          </div>
        </div>

        {/* Status Badge */}
        <span className={`property-card__badge property-card__badge--${status === 'For Sale' ? 'sale' : 'rent'}`}>
          {status}
        </span>
      </div>

      {/* Body */}
      <div className="property-card__body">
        <div className="property-card__price">{priceLabel}</div>
        <h3 className="property-card__title">{title}</h3>
        <div className="property-card__location">
          <MapPin size={13} />
          {location}
        </div>

        {/* Meta — only show if relevant (land/commercial has no beds) */}
        <div className="property-card__meta">
          {bedrooms > 0 && (
            <div className="property-card__meta-item">
              <BedDouble size={14} />
              {bedrooms} Bed{bedrooms !== 1 ? 's' : ''}
            </div>
          )}
          {bathrooms > 0 && (
            <div className="property-card__meta-item">
              <Bath size={14} />
              {bathrooms} Bath{bathrooms !== 1 ? 's' : ''}
            </div>
          )}
          <div className="property-card__meta-item">
            <Maximize2 size={14} />
            {sqft.toLocaleString()} sqft
          </div>
        </div>

        <div className="property-card__footer">
          <Link to={`/properties/${id}`} className="property-card__btn" style={{ textAlign: 'center', display: 'block' }}>
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
