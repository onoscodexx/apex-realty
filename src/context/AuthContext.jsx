import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const defaultUser = {
  id: 'guest',
  name: 'Verified Renter',
  role: 'renter',
  email: 'renter@houxkeys.ng',
  phone: '+234 801 000 1122',
  verified: true,
  profileComplete: false,
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('houxkeys-user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('houxkeys-user', JSON.stringify(user))
    else localStorage.removeItem('houxkeys-user')
  }, [user])

  const value = useMemo(() => ({
    user,
    isSignedIn: Boolean(user),
    signIn: (payload = {}) => setUser({ ...defaultUser, ...payload, verified: true }),
    signOut: () => setUser(null),
    completeProfile: () => setUser(current => current ? { ...current, profileComplete: true } : current),
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
