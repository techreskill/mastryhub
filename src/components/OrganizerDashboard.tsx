import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Plus, Settings, Calendar, MapPin, DollarSign, Users, BarChart3, Eye } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { BlockchainLoader } from './BlockchainLoader'

interface Hackathon {
  id: string
  title: string
  description: string
  about?: string
  coverImage?: string
  organizerLogo?: string
  startDate: string
  endDate: string
  location: string
  prizePool?: string
  maxParticipants?: number
  status?: string
  participants?: string[]
}

interface OrganizerDashboardProps {
  user: any
}

export function OrganizerDashboard({ user }: OrganizerDashboardProps) {
  const navigate = useNavigate()
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHackathons()
  }, [])

  const loadHackathons = async () => {
    try {
      const data = await apiCall('/hackathons')
      // Filter to show only hackathons created by this user
      const myHackathons = data.filter((h: Hackathon) => h.organizerId === user.organizerId)
      setHackathons(myHackathons)
    } catch (error: any) {
      console.error('Failed to load hackathons:', error)
      toast.error('Failed to load hackathons')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl mb-2">Organizer Dashboard</h1>
            <p className="text-xl text-gray-600">Create and manage your hackathons</p>
          </div>
          
          <Button size="lg" onClick={() => navigate('/hackathon/create')}>
            <Plus className="mr-2 h-5 w-5" />
            Create Hackathon
          </Button>
        </div>

        {loading ? (
          <BlockchainLoader message="Loading Your Hackathons" fullScreen={false} />
        ) : hackathons.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No Hackathons Yet</h3>
              <p className="text-gray-600 mb-6">Create your first hackathon to get started</p>
              <Button onClick={() => navigate('/hackathon/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create Hackathon
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon) => (
              <Card key={hackathon.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                {hackathon.coverImage && (
                  <div className="h-48 overflow-hidden relative">
                    <ImageWithFallback
                      src={hackathon.coverImage}
                      alt={hackathon.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2">{hackathon.title}</CardTitle>
                    <Badge variant={hackathon.status === 'ongoing' ? 'default' : 'secondary'}>
                      {hackathon.status || 'upcoming'}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {hackathon.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(hackathon.startDate).toLocaleDateString()} - {new Date(hackathon.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{hackathon.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{hackathon.participants?.length || 0} participants</span>
                    </div>
                    
                    {hackathon.prizePool && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        <span>{hackathon.prizePool}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/hackathon/${hackathon.id}`)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/hackathon/${hackathon.id}/manage`)}
                    >
                      <BarChart3 className="mr-1 h-4 w-4" />
                      Manage
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/hackathon/${hackathon.id}/edit`)}
                    >
                      <Settings className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
