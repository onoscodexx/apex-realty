import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin,
  CheckCircle2, SendHorizontal
} from 'lucide-react'

const officeInfo = [
  {
    city: 'Lagos Office',
    address: '14 Adeola Odeku Street, Victoria Island, Lagos',
    phone: '+234 800 123 4567',
    email: 'lagos@apexrealty.ng',
    hours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  },
  {
    city: 'Abuja Office',
    address: 'Plot 304 Aminu Kano Crescent, Wuse 2, Abuja',
    phone: '+234 800 765 4321',
    email: 'abuja@apexrealty.ng',
    hours: 'Mon – Sat: 8:00 AM – 6:00 PM',
  },
]

export default function Contact() {
  useEffect(() => { document.title = 'Contact Us — Apex Realty' }, [])

  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Full name is required.'
    if (!form.email.trim())   e.email   = 'Email address is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.subject)        e.subject = 'Please select a subject.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleChange = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length) { setErrors(e2); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200)) // simulate API call
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero">
        <div className="container page-hero__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><a href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</a></li>
              <li className="breadcrumb-item active">Contact</li>
            </ol>
          </nav>
          <h1>Get In Touch</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '1.05rem' }}>
            Our team is ready to help you find your perfect property
          </p>
        </div>
      </header>

      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="row g-5">

            {/* Contact Form */}
            <div className="col-lg-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: 'var(--shadow-md)' }}
              >
                {submitted ? (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle2 size={72} color="var(--gold)" style={{ margin: '0 auto 1.5rem' }} />
                    </motion.div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1rem' }}>
                      Thank You!
                    </h2>
                    <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                      We've received your message and will be in touch within <strong>24 hours</strong>.
                    </p>
                    <button
                      className="btn-outline-gold mt-3"
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.6rem' }}>
                      Send Us a Message
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                      Fill in the form below and a member of our team will respond promptly.
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                      <div className="row g-3">
                        {/* Full Name */}
                        <div className="col-12 col-md-6">
                          <div className="form-group mb-0">
                            <label className="form-label">Full Name *</label>
                            <input
                              type="text"
                              className={`form-control-apex${errors.name ? ' border-danger' : ''}`}
                              placeholder="Your full name"
                              value={form.name}
                              onChange={e => handleChange('name', e.target.value)}
                            />
                            {errors.name && <p style={{ color: '#dc3545', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.name}</p>}
                          </div>
                        </div>

                        {/* Email */}
                        <div className="col-12 col-md-6">
                          <div className="form-group mb-0">
                            <label className="form-label">Email Address *</label>
                            <input
                              type="email"
                              className={`form-control-apex${errors.email ? ' border-danger' : ''}`}
                              placeholder="your@email.com"
                              value={form.email}
                              onChange={e => handleChange('email', e.target.value)}
                            />
                            {errors.email && <p style={{ color: '#dc3545', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.email}</p>}
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="col-12 col-md-6">
                          <div className="form-group mb-0">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control-apex"
                              placeholder="+234 800 000 0000"
                              value={form.phone}
                              onChange={e => handleChange('phone', e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Subject */}
                        <div className="col-12 col-md-6">
                          <div className="form-group mb-0">
                            <label className="form-label">Subject *</label>
                            <select
                              className={`form-control-apex${errors.subject ? ' border-danger' : ''}`}
                              value={form.subject}
                              onChange={e => handleChange('subject', e.target.value)}
                            >
                              <option value="">Select a subject</option>
                              <option value="Buy">I want to Buy</option>
                              <option value="Rent">I want to Rent</option>
                              <option value="Sell">I want to Sell</option>
                              <option value="General">General Inquiry</option>
                            </select>
                            {errors.subject && <p style={{ color: '#dc3545', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.subject}</p>}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="col-12">
                          <div className="form-group mb-0">
                            <label className="form-label">Message *</label>
                            <textarea
                              className={`form-control-apex${errors.message ? ' border-danger' : ''}`}
                              rows={5}
                              placeholder="Tell us how we can help you..."
                              value={form.message}
                              onChange={e => handleChange('message', e.target.value)}
                            />
                            {errors.message && <p style={{ color: '#dc3545', fontSize: '0.78rem', marginTop: '0.3rem' }}>{errors.message}</p>}
                          </div>
                        </div>

                        <div className="col-12">
                          <motion.button
                            type="submit"
                            className="btn-gold"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            style={{ opacity: loading ? 0.8 : 1 }}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ borderColor: 'var(--navy)', borderRightColor: 'transparent' }} />
                                Sending...
                              </>
                            ) : (
                              <>
                                <SendHorizontal size={16} />
                                Send Message
                              </>
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="section-label mb-2">Reach Us Directly</p>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontSize: '1.75rem', marginBottom: '2rem' }}>
                  Contact Information
                </h2>

                {officeInfo.map((office, i) => (
                  <div
                    key={office.city}
                    style={{
                      background: 'var(--white)', borderRadius: 'var(--radius-lg)',
                      padding: '1.5rem', marginBottom: '1.25rem',
                      boxShadow: 'var(--shadow-sm)', border: '1px solid var(--light-gray)',
                    }}
                  >
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      {office.city}
                    </h5>
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex gap-3 align-items-start">
                        <MapPin size={16} color="var(--gold)" style={{ marginTop: 2, flexShrink: 0 }} />
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.7 }}>{office.address}</span>
                      </div>
                      <div className="d-flex gap-3 align-items-center">
                        <Phone size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                        <a href={`tel:${office.phone.replace(/\s/g,'')}`} style={{ fontSize: '0.88rem', color: 'var(--text-body)', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                          onMouseLeave={e => e.target.style.color = 'var(--text-body)'}
                        >{office.phone}</a>
                      </div>
                      <div className="d-flex gap-3 align-items-center">
                        <Mail size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                        <a href={`mailto:${office.email}`} style={{ fontSize: '0.88rem', color: 'var(--text-body)', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                          onMouseLeave={e => e.target.style.color = 'var(--text-body)'}
                        >{office.email}</a>
                      </div>
                      <div className="d-flex gap-3 align-items-center">
                        <Clock size={15} color="var(--gold)" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: '0.88rem', color: 'var(--text-body)' }}>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Social */}
                <div style={{ background: 'var(--navy)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                  <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Follow Us
                  </h5>
                  <div className="d-flex gap-2">
                    {[
                      { icon: Instagram, label: 'Instagram', href: '#' },
                      { icon: Facebook,  label: 'Facebook',  href: '#' },
                      { icon: Twitter,   label: 'Twitter',   href: '#' },
                      { icon: Linkedin,  label: 'LinkedIn',  href: '#' },
                    ].map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        className="social-icon"
                        aria-label={label}
                        style={{ width: 44, height: 44 }}
                      >
                        <Icon size={17} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-5"
            style={{
              height: 340, borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, #e8eff8 0%, #d0ddef 100%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '2px dashed #b0c4de', gap: '0.75rem',
            }}
          >
            <MapPin size={44} color="var(--navy)" style={{ opacity: 0.3 }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0, fontFamily: 'var(--font-heading)' }}>
              Apex Realty — Lagos & Abuja Offices
            </p>
            <p style={{ color: 'var(--mid-gray)', fontSize: '0.82rem', margin: 0 }}>
              Integrate Google Maps API for live interactive map
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
