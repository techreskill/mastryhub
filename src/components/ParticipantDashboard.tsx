import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { 
  Calendar, MapPin, Users, Trophy, CheckCircle2, ExternalLink, 
  Plus, Search, UserPlus, MessageSquare, Send, Settings, 
  Upload, Github, Link2, Tag, FileText, Video, Award,
  BookOpen, Code, Lightbulb, FileCode, Clock, Star,
  TrendingUp, Eye, ThumbsUp, Filter, ChevronDown,
  Bell, CalendarDays, AlarmClock, Download
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { hackathons as featuredHackathons } from './HackathonList'
import { toast } from 'sonner@2.0.3'

interface ParticipantDashboardProps {
  user: any
}

type DashboardSection = 'overview' | 'teams' | 'projects' | 'resources' | 'leaderboard' | 'schedule'

interface Team {
  id: string
  name: string
  description: string
  members: Array<{
    id: string
    name: string
    role: string
    skills: string[]
    avatar?: string
  }>
  hackathonId: string
  lookingForMembers: boolean
  requiredSkills: string[]
}

interface Project {
  id: string
  title: string
  description: string
  teamId: string
  githubUrl?: string
  demoUrl?: string
  videoUrl?: string
  tags: string[]
  submittedAt?: string
  score?: number
  votes: number
}

interface Resource {
  id: string
  title: string
  description: string
  type: 'tutorial' | 'documentation' | 'starter-kit' | 'video'
  url: string
  category: string
}

interface ScheduleEvent {
  id: string
  title: string
  description: string
  type: 'workshop' | 'mentorship' | 'deadline' | 'keynote'
  startTime: string
  endTime: string
  location?: string
}

export function ParticipantDashboard({ user }: ParticipantDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview')
  const [myRegistrations, setMyRegistrations] = useState<any[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [myTeam, setMyTeam] = useState<Team | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [resources, setResources] = useState<Resource[]>([])
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHackathon, setSelectedHackathon] = useState<string>('')
  
  const hackathons = featuredHackathons

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load registrations
      const registrations = JSON.parse(localStorage.getItem('hackathonRegistrations') || '[]')
      setMyRegistrations(registrations)
      
      if (registrations.length > 0) {
        setSelectedHackathon(registrations[0].hackathonId)
      }
      
      // Load mock teams data
      setTeams([
        {
          id: '1',
          name: 'DeFi Innovators',
          description: 'Building next-gen decentralized finance solutions',
          members: [
            { id: '1', name: 'Alice Johnson', role: 'Team Lead', skills: ['Solidity', 'React', 'Web3.js'], avatar: '' },
            { id: '2', name: 'Bob Smith', role: 'Developer', skills: ['Node.js', 'Smart Contracts'], avatar: '' },
          ],
          hackathonId: '1',
          lookingForMembers: true,
          requiredSkills: ['Backend', 'DevOps']
        },
        {
          id: '2',
          name: 'NFT Creators',
          description: 'Revolutionizing digital art ownership',
          members: [
            { id: '3', name: 'Carol White', role: 'Designer', skills: ['UI/UX', 'Figma'], avatar: '' },
          ],
          hackathonId: '1',
          lookingForMembers: true,
          requiredSkills: ['Frontend', 'Solidity']
        },
      ])
      
      // Load mock projects
      setProjects([
        {
          id: '1',
          title: 'DeFi Lending Protocol',
          description: 'A decentralized lending platform with automated interest rates',
          teamId: '1',
          githubUrl: 'https://github.com/example/defi-lending',
          demoUrl: 'https://demo.example.com',
          tags: ['DeFi', 'Lending', 'Smart Contracts'],
          score: 95,
          votes: 142
        },
        {
          id: '2',
          title: 'NFT Marketplace',
          description: 'Next-generation NFT trading platform',
          teamId: '2',
          githubUrl: 'https://github.com/example/nft-market',
          tags: ['NFT', 'Marketplace', 'Web3'],
          score: 88,
          votes: 128
        },
      ])
      
      // Load mock resources
      setResources([
        {
          id: '1',
          title: 'Web3.js Complete Guide',
          description: 'Learn how to interact with Ethereum blockchain',
          type: 'tutorial',
          url: 'https://docs.web3js.org',
          category: 'Development'
        },
        {
          id: '2',
          title: 'Solidity Starter Kit',
          description: 'Boilerplate for Ethereum smart contracts',
          type: 'starter-kit',
          url: 'https://github.com/example/solidity-starter',
          category: 'Smart Contracts'
        },
        {
          id: '3',
          title: 'Building DeFi Apps',
          description: 'Video tutorial series on DeFi development',
          type: 'video',
          url: 'https://youtube.com/example',
          category: 'DeFi'
        },
      ])
      
      // Load mock schedule
      setScheduleEvents([
        {
          id: '1',
          title: 'Opening Ceremony',
          description: 'Welcome and introduction to the hackathon',
          type: 'keynote',
          startTime: '2024-12-01T09:00:00',
          endTime: '2024-12-01T10:00:00',
          location: 'Main Stage'
        },
        {
          id: '2',
          title: 'Smart Contract Workshop',
          description: 'Learn Solidity basics and best practices',
          type: 'workshop',
          startTime: '2024-12-01T14:00:00',
          endTime: '2024-12-01T16:00:00',
          location: 'Workshop Room A'
        },
        {
          id: '3',
          title: 'Project Submission Deadline',
          description: 'Final deadline for project submissions',
          type: 'deadline',
          startTime: '2024-12-03T23:59:00',
          endTime: '2024-12-03T23:59:00',
        },
      ])
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const getRegisteredHackathons = () => {
    return hackathons.filter(h => 
      myRegistrations.some(r => r.hackathonId === h.id)
    )
  }

  const navigationItems = [
    { id: 'overview' as DashboardSection, label: 'Overview', icon: Calendar },
    { id: 'teams' as DashboardSection, label: 'Teams', icon: Users },
    { id: 'projects' as DashboardSection, label: 'Projects', icon: Upload },
    { id: 'resources' as DashboardSection, label: 'Resources', icon: BookOpen },
    { id: 'leaderboard' as DashboardSection, label: 'Leaderboard', icon: Trophy },
    { id: 'schedule' as DashboardSection, label: 'Schedule', icon: CalendarDays },
  ]

  const handleCreateTeam = () => {
    toast.success('Team created successfully!')
  }

  const handleJoinTeam = (teamId: string) => {
    toast.success('Team join request sent!')
  }

  const handleSubmitProject = () => {
    toast.success('Project submitted successfully!')
  }

  const handleVoteProject = (projectId: string) => {
    toast.success('Vote submitted!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-80 min-h-screen bg-white border-r border-gray-200 sticky top-0">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="mb-8 pb-6 border-b">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xl">
                    {user.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg">Welcome back!</h3>
                  <p className="text-sm text-gray-600">{user.name}</p>
                </div>
              </div>
              
              {myRegistrations.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-purple-700">Active Hackathons</span>
                    <Badge className="bg-purple-600">{myRegistrations.length}</Badge>
                  </div>
                  <p className="text-xs text-gray-600">You're registered for {myRegistrations.length} event{myRegistrations.length > 1 ? 's' : ''}</p>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1 mb-6">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-700">Projects</span>
                </div>
                <span className="text-sm font-semibold">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-700">Team Members</span>
                </div>
                <span className="text-sm font-semibold">4</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-700">Points</span>
                </div>
                <span className="text-sm font-semibold">850</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Your Web3 hackathon journey at a glance</p>
              </div>

              {/* Registered Hackathons */}
              {myRegistrations.length > 0 && (
                <div>
                  <h3 className="text-2xl mb-4">My Active Hackathons</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getRegisteredHackathons().map((hackathon) => (
                      <Card key={hackathon.id} className="overflow-hidden hover:shadow-xl transition-all border-purple-200 bg-gradient-to-br from-white to-purple-50">
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={hackathon.coverImage}
                            alt={hackathon.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-green-600 text-white shadow-lg">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Registered
                            </Badge>
                          </div>
                        </div>
                        
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{hackathon.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {hackathon.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Trophy className="h-4 w-4" />
                              <span>{hackathon.prizePool} in prizes</span>
                            </div>
                          </div>
                          
                          <Link to={`/hackathon/${hackathon.id}`}>
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                              View Details
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All Hackathons */}
              <div>
                <h3 className="text-2xl mb-4">Browse All Hackathons</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hackathons.map((hackathon) => {
                    const isUserRegistered = myRegistrations.some(r => r.hackathonId === hackathon.id)
                    
                    return (
                      <Card key={hackathon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={hackathon.coverImage}
                            alt={hackathon.title}
                            className="w-full h-full object-cover"
                          />
                          {isUserRegistered && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-600 text-white">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Registered
                              </Badge>
                            </div>
                          )}
                        </div>
                      
                        <CardHeader>
                          <CardTitle className="line-clamp-2">{hackathon.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {hackathon.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(hackathon.startDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Users className="h-4 w-4" />
                              <span>{hackathon.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Trophy className="h-4 w-4" />
                              <span>{hackathon.prizePool} in prizes</span>
                            </div>
                          </div>
                          
                          <Link to={`/hackathon/${hackathon.id}`}>
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                              View Details
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Teams Section */}
          {activeSection === 'teams' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl mb-2">Team Management</h2>
                  <p className="text-gray-600">Find teammates or create your own team</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Team</DialogTitle>
                      <DialogDescription>Fill in the details to form your hackathon team</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Team Name</Label>
                        <Input placeholder="Enter team name" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea placeholder="Describe your team and project idea" rows={3} />
                      </div>
                      <div>
                        <Label>Looking for Skills</Label>
                        <Input placeholder="e.g., Frontend, Backend, Solidity" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleCreateTeam} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600">
                          Create Team
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Teams Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {teams.map((team) => (
                  <Card key={team.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle>{team.name}</CardTitle>
                          <CardDescription className="mt-2">{team.description}</CardDescription>
                        </div>
                        {team.lookingForMembers && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <UserPlus className="h-3 w-3 mr-1" />
                            Open
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Team Members ({team.members.length})</p>
                        <div className="flex gap-2 flex-wrap">
                          {team.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">{member.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {team.requiredSkills.length > 0 && (
                        <div>
                          <p className="text-sm font-medium mb-2">Looking for:</p>
                          <div className="flex gap-2 flex-wrap">
                            {team.requiredSkills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleJoinTeam(team.id)} 
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Request to Join
                        </Button>
                        <Button variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl mb-2">Project Submission</h2>
                  <p className="text-gray-600">Submit your hackathon project</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Submit Your Project</DialogTitle>
                      <DialogDescription>Provide all project details for evaluation</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Project Title</Label>
                        <Input placeholder="Enter project title" />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea placeholder="Describe your project, its features, and impact" rows={4} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>GitHub Repository</Label>
                          <div className="relative">
                            <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="https://github.com/..." className="pl-10" />
                          </div>
                        </div>
                        <div>
                          <Label>Demo URL</Label>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input placeholder="https://..." className="pl-10" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Demo Video URL</Label>
                        <div className="relative">
                          <Video className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input placeholder="https://youtube.com/..." className="pl-10" />
                        </div>
                      </div>
                      <div>
                        <Label>Tags/Categories</Label>
                        <Input placeholder="DeFi, NFT, Web3, etc. (comma separated)" />
                      </div>
                      <div>
                        <Label>Upload Presentation (PDF)</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                          <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500 mt-1">PDF, PPT up to 10MB</p>
                        </div>
                      </div>
                      <Button onClick={handleSubmitProject} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                        Submit Project
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* My Projects */}
              <div>
                <h3 className="text-xl mb-4">My Submitted Projects</h3>
                <div className="space-y-4">
                  {projects.slice(0, 1).map((project) => (
                    <Card key={project.id} className="bg-gradient-to-br from-white to-purple-50 border-purple-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription className="mt-2">{project.description}</CardDescription>
                          </div>
                          <Badge className="bg-green-600">Submitted</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2 flex-wrap">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <Github className="h-4 w-4 mr-2" />
                                GitHub
                              </Button>
                            </a>
                          )}
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Demo
                              </Button>
                            </a>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="h-4 w-4 text-purple-600" />
                              <span className="text-sm">{project.votes} votes</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm">Score: {project.score}/100</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Resources Section */}
          {activeSection === 'resources' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl mb-2">Resource Hub</h2>
                <p className="text-gray-600">Learning materials and starter kits for your hackathon</p>
              </div>

              {/* Resource Categories */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                  <TabsTrigger value="documentation">Docs</TabsTrigger>
                  <TabsTrigger value="starter-kit">Starter Kits</TabsTrigger>
                  <TabsTrigger value="video">Videos</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                              {resource.type === 'tutorial' && <BookOpen className="h-6 w-6 text-purple-600" />}
                              {resource.type === 'documentation' && <FileText className="h-6 w-6 text-blue-600" />}
                              {resource.type === 'starter-kit' && <FileCode className="h-6 w-6 text-green-600" />}
                              {resource.type === 'video' && <Video className="h-6 w-6 text-red-600" />}
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <CardDescription className="mt-1">{resource.description}</CardDescription>
                              <div className="flex gap-2 mt-3">
                                <Badge variant="outline">{resource.category}</Badge>
                                <Badge variant="secondary">{resource.type}</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button className="w-full" variant="outline">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Resource
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium mb-1">How do I submit my project?</h4>
                    <p className="text-sm text-gray-600">Navigate to the Projects tab and click "Submit Project" to fill out the submission form.</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium mb-1">Can I join multiple teams?</h4>
                    <p className="text-sm text-gray-600">You can only be part of one team per hackathon.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium mb-1">When is the submission deadline?</h4>
                    <p className="text-sm text-gray-600">Check the Schedule tab for all important dates and deadlines.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Leaderboard Section */}
          {activeSection === 'leaderboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl mb-2">Leaderboard</h2>
                  <p className="text-gray-600">Top projects and community favorites</p>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="overall">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="overall">Overall Score</SelectItem>
                      <SelectItem value="votes">Most Votes</SelectItem>
                      <SelectItem value="category">By Category</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      🥈
                    </div>
                    <p className="font-semibold mb-1">2nd Place</p>
                    <p className="text-sm text-gray-600">NFT Marketplace</p>
                    <p className="text-xl mt-2">88 pts</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 -mt-4">
                  <CardContent className="pt-6 text-center">
                    <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl shadow-lg">
                      🏆
                    </div>
                    <p className="font-semibold mb-1">1st Place</p>
                    <p className="text-sm text-gray-600">DeFi Lending Protocol</p>
                    <p className="text-2xl mt-2">95 pts</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-300">
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      🥉
                    </div>
                    <p className="font-semibold mb-1">3rd Place</p>
                    <p className="text-sm text-gray-600">DAO Governance Tool</p>
                    <p className="text-xl mt-2">82 pts</p>
                  </CardContent>
                </Card>
              </div>

              {/* Full Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.map((project, idx) => (
                      <div key={project.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-semibold">
                          #{idx + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{project.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{project.description}</p>
                          <div className="flex gap-2 mt-2">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm mb-1">
                            <Award className="h-4 w-4 text-yellow-600" />
                            <span className="font-semibold">{project.score}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{project.votes} votes</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVoteProject(project.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Vote
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Schedule Section */}
          {activeSection === 'schedule' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl mb-2">Event Schedule</h2>
                  <p className="text-gray-600">Workshops, deadlines, and important events</p>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Calendar
                </Button>
              </div>

              {/* Countdown to Next Event */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                      <AlarmClock className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-700 mb-1">Next Event</p>
                      <h3 className="text-xl mb-1">Smart Contract Workshop</h3>
                      <p className="text-sm text-gray-600">Starting in 2 hours 34 minutes</p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <div className="space-y-4">
                {scheduleEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            event.type === 'workshop' ? 'bg-blue-100' :
                            event.type === 'deadline' ? 'bg-red-100' :
                            event.type === 'mentorship' ? 'bg-green-100' :
                            'bg-purple-100'
                          }`}>
                            {event.type === 'workshop' && <Code className="h-6 w-6 text-blue-600" />}
                            {event.type === 'deadline' && <Clock className="h-6 w-6 text-red-600" />}
                            {event.type === 'mentorship' && <Users className="h-6 w-6 text-green-600" />}
                            {event.type === 'keynote' && <Trophy className="h-6 w-6 text-purple-600" />}
                          </div>
                          <div className="w-px h-full bg-gray-200 mt-2"></div>
                        </div>
                        
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg">{event.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">{event.type}</Badge>
                          </div>
                          
                          <div className="flex gap-4 text-sm text-gray-600 mt-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              <CalendarDays className="h-4 w-4 mr-2" />
                              Add to Calendar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="h-4 w-4 mr-2" />
                              Remind Me
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
