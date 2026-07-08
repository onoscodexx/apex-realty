import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CalendarCheck, CheckCircle2, Heart, Settings, UserCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { properties } from '../data/properties'

export default function Dashboard() {
  const { user, completeProfile, signOut } = useAuth()
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    document.title = 'Renter Dashboard - Houxkeys'
    setShowPrompt(Boolean(user && !user.profileComplete))
  }, [user])

  if (!user) return <Navigate to="/auth?next=/dashboard" replace />

  return (
    <section className="dashboard-page">
      {showPrompt && (
        <div className="profile-prompt">
          <div><strong>Complete your renter profile</strong><p>Add move-in budget, preferred areas, and inspection availability.</p></div>
          <button className="btn-gold" onClick={() => { completeProfile(); setShowPrompt(false) }}>Complete Setup</button>
        </div>
      )}
      <div className="container">
        <div className="dashboard-head">
          <div><p className="section-label">Renter dashboard</p><h1>Welcome, {user.name}</h1></div>
          <button className="btn-outline-gold" onClick={signOut}>Sign Out</button>
        </div>
        <div className="row g-4">
          {[
            { icon: UserCircle, label: 'Verification', value: 'Email/phone verified' },
            { icon: Heart, label: 'Saved homes', value: '3 rentals' },
            { icon: CalendarCheck, label: 'Inspections', value: '1 pending request' },
            { icon: Settings, label: 'Profile', value: user.profileComplete ? 'Complete' : 'Needs setup' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="col-md-3 col-6"><div className="metric-card"><Icon color="var(--gold)" /><span>{label}</span><strong>{value}</strong></div></div>
          ))}
        </div>
        <div className="content-panel mt-4">
          <h2>Recommended Homes</h2>
          <div className="table-responsive">
            <table className="admin-table">
              <tbody>
                {properties.slice(0, 4).map(property => (
                  <tr key={property.id}>
                    <td><img src={property.images[0]} alt="" /></td>
                    <td><strong>{property.title}</strong><span>{property.location}</span></td>
                    <td>{property.priceLabel}</td>
                    <td><CheckCircle2 size={16} color="var(--gold)" /> Verified</td>
                    <td><Link to={`/properties/${property.id}`}>View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
