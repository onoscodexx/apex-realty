import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Award, Star, Users, Building2, MapPin, Target, Eye } from 'lucide-react'

const team = [
  { name: 'Adebayo Okafor',    role: 'Chief Executive Officer',       bio: 'A 20-year veteran of Nigerian real estate. Adebayo built Apex from the ground up with a vision of transparent, client-first property services.',      initial: 'A' },
  { name: 'Ngozi Eze',         role: 'Head of Residential Sales',     bio: 'Ngozi leads our residential division with passion and precision, having facilitated over 400 successful property transactions across Lagos and Abuja.', initial: 'N' },
  { name: 'Tunde Fashola',     role: 'Commercial Properties Director', bio: 'With a background in corporate finance, Tunde specialises in high-value commercial leasing, investment properties, and portfolio acquisitions.',       initial: 'T' },
  { name: 'Amaka Nwachukwu',   role: 'Head of Property Management',   bio: 'Amaka oversees the management of over 200 residential and commercial units, ensuring landlords and tenants experience seamless service.',             initial: 'A' },
  { name: 'Emeka Duru',        role: 'Senior Legal Counsel',          bio: 'A certified property law expert, Emeka safeguards every transaction — from due diligence to deed of assignment — ensuring full legal compliance.',       initial: 'E' },
  { name: 'Fatima Al-Hassan',  role: 'Head of Marketing & Digital',   bio: 'Fatima drives Apex\'s digital presence and brand strategy, connecting properties with the right buyers through innovative marketing campaigns.',           initial: 'F' },
]

const awards = [
  { icon: Award, label: 'ISO 9001 Certified',   sub: 'Quality Management' },
  { icon: Star,  label: 'Top Agency 2023',       sub: 'Nigerian Estate Awards' },
  { icon: Users, label: 'NIESV Member',          sub: 'Nigerian Institute of Estate Surveyors' },
  { icon: Star,  label: '5-Star Rated',          sub: 'Google & Trustpilot' },
]

export default function About() {
  useEffect(() => { document.title = 'About Us — Apex Realty' }, [])

  return (
    <>
      {/* Page Hero */}
      <header className="page-hero">
        <div className="container page-hero__content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><a href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</a></li>
              <li className="breadcrumb-item active">About</li>
            </ol>
          </nav>
          <h1>About Apex Realty</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '1.05rem' }}>
            Nigeria's most trusted real estate partner since 2009
          </p>
        </div>
      </header>

      {/* Our Story */}
      <section className="section-pad" style={{ background: 'var(--white)' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="section-label">Our Story</p>
                <h2 style={{ color: 'var(--navy)', marginBottom: 0 }}>Built on Trust,<br />Driven by Results</h2>
                <div className="gold-divider" />
                <p style={{ color: 'var(--text-body)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                  Founded in 2009, Apex Realty has grown to become one of Nigeria's most trusted real estate companies. What began as a small boutique agency in Victoria Island, Lagos has evolved into a full-service property firm with offices in Lagos, Abuja, and a growing presence in Port Harcourt and the South-South region.
                </p>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                  Over 15 years, we have helped more than 1,200 families and businesses find their ideal properties — from first-time apartment seekers to seasoned investors building multi-property portfolios. Our reputation is built on three pillars: verified listings, expert guidance, and genuine after-sale support.
                </p>
                <p style={{ color: 'var(--text-body)', lineHeight: 1.85 }}>
                  We believe that real estate is not merely a transaction — it is the foundation upon which lives, families, and businesses are built. That belief drives everything we do.
                </p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Image Placeholder */}
                <div style={{
                  height: 460, borderRadius: 'var(--radius-xl)',
                  background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-light) 60%, var(--navy-muted) 100%)',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: 'var(--shadow-xl)',
                }}>
                  {/* Decorative elements */}
                  <div style={{ position: 'absolute', top: '2rem', left: '2rem', right: '2rem', bottom: '2rem', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 'var(--radius-lg)' }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <Building2 size={64} color="rgba(201,168,76,0.35)" strokeWidth={1} />
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>
                      Apex Realty Headquarters<br />Victoria Island, Lagos
                    </p>
                  </div>
                  {/* Gold accent box */}
                  <div style={{
                    position: 'absolute', bottom: '-1px', right: '-1px',
                    background: 'var(--gold)', color: 'var(--navy)',
                    padding: '1.5rem', borderRadius: 'var(--radius-lg) 0 var(--radius-xl) 0',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>15+</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Years</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Our Purpose</p>
            <h2 style={{ color: 'var(--navy)' }}>Mission & Vision</h2>
            <div className="gold-divider center" />
          </motion.div>

          <div className="row g-4 justify-content-center">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To connect every Nigerian — whether in Lagos, Abuja, the diaspora, or beyond — with property opportunities that transform their lives. We achieve this through verified listings, transparent processes, and expert human guidance at every step.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                text: 'To be the most trusted, technologically advanced, and client-centric real estate company in West Africa — a company that sets the standard for integrity, innovation, and impact in the property sector.',
              },
            ].map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="col-md-6 col-lg-5">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.55 }}
                  style={{
                    background: 'var(--white)', borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem', height: '100%',
                    border: '1px solid var(--light-gray)', boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <Icon size={28} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.4rem' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-body)', lineHeight: 1.85, margin: 0 }}>{text}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">The People Behind Apex</p>
            <h2 style={{ color: 'var(--white)' }}>Meet Our Team</h2>
            <div className="gold-divider center" />
          </motion.div>

          <div className="row g-4">
            {team.map(({ name, role, bio, initial }, i) => (
              <div key={name} className="col-12 col-md-6 col-lg-4">
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    height: '100%',
                    transition: 'all 0.3s',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(201,168,76,0.3)' }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%', marginBottom: '1.25rem',
                    background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy)',
                    boxShadow: 'var(--shadow-gold)',
                  }}>
                    {initial}
                  </div>

                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--white)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                    {name}
                  </h4>
                  <p style={{ color: 'var(--gold)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {role}
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                    {bio}
                  </p>
                  <a href="#" aria-label={`${name} LinkedIn`} style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    <Linkedin size={18} />
                  </a>
                </motion.article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-pad" style={{ background: 'var(--gold)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)' }} />
        <div className="container position-relative">
          <div className="row g-4 justify-content-center text-center">
            {[
              { value: '500+',   label: 'Properties Listed',  icon: Building2 },
              { value: '1,200+', label: 'Happy Clients',       icon: Users },
              { value: '15+',    label: 'Years Experience',    icon: Star },
              { value: '20+',    label: 'Cities Covered',      icon: MapPin },
            ].map(({ value, label, icon: Icon }, i) => (
              <div key={label} className="col-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Icon size={28} color="rgba(10,22,40,0.5)" style={{ margin: '0 auto 0.75rem' }} />
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--navy)', lineHeight: 1 }}>
                    {value}
                  </div>
                  <p style={{ color: 'rgba(10,22,40,0.65)', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>{label}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-pad" style={{ background: 'var(--white)' }}>
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label">Recognition</p>
            <h2 style={{ color: 'var(--navy)' }}>Awards & Certifications</h2>
            <div className="gold-divider center" />
          </motion.div>

          <div className="row g-4 justify-content-center">
            {awards.map(({ icon: Icon, label, sub }, i) => (
              <div key={label} className="col-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="text-center"
                  style={{
                    padding: '2rem 1.5rem',
                    border: '1px solid var(--light-gray)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--off-white)',
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%', margin: '0 auto 1rem',
                    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={28} color="var(--gold)" strokeWidth={1.5} />
                  </div>
                  <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--navy)', fontSize: '1rem', marginBottom: '0.35rem' }}>{label}</h5>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{sub}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
