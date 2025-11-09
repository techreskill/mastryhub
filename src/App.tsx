import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { LandingPage } from './components/LandingPage'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { ParticipantDashboard } from './components/ParticipantDashboard'
import { OrganizerDashboard } from './components/OrganizerDashboard'
import { SuperAdminDashboard } from './components/SuperAdminDashboard'
import { HackathonList } from './components/HackathonList'
import { HackathonDetail } from './components/HackathonDetail'
import { HackathonInterest } from './components/HackathonInterest'
import { CreateHackathon } from './components/CreateHackathon'
import { HackathonManagement } from './components/HackathonManagement'
import { createClient } from './utils/supabase/client'
import { apiCall } from './utils/api'
import { Toaster } from './components/ui/sonner'
import { BlockchainLoader } from './components/BlockchainLoader'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error
      
      if (session?.access_token) {
        localStorage.setItem('access_token', session.access_token)
        await loadUserProfile()
      }
    } catch (error) {
      console.error('Session check error:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async () => {
    try {
      const profile = await apiCall('/me')
      setUser(profile)
    } catch (error) {
      console.error('Failed to load user profile:', error)
      handleLogout()
    }
  }

  const handleLogin = async (accessToken: string) => {
    localStorage.setItem('access_token', accessToken)
    await loadUserProfile()
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('access_token')
    setUser(null)
  }

  if (loading) {
    return <BlockchainLoader message="Initializing Mastry Hub" />
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar user={user} onLogout={handleLogout} />
        <Toaster position="top-center" richColors />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <Signup onLogin={handleLogin} />} 
          />
          
          <Route path="/hackathons" element={<HackathonList />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
          <Route path="/host-hackathon" element={<HackathonInterest />} />
          
          {/* Organizer Routes */}
          <Route 
            path="/hackathon/create" 
            element={user?.role === 'organizer' ? <CreateHackathon /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/hackathon/:id/edit" 
            element={user?.role === 'organizer' ? <CreateHackathon /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/hackathon/:id/manage" 
            element={user?.role === 'organizer' ? <HackathonManagement /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/dashboard" 
            element={
              user ? (
                user.role === 'superadmin' ? (
                  <SuperAdminDashboard user={user} />
                ) : user.role === 'organizer' ? (
                  <OrganizerDashboard user={user} />
                ) : (
                  <ParticipantDashboard user={user} />
                )
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}
