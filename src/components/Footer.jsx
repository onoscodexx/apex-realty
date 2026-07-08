import { Link } from 'react-router-dom'
import { Building2, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="Houxkeys-footer">
      <div className="container py-5">
        <div className="row g-4 py-3">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <Building2 size={24} color="var(--gold)" strokeWidth={1.5} />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--white)' }}>
                Houx<span style={{ color: 'var(--gold)' }}>keys</span>
              </span>
            </div>
            <p className="mb-4" style={{ maxWidth: 300, lineHeight: 1.85 }}>
              Houxkeys helps renters find verified homes and gives landlords a safer way to list rental properties.
            </p>
            {/* Social Icons */}
            <div className="d-flex gap-2">
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="social-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Quick Links</h5>
            <ul className="p-0" style={{ listStyle: 'none' }}>
              {[
                { to: '/',           label: 'Home' },
                { to: '/properties', label: 'Properties' },
                { to: '/about',      label: 'About Us' },
                { to: '/contact',    label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to} className="mb-1">
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5>Services</h5>
            <ul className="p-0" style={{ listStyle: 'none' }}>
              {[
                'Verified Rentals',
                'Renter Verification',
                'Landlord Onboarding',
                'Listing Review',
                'Inspection Booking',
                'Admin Moderation',
              ].map(s => (
                <li key={s} className="mb-1">
                  <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6">
            <h5>Contact Us</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex gap-3 align-items-start">
                <MapPin size={16} color="var(--gold)" style={{ marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>Lagos Office</p>
                  <p className="mb-0">14 Adeola Odeku Street, Victoria Island, Lagos</p>
                </div>
              </div>
              <div className="d-flex gap-3 align-items-start">
                <MapPin size={16} color="var(--gold)" style={{ marginTop: 3, flexShrink: 0 }} />
                <div>
                  <p className="mb-0" style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600 }}>Abuja Office</p>
                  <p className="mb-0">Plot 304 Aminu Kano Crescent, Wuse 2, Abuja</p>
                </div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Phone size={15} color="var(--gold)" />
                <a href="tel:+2348001234567">+234 800 123 4567</a>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Mail size={15} color="var(--gold)" />
                <a href="mailto:hello@houxkeys.ng">hello@houxkeys.ng</a>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <Clock size={15} color="var(--gold)" />
                <span>Mon – Sat: 8:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="d-flex flex-column flex-md-row align-items-center justify-content-between pt-4 mt-3"
          style={{ borderTop: '1px solid rgba(201,168,76,0.15)', gap: '0.5rem' }}
        >
          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            &copy; {year} Houxkeys Nigeria. All rights reserved.
          </p>
          <p className="mb-0" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            Built by{' '}
            <a href="https://joikad.com" style={{ color: 'var(--gold)' }} target="_blank" rel="noreferrer">
              Joikad Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
