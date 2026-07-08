import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, CheckCircle2, ImagePlus, ShieldCheck, UploadCloud } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const suggestions = ['Add nearest landmark', 'Mention power backup', 'Include service charge', 'Upload clear exterior photo', 'Confirm exact yearly rent']

export default function LandlordDashboard() {
  const { user, signIn, completeProfile } = useAuth()
  const [listingCount, setListingCount] = useState(1)
  const [verified, setVerified] = useState(false)

  useEffect(() => { document.title = 'Landlord Dashboard - Houxkeys' }, [])

  const becomeLandlord = () => signIn({ role: 'landlord', name: 'Verified Landlord', profileComplete: false })

  return (
    <section className="dashboard-page">
      <div className="container">
        <div className="dashboard-head">
          <div><p className="section-label">Landlord console</p><h1>List rental homes on Houxkeys</h1></div>
          {!user ? <button className="btn-gold" onClick={becomeLandlord}>Register as Landlord</button> : <Link className="btn-outline-gold" to="/dashboard">Profile</Link>}
        </div>

        {user?.role === 'landlord' && !user.profileComplete && (
          <div className="profile-prompt">
            <div><strong>Complete landlord profile</strong><p>Add payout details, inspection schedule, ID document, and property ownership contact.</p></div>
            <button className="btn-gold" onClick={completeProfile}>Complete Setup</button>
          </div>
        )}

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="content-panel">
              <ShieldCheck color="var(--gold)" size={32} />
              <h2>Identity verification</h2>
              <p>Upload NIN, passport, driver's licence, CAC document, or another recognized ID. Production should verify through a trusted third-party API.</p>
              <select className="form-control-apex mb-3"><option>NIN</option><option>Passport</option><option>Driver's licence</option><option>CAC certificate</option></select>
              <button className="btn-outline-gold w-100 justify-content-center" style={{ display: 'flex' }} onClick={() => setVerified(true)}>
                <UploadCloud size={16} /> Simulate ID Verification
              </button>
              {verified && <div className="success-note mt-3"><CheckCircle2 /> Landlord ID verified</div>}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="content-panel">
              <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
                <div><h2>New rental listing</h2><p>Free trial: 3 houses, 5 pictures each, for 1 month.</p></div>
                <div className="trial-pill">{listingCount}/3 listings used</div>
              </div>
              <div className="row g-3">
                <div className="col-md-6"><input className="form-control-apex" placeholder="Property title" /></div>
                <div className="col-md-6"><input className="form-control-apex" placeholder="Yearly rent" /></div>
                <div className="col-md-6"><input className="form-control-apex" placeholder="Location" /></div>
                <div className="col-md-6"><input className="form-control-apex" placeholder="Bedrooms and bathrooms" /></div>
                <div className="col-12"><textarea className="form-control-apex" placeholder="Describe the house, access roads, water, power, and estate rules" /></div>
              </div>
              <div className="upload-box mt-3"><ImagePlus /> Upload up to 5 pictures</div>
              <div className="suggestions">
                {suggestions.map(item => <span key={item}>{item}</span>)}
              </div>
              <button className="btn-gold mt-3" onClick={() => setListingCount(c => Math.min(3, c + 1))}><Building2 size={16} /> Submit for Review</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
