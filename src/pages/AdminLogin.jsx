import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, ShieldAlert } from 'lucide-react'

export default function AdminLogin() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => { document.title = 'Secure Admin - Houxkeys' }, [])

  const submit = (e) => {
    e.preventDefault()
    if (code.trim() === 'HOUX-ADMIN-2026') {
      sessionStorage.setItem('houxkeys-admin', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Invalid access code.')
    }
  }

  return (
    <section className="auth-shell">
      <form className="auth-card" onSubmit={submit}>
        <ShieldAlert color="var(--gold)" size={34} />
        <h1>Admin Access</h1>
        <p>This hidden route is a prototype. Production should enforce server-side MFA, IP/risk checks, scoped roles, and audit logs.</p>
        <input className="form-control-apex mb-2" placeholder="Access code" value={code} onChange={e => setCode(e.target.value)} />
        {error && <p style={{ color: '#b42318', fontSize: '0.85rem' }}>{error}</p>}
        <button className="btn-gold w-100 justify-content-center" style={{ display: 'flex' }}><LockKeyhole size={16} /> Enter Console</button>
      </form>
    </section>
  )
}
