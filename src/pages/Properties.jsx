import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'

const PAGE_SIZE = 9

export default function Properties() {
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    type:     'All',
    status:   'For Rent',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'Any',
    location: searchParams.get('location') || '',
  })
  const [page,          setPage]          = useState(1)
  const [drawerOpen,    setDrawerOpen]    = useState(false)

  useEffect(() => { document.title = 'Rental Homes - Houxkeys' }, [])

  // Apply filters
  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (filters.type     !== 'All'  && p.type   !== filters.type)   return false
      if (filters.status   !== 'All'  && p.status  !== filters.status) return false
      if (filters.bedrooms !== 'Any'  && filters.bedrooms !== '5+') {
        if (p.bedrooms !== Number(filters.bedrooms)) return false
      }
      if (filters.bedrooms === '5+' && p.bedrooms < 5) return false
      if (filters.minPrice && p.price < Number(filters.minPrice.replace(/,/g, ''))) return false
      if (filters.maxPrice && p.price > Number(filters.maxPrice.replace(/,/g, ''))) return false
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false
      return true
    })
  }, [filters])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const setFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: val }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({ type: 'All', status: 'For Rent', minPrice: '', maxPrice: '', bedrooms: 'Any', location: '' })
    setPage(1)
  }

  const FilterPanel = () => (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', margin: 0 }}>Filters</h5>
        <button
          onClick={clearFilters}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          <X size={13} /> Clear all
        </button>
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control-apex"
          placeholder="City, area or estate..."
          value={filters.location}
          onChange={e => setFilter('location', e.target.value)}
        />
      </div>

      {/* Property Type */}
      <div className="mb-4">
        <label className="form-label">Property Type</label>
        {['All', 'House', 'Apartment', 'Flat', 'Terrace', 'Studio', 'Bungalow'].map(t => (
          <div key={t} className="d-flex align-items-center gap-2 mb-1" style={{ cursor: 'pointer' }} onClick={() => setFilter('type', t)}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `2px solid ${filters.type === t ? 'var(--gold)' : '#ccc'}`,
              background: filters.type === t ? 'var(--gold)' : 'transparent',
              flexShrink: 0, transition: 'all 0.2s',
            }} />
            <span style={{ fontSize: '0.87rem', color: 'var(--text-body)' }}>{t}</span>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="form-label">Status</label>
        {['For Rent'].map(s => (
          <div key={s} className="d-flex align-items-center gap-2 mb-1" style={{ cursor: 'pointer' }} onClick={() => setFilter('status', s)}>
            <div style={{
              width: 18, height: 18, borderRadius: '50%',
              border: `2px solid ${filters.status === s ? 'var(--gold)' : '#ccc'}`,
              background: filters.status === s ? 'var(--gold)' : 'transparent',
              flexShrink: 0, transition: 'all 0.2s',
            }} />
            <span style={{ fontSize: '0.87rem', color: 'var(--text-body)' }}>{s}</span>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="form-label">Price Range (₦)</label>
        <input
          type="number"
          className="form-control-apex mb-2"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={e => setFilter('minPrice', e.target.value)}
        />
        <input
          type="number"
          className="form-control-apex"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={e => setFilter('maxPrice', e.target.value)}
        />
      </div>

      {/* Bedrooms */}
      <div className="mb-4">
        <label className="form-label">Bedrooms</label>
        <div className="d-flex gap-2 flex-wrap">
          {['Any', '1', '2', '3', '4', '5+'].map(b => (
            <button
              key={b}
              onClick={() => setFilter('bedrooms', b)}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: `1.5px solid ${filters.bedrooms === b ? 'var(--gold)' : '#ddd'}`,
                background: filters.bedrooms === b ? 'var(--gold)' : 'transparent',
                color: filters.bedrooms === b ? 'var(--navy)' : 'var(--text-muted)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'var(--font-body)',
              }}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero">
        <div className="container page-hero__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><a href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</a></li>
              <li className="breadcrumb-item active">Properties</li>
            </ol>
          </nav>
          <h1>Homes for Rent</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '1.05rem' }}>
            Browse verified rental houses and apartments across Nigeria
          </p>
        </div>
      </header>

      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">

          {/* Mobile filter button */}
          <div className="d-lg-none mb-4">
            <button
              className="btn-outline-gold w-100 justify-content-center"
              onClick={() => setDrawerOpen(true)}
              style={{ display: 'flex' }}
            >
              <SlidersHorizontal size={16} /> Filter Properties
            </button>
          </div>

          {/* Mobile Filter Drawer */}
          {drawerOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 1050 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setDrawerOpen(false)} />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0, width: 300,
                  background: 'var(--white)', padding: '2rem 1.5rem', overflowY: 'auto',
                }}
              >
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={22} />
                </button>
                <FilterPanel />
                <button className="btn-gold w-100 justify-content-center mt-3" style={{ display: 'flex' }} onClick={() => setDrawerOpen(false)}>
                  Apply Filters
                </button>
              </motion.div>
            </div>
          )}

          <div className="row g-4">
            {/* Sidebar (desktop) */}
            <div className="col-lg-3 d-none d-lg-block">
              <div style={{
                background: 'var(--white)', borderRadius: 'var(--radius-lg)',
                padding: '1.75rem', boxShadow: 'var(--shadow-sm)',
                position: 'sticky', top: '6rem',
              }}>
                <FilterPanel />
              </div>
            </div>

            {/* Results */}
            <div className="col-lg-9">
              {/* Results header */}
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Showing <strong style={{ color: 'var(--navy)' }}>
                    {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)}
                  </strong> of <strong style={{ color: 'var(--navy)' }}>{filtered.length}</strong> properties
                </p>
              </div>

              {paginated.length === 0 ? (
                <div className="text-center py-5">
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    No properties match your filters. Try adjusting your search.
                  </p>
                  <button className="btn-gold mt-3" onClick={clearFilters}>Clear Filters</button>
                </div>
              ) : (
                <div className="row g-4">
                  {paginated.map((property, i) => (
                    <div key={property.id} className="col-12 col-md-6 col-xl-4">
                      <PropertyCard property={property} index={i} />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex align-items-center justify-content-center gap-2 mt-5 flex-wrap">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    style={{
                      padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid #ddd', background: 'transparent',
                      color: page === 1 ? '#ccc' : 'var(--navy)', cursor: page === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                    }}
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      style={{
                        width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                        border: `1.5px solid ${page === n ? 'var(--gold)' : '#ddd'}`,
                        background: page === n ? 'var(--gold)' : 'transparent',
                        color: page === n ? 'var(--navy)' : 'var(--text-body)',
                        fontWeight: 600, cursor: 'pointer', fontSize: '0.87rem',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{
                      padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid #ddd', background: 'transparent',
                      color: page === totalPages ? '#ccc' : 'var(--navy)',
                      cursor: page === totalPages ? 'not-allowed' : 'pointer',
                      fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)',
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
