import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Maximize2, MapPin } from 'lucide-react'

export default function PropertyCard({ property, index = 0 }) {
  const { id, title, status, priceLabel, location, bedrooms, bathrooms, sqft, images = [], type, verified } = property

  return (
    <motion.div
      className="property-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="property-card__image">
        <img className="property-card__image-inner" src={images[0]} alt={title} loading="lazy" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,22,40,0.45), transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white' }}>
          {verified ? 'Verified' : type}
        </div>

        {/* Status Badge */}
        <span className="property-card__badge property-card__badge--rent">
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
