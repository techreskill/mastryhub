import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Home, LayoutDashboard, Calendar, Menu, X, Award } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { useState } from 'react'
import mastryLogoWhite from 'figma:asset/46e623a0a28daac0f5ca02a1c4096dd6e6a6c79a.png'
import mastryLogoDark from 'figma:asset/ca8c54976efd7d6a7db63d4a85a1facd8ab467e8.png'

interface NavbarProps {
  user?: any
  onLogout?: () => void
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const [isOpen, setIsOpen] = useState(false)
  
  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    }
    setIsOpen(false)
    navigate('/')
  }
  
  return (
    <nav className={`border-b sticky top-0 z-40 backdrop-blur-md ${
      isLandingPage ? 'bg-black/80 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={isLandingPage ? mastryLogoWhite : mastryLogoDark}
            alt="Mastry Hub" 
            className="h-7 md:h-8"
          />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Link to="/hackathons">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Hackathons
                </Button>
              </Link>
              <Link to="/past-events">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Past Events
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <div className={`flex items-center gap-3 pl-4 border-l ${isLandingPage ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className={`text-sm ${isLandingPage ? 'text-white' : 'text-gray-600'}`}>
                  {user.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className={isLandingPage ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white hover:border-gray-500' : ''}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/hackathons">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Hackathons
                </Button>
              </Link>
              <Link to="/past-events">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Past Events
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline"
                  className={isLandingPage ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white hover:border-gray-500' : ''}
                >
                  Login
                </Button>
              </Link>
              
              <Link to="/signup">
                <Button 
                  className={isLandingPage ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0' : ''}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className={isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className={isLandingPage ? 'bg-gray-950 border-gray-800' : 'bg-white'}
          >
            <div className="flex flex-col gap-4 mt-8">
              {user ? (
                <>
                  <div className={`pb-4 border-b ${isLandingPage ? 'border-gray-800' : 'border-gray-200'}`}>
                    <p className={`text-sm ${isLandingPage ? 'text-gray-400' : 'text-gray-600'}`}>Signed in as</p>
                    <p className={`${isLandingPage ? 'text-white' : 'text-gray-900'}`}>{user.name}</p>
                  </div>
                  <Link to="/" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Button>
                  </Link>
                  <Link to="/hackathons" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Hackathons
                    </Button>
                  </Link>
                  <Link to="/past-events" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Past Events
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className={`w-full justify-start mt-4 ${isLandingPage ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white' : ''}`}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/hackathons" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Hackathons
                    </Button>
                  </Link>
                  <Link to="/past-events" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="ghost" 
                      className={`w-full justify-start ${isLandingPage ? 'text-white hover:text-white hover:bg-white/10' : ''}`}
                    >
                      <Award className="h-4 w-4 mr-2" />
                      Past Events
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="outline"
                      className={`w-full ${isLandingPage ? 'border-gray-600 text-white hover:bg-white/10 hover:text-white' : ''}`}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button 
                      className={`w-full ${isLandingPage ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0' : ''}`}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
