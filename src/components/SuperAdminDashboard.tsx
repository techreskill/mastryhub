import { useState, useEffect } from 'react'
import { apiCall } from '../utils/api'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { 
  Plus, Building2, Mail, Globe, Users, Trophy, Calendar, 
  TrendingUp, DollarSign, Eye, Settings, Search, BarChart3,
  AlertCircle, CheckCircle2, XCircle, Clock, MapPin
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { BlockchainLoader } from './BlockchainLoader'

interface Organizer {
  id: string
  name: string
  email: string
  description?: string
  website?: string
  createdAt: string
}

interface Hackathon {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  location: string
  mode: string
  organizerId: string
  prizePool?: number
  status?: string
  participants?: any[]
  createdAt: string
}

interface SuperAdminDashboardProps {
  user: any
}

interface Stats {
  totalOrganizers: number
  totalHackathons: number
  totalParticipants: number
  activeHackathons: number
  upcomingHackathons: number
  completedHackathons: number
  totalPrizePool: number
}

export function SuperAdminDashboard({ user }: SuperAdminDashboardProps) {
  const [organizers, setOrganizers] = useState<Organizer[]>([])
  const [hackathons, setHackathons] = useState<Hackathon[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    totalOrganizers: 0,
    totalHackathons: 0,
    totalParticipants: 0,
    activeHackathons: 0,
    upcomingHackathons: 0,
    completedHackathons: 0,
    totalPrizePool: 0
  })
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [isViewUsersDialogOpen, setIsViewUsersDialogOpen] = useState(false)
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>('')
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)
  const [assignedUsers, setAssignedUsers] = useState<any[]>([])
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [website, setWebsite] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    await Promise.all([loadOrganizers(), loadHackathons()])
    setLoading(false)
  }

  const loadOrganizers = async () => {
    try {
      const data = await apiCall('/organizers')
      setOrganizers(data)
    } catch (error: any) {
      console.error('Failed to load organizers:', error)
      toast.error('Failed to load organizers')
    }
  }

  const loadHackathons = async () => {
    try {
      const data = await apiCall('/hackathons')
      setHackathons(data)
      calculateStats(data)
    } catch (error: any) {
      console.error('Failed to load hackathons:', error)
      toast.error('Failed to load hackathons')
    }
  }

  const calculateStats = (hackathonData: Hackathon[]) => {
    const now = new Date()
    
    const active = hackathonData.filter(h => {
      const start = new Date(h.startDate)
      const end = new Date(h.endDate)
      return start <= now && end >= now
    }).length

    const upcoming = hackathonData.filter(h => {
      const start = new Date(h.startDate)
      return start > now
    }).length

    const completed = hackathonData.filter(h => {
      const end = new Date(h.endDate)
      return end < now
    }).length

    const totalPrize = hackathonData.reduce((sum, h) => sum + (h.prizePool || 0), 0)
    const totalParts = hackathonData.reduce((sum, h) => sum + (h.participants?.length || 0), 0)

    setStats({
      totalOrganizers: organizers.length,
      totalHackathons: hackathonData.length,
      totalParticipants: totalParts,
      activeHackathons: active,
      upcomingHackathons: upcoming,
      completedHackathons: completed,
      totalPrizePool: totalPrize
    })
  }

  const handleCreateOrganizer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await apiCall('/organizers', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          description,
          website
        })
      })
      
      toast.success('Organizer created successfully!')
      setIsCreateDialogOpen(false)
      setName('')
      setEmail('')
      setDescription('')
      setWebsite('')
      loadData()
    } catch (error: any) {
      console.error('Create organizer error:', error)
      toast.error(error.message || 'Failed to create organizer')
    }
  }

  const handleAssignOrganizer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await apiCall(`/organizers/${selectedOrganizer}/assign`, {
        method: 'POST',
        body: JSON.stringify({ userEmail })
      })
      
      toast.success('User assigned as organizer successfully!')
      setIsAssignDialogOpen(false)
      setUserEmail('')
      setSelectedOrganizer('')
    } catch (error: any) {
      console.error('Assign organizer error:', error)
      toast.error(error.message || 'Failed to assign organizer')
    }
  }

  const handleViewAssignedUsers = async (organizerId: string) => {
    setSelectedOrganizer(organizerId)
    setIsViewUsersDialogOpen(true)
    setLoadingUsers(true)
    
    try {
      const users = await apiCall(`/organizers/${organizerId}/users`)
      setAssignedUsers(users)
    } catch (error: any) {
      console.error('Get assigned users error:', error)
      toast.error(error.message || 'Failed to load assigned users')
      setAssignedUsers([])
    } finally {
      setLoadingUsers(false)
    }
  }

  const getHackathonStatus = (hackathon: Hackathon) => {
    const now = new Date()
    const start = new Date(hackathon.startDate)
    const end = new Date(hackathon.endDate)

    if (end < now) return { label: 'Completed', color: 'bg-gray-500', icon: CheckCircle2 }
    if (start <= now && end >= now) return { label: 'Active', color: 'bg-green-500', icon: Clock }
    return { label: 'Upcoming', color: 'bg-blue-500', icon: Calendar }
  }

  const filteredHackathons = hackathons.filter(h => 
    h.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredOrganizers = organizers.filter(o =>
    o.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getOrganizerName = (organizerId: string) => {
    const org = organizers.find(o => o.id === organizerId)
    return org?.name || 'Unknown Organizer'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl mb-2 text-gray-900">Super Admin Dashboard</h1>
              <p className="text-xl text-gray-600">Manage the Mastry Hub platform</p>
            </div>
            
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="mr-2 h-5 w-5" />
                  Create Organizer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Organizer</DialogTitle>
                  <DialogDescription>
                    Add a new organization that can create and manage hackathons
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleCreateOrganizer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name *</Label>
                    <Input
                      id="org-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Web3 Foundation"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-email">Contact Email *</Label>
                    <Input
                      id="org-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@organization.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-desc">Description</Label>
                    <Textarea
                      id="org-desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of the organization..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="org-website">Website</Label>
                    <Input
                      id="org-website"
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://organization.com"
                    />
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Organizer</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Organizers</CardTitle>
                <Building2 className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalOrganizers}</div>
                <p className="text-xs text-gray-600 mt-1">Organizations on platform</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Hackathons</CardTitle>
                <Trophy className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalHackathons}</div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="text-green-600">{stats.activeHackathons} active</span>
                  {' • '}
                  <span className="text-blue-600">{stats.upcomingHackathons} upcoming</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Participants</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{stats.totalParticipants}</div>
                <p className="text-xs text-gray-600 mt-1">Registered participants</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-yellow-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Total Prize Pool</CardTitle>
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">${stats.totalPrizePool.toLocaleString()}</div>
                <p className="text-xs text-gray-600 mt-1">Across all hackathons</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="hackathons" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="hackathons" className="gap-2">
              <Trophy className="h-4 w-4" />
              Hackathons ({hackathons.length})
            </TabsTrigger>
            <TabsTrigger value="organizers" className="gap-2">
              <Building2 className="h-4 w-4" />
              Organizers ({organizers.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Hackathons</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search hackathons..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <BlockchainLoader message="Loading Hackathons" fullScreen={false} />
                ) : filteredHackathons.length === 0 ? (
                  <div className="text-center py-12">
                    <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl mb-2">No Hackathons Found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? 'Try a different search term' : 'Organizers can create hackathons'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Organizer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Dates</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Prize Pool</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHackathons.map((hackathon) => {
                          const status = getHackathonStatus(hackathon)
                          const StatusIcon = status.icon
                          
                          return (
                            <TableRow key={hackathon.id}>
                              <TableCell className="max-w-xs">
                                <div>
                                  <div className="truncate text-gray-900">{hackathon.title}</div>
                                  <div className="text-sm text-gray-500 truncate">{hackathon.description}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-gray-400" />
                                  <span className="text-gray-900">{getOrganizerName(hackathon.organizerId)}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge className={`${status.color} text-white border-0`}>
                                  <StatusIcon className="h-3 w-3 mr-1" />
                                  {status.label}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm text-gray-900">
                                  <div>{new Date(hackathon.startDate).toLocaleDateString()}</div>
                                  <div className="text-gray-500">to {new Date(hackathon.endDate).toLocaleDateString()}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-gray-900">
                                  <MapPin className="h-3 w-3 text-gray-400" />
                                  <span className="text-sm">{hackathon.location}</span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {hackathon.mode}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-gray-900">
                                  <Users className="h-4 w-4 text-gray-400" />
                                  {hackathon.participants?.length || 0}
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-900">
                                {hackathon.prizePool ? `$${hackathon.prizePool.toLocaleString()}` : '-'}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedHackathon(hackathon)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organizers Tab */}
          <TabsContent value="organizers" className="space-y-4">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Organizers</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search organizers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <BlockchainLoader message="Loading Organizers" fullScreen={false} />
                ) : filteredOrganizers.length === 0 ? (
                  <div className="text-center py-12">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-2xl mb-2">No Organizers Found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm ? 'Try a different search term' : 'Create your first organizer to get started'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Organizer
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOrganizers.map((organizer) => {
                      const orgHackathons = hackathons.filter(h => h.organizerId === organizer.id)
                      
                      return (
                        <Card key={organizer.id} className="hover:shadow-lg transition-shadow border-gray-200">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Building2 className="h-5 w-5 text-purple-600" />
                              {organizer.name}
                            </CardTitle>
                            {organizer.description && (
                              <CardDescription>{organizer.description}</CardDescription>
                            )}
                          </CardHeader>
                          
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span className="truncate">{organizer.email}</span>
                            </div>
                            
                            {organizer.website && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Globe className="h-4 w-4" />
                                <a 
                                  href={organizer.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:underline truncate"
                                >
                                  {organizer.website}
                                </a>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-gray-900 pt-2 border-t">
                              <Trophy className="h-4 w-4 text-gray-400" />
                              <span>{orgHackathons.length} hackathon{orgHackathons.length !== 1 ? 's' : ''}</span>
                            </div>
                            
                            <div className="pt-3 space-y-2">
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => {
                                  setSelectedOrganizer(organizer.id)
                                  setIsAssignDialogOpen(true)
                                }}
                              >
                                <Users className="mr-2 h-4 w-4" />
                                Assign User
                              </Button>
                              
                              <Button 
                                variant="ghost" 
                                className="w-full"
                                onClick={() => handleViewAssignedUsers(organizer.id)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Assigned Users
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Hackathon Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-gray-900">Active</span>
                    </div>
                    <span className="text-2xl text-gray-900">{stats.activeHackathons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span className="text-gray-900">Upcoming</span>
                    </div>
                    <span className="text-2xl text-gray-900">{stats.upcomingHackathons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-500 rounded"></div>
                      <span className="text-gray-900">Completed</span>
                    </div>
                    <span className="text-2xl text-gray-900">{stats.completedHackathons}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Platform Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-900">Avg. Participants/Hackathon</span>
                    </div>
                    <span className="text-2xl text-gray-900">
                      {stats.totalHackathons > 0 
                        ? Math.round(stats.totalParticipants / stats.totalHackathons)
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-yellow-600" />
                      <span className="text-gray-900">Avg. Prize Pool</span>
                    </div>
                    <span className="text-2xl text-gray-900">
                      ${stats.totalHackathons > 0 
                        ? Math.round(stats.totalPrizePool / stats.totalHackathons).toLocaleString()
                        : 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-900">Hackathons/Organizer</span>
                    </div>
                    <span className="text-2xl text-gray-900">
                      {stats.totalOrganizers > 0 
                        ? (stats.totalHackathons / stats.totalOrganizers).toFixed(1)
                        : 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest hackathons created on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hackathons
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map((hackathon) => (
                      <div key={hackathon.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center gap-3">
                          <Trophy className="h-8 w-8 text-purple-600" />
                          <div>
                            <div className="text-gray-900">{hackathon.title}</div>
                            <div className="text-sm text-gray-500">
                              by {getOrganizerName(hackathon.organizerId)} • {new Date(hackathon.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getHackathonStatus(hackathon).color} text-white border-0`}>
                          {getHackathonStatus(hackathon).label}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Assign Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign User as Organizer</DialogTitle>
              <DialogDescription>
                Enter the email of an existing user to grant them organizer access
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleAssignOrganizer} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user-email">User Email</Label>
                <Input
                  id="user-email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="user@email.com"
                  required
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Assign</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Assigned Users Dialog */}
        <Dialog open={isViewUsersDialogOpen} onOpenChange={setIsViewUsersDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Assigned Users</DialogTitle>
              <DialogDescription>
                Users who have been assigned as organizers for{' '}
                {organizers.find(o => o.id === selectedOrganizer)?.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {loadingUsers ? (
                <div className="flex items-center justify-center py-8">
                  <BlockchainLoader message="Loading Users" fullScreen={false} />
                </div>
              ) : assignedUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No users assigned yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Click "Assign User" to add organizers to this organization
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignedUsers.map((user) => (
                    <Card key={user.id} className="bg-gray-50">
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" onClick={() => setIsViewUsersDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Hackathon Detail Dialog */}
        <Dialog open={!!selectedHackathon} onOpenChange={() => setSelectedHackathon(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedHackathon?.title}</DialogTitle>
              <DialogDescription>
                Organized by {selectedHackathon && getOrganizerName(selectedHackathon.organizerId)}
              </DialogDescription>
            </DialogHeader>
            
            {selectedHackathon && (
              <div className="space-y-4">
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-gray-600 mt-1">{selectedHackathon.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedHackathon.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedHackathon.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedHackathon.location}</p>
                  </div>
                  <div>
                    <Label>Mode</Label>
                    <p className="text-sm text-gray-900 mt-1">{selectedHackathon.mode}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Prize Pool</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedHackathon.prizePool ? `$${selectedHackathon.prizePool.toLocaleString()}` : 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <Label>Participants</Label>
                    <p className="text-sm text-gray-900 mt-1">
                      {selectedHackathon.participants?.length || 0} registered
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Status</Label>
                  <div className="mt-2">
                    <Badge className={`${getHackathonStatus(selectedHackathon).color} text-white border-0`}>
                      {getHackathonStatus(selectedHackathon).label}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
