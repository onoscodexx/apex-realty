import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Ban, CheckCircle2, Eye, ShieldCheck, Trash2 } from 'lucide-react'
import { properties } from '../data/properties'

export default function AdminDashboard() {
  const allowed = sessionStorage.getItem('houxkeys-admin') === 'true'
  useEffect(() => { document.title = 'Admin Dashboard - Houxkeys' }, [])

  if (!allowed) return <Navigate to="/hk-admin-access" replace />

  return (
    <section className="dashboard-page">
      <div className="container">
        <div className="dashboard-head">
          <div><p className="section-label">Super admin</p><h1>Operations Control</h1></div>
          <div className="trial-pill"><ShieldCheck size={16} /> Secure review mode</div>
        </div>
        <div className="row g-4 mb-4">
          {['Pending approvals: 6', 'Verified landlords: 18', 'Active rentals: 42', 'Flagged reports: 2'].map(item => (
            <div className="col-md-3 col-6" key={item}><div className="metric-card"><strong>{item}</strong><span>Live monitor</span></div></div>
          ))}
        </div>
        <div className="content-panel">
          <h2>Listings Review Queue</h2>
          <table className="admin-table">
            <tbody>
              {properties.map(property => (
                <tr key={property.id}>
                  <td><img src={property.images[0]} alt="" /></td>
                  <td><strong>{property.title}</strong><span>{property.location}</span></td>
                  <td>{property.priceLabel}</td>
                  <td className="action-row">
                    <button><Eye size={15} /> Review</button>
                    <button><CheckCircle2 size={15} /> Approve</button>
                    <button><Ban size={15} /> Suspend</button>
                    <button><Trash2 size={15} /> Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
