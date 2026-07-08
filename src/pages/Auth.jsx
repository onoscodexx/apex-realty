import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, KeyRound, Mail, Phone, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [role, setRole] = useState('renter')
  const [contactMode, setContactMode] = useState('email')
  const [step, setStep] = useState('start')
  const [form, setForm] = useState({ name: '', email: '', phone: '', otp: '' })
  const next = params.get('next') || (role === 'landlord' ? '/landlord' : '/dashboard')

  useEffect(() => { document.title = 'Sign In - Houxkeys' }, [])

  const sendOtp = (e) => {
    e.preventDefault()
    setStep('verify')
  }

  const verify = (e) => {
    e.preventDefault()
    signIn({
      name: form.name || (role === 'landlord' ? 'Verified Landlord' : 'Verified Renter'),
      role,
      email: contactMode === 'email' ? form.email : '',
      phone: contactMode === 'phone' ? form.phone : '',
      profileComplete: false,
    })
    setStep('done')
    setTimeout(() => navigate(next), 900)
  }

  return (
    <section className="auth-shell">
      <motion.div className="auth-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="auth-brand"><KeyRound color="var(--gold)" /> Houxkeys</Link>
        <h1>{step === 'done' ? 'Verified' : 'Access Houxkeys'}</h1>
        <p>Use email or phone verification to unlock protected rental details and dashboards.</p>

        {step === 'done' ? (
          <div className="text-center py-4">
            <CheckCircle2 size={70} color="var(--gold)" style={{ margin: '0 auto 1rem' }} />
            <p>Taking you back to where you left off...</p>
          </div>
        ) : (
          <form onSubmit={step === 'start' ? sendOtp : verify}>
            <div className="segmented mb-3">
              {['renter', 'landlord'].map(item => (
                <button type="button" key={item} className={role === item ? 'active' : ''} onClick={() => setRole(item)}>
                  {item === 'renter' ? 'Renter' : 'Landlord'}
                </button>
              ))}
            </div>

            <input className="form-control-apex mb-3" placeholder="Full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

            <div className="segmented mb-3">
              <button type="button" className={contactMode === 'email' ? 'active' : ''} onClick={() => setContactMode('email')}><Mail size={15} /> Email</button>
              <button type="button" className={contactMode === 'phone' ? 'active' : ''} onClick={() => setContactMode('phone')}><Phone size={15} /> Phone</button>
            </div>

            {contactMode === 'email' ? (
              <input className="form-control-apex mb-3" type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            ) : (
              <input className="form-control-apex mb-3" type="tel" required placeholder="+234..." value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            )}

            {role === 'landlord' && (
              <div className="security-note mb-3">
                <ShieldCheck size={18} />
                Landlord accounts require NIN, passport, driver's licence, or CAC document verification in the dashboard.
              </div>
            )}

            {step === 'verify' && (
              <input className="form-control-apex mb-3" required placeholder="Enter OTP code, try 123456" value={form.otp} onChange={e => setForm(f => ({ ...f, otp: e.target.value }))} />
            )}

            <button className="btn-gold w-100 justify-content-center" style={{ display: 'flex' }}>
              {step === 'start' ? 'Send Verification Code' : 'Verify and Continue'}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
