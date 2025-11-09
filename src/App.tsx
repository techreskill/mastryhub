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
import { HackathonParticipantDashboard } from './components/HackathonParticipantDashboard'
import { PastEvents } from './components/PastEvents'
import { EventDetailPage } from './components/EventDetailPage'
import { ScrollToTop } from './components/ScrollToTop'
import { createClient } from './utils/supabase/client'
import { apiCall } from './utils/api'
import { Toaster } from './components/ui/sonner'
import { BlockchainLoader } from './components/BlockchainLoader'
import { PWAInstallPrompt } from './components/PWAInstallPrompt'

export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    checkSession()
    registerServiceWorker()
  }, [])

  const registerServiceWorker = async () => {
    // Skip service worker registration in iframe/preview environments
    if (window.self !== window.top || window.location.hostname.includes('figma')) {
      console.log('Service Worker disabled in preview environment')
      return
    }

    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js')
        console.log('Service Worker registered successfully:', registration)
      } catch (error) {
        // Service worker registration failed - this is expected in some environments
        // The app will continue to work normally without PWA features
        console.warn('Service Worker not available in this environment. PWA features disabled.')
      }
    }
  }

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
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar user={user} onLogout={handleLogout} />
        <Toaster position="top-center" richColors />
        <PWAInstallPrompt />
        
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
          <Route path="/past-events" element={<PastEvents />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          
          {/* Hackathon Participant Dashboard */}
          <Route 
            path="/hackathon/:id/dashboard" 
            element={user ? <HackathonParticipantDashboard /> : <Navigate to="/login" />} 
          />
          
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
