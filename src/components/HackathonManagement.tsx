import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Progress } from './ui/progress'
import { 
  ArrowLeft, Users, Trophy, BarChart3, MessageSquare, Settings, 
  Edit, UserPlus, Mail, Calendar, TrendingUp, Award, Clock,
  CheckCircle, XCircle, AlertCircle, Send, Search, Filter,
  Download, Share2, Eye, ThumbsUp, GitBranch, Code, Activity,
  Target, PieChart, LineChart
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { BlockchainLoader } from './BlockchainLoader'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart'
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface Hackathon {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: string
  participants?: any[]
  teams?: any[]
  projects?: any[]
}

interface Participant {
  id: string
  name: string
  email: string
  role: string
  joinedAt: string
  teamId?: string
  avatar?: string
}

interface Team {
  id: string
  name: string
  members: Participant[]
  projectId?: string
  status: string
}

interface Project {
  id: string
  title: string
  description: string
  teamId: string
  status: string
  submittedAt?: string
  score?: number
  githubUrl?: string
  demoUrl?: string
}

interface Message {
  id: string
  from: string
  message: string
  timestamp: string
  type: 'announcement' | 'update'
}

type NavigationSection = 'participants' | 'teams' | 'projects' | 'analytics' | 'communication'

export function HackathonManagement() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [hackathon, setHackathon] = useState<Hackathon | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [activeSection, setActiveSection] = useState<NavigationSection>('participants')

  useEffect(() => {
    loadHackathonData()
  }, [id])

  const loadHackathonData = async () => {
    try {
      setLoading(true)
      const data = await apiCall(`/hackathons/${id}`)
      setHackathon(data)
      
      // Load participants
      const participantsData = await apiCall(`/hackathon/${id}/participants`)
      setParticipants(participantsData || [])
      
      // Load teams
      const teamsData = await apiCall(`/hackathon/${id}/teams`)
      setTeams(teamsData || [])
      
      // Load projects
      const projectsData = await apiCall(`/hackathon/${id}/projects`)
      setProjects(projectsData || [])
      
      // Load messages
      const messagesData = await apiCall(`/hackathon/${id}/messages`)
      setMessages(messagesData || [])
    } catch (error: any) {
      console.error('Failed to load hackathon data:', error)
      toast.error('Failed to load hackathon details')
    } finally {
      setLoading(false)
    }
  }

  const sendAnnouncement = async () => {
    if (!newMessage.trim()) {
      toast.error('Please enter a message')
      return
    }

    try {
      await apiCall(`/hackathon/${id}/message`, {
        method: 'POST',
        body: JSON.stringify({
          message: newMessage,
          type: 'announcement'
        })
      })
      
      toast.success('Announcement sent successfully')
      setNewMessage('')
      loadHackathonData()
    } catch (error: any) {
      console.error('Failed to send announcement:', error)
      toast.error('Failed to send announcement')
    }
  }

  const exportData = (type: string) => {
    toast.success(`Exporting ${type} data...`)
  }

  if (loading) {
    return <BlockchainLoader message="Loading Hackathon Management" />
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Hackathon not found</h2>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  const stats = {
    totalParticipants: participants.length,
    totalTeams: teams.length,
    totalProjects: projects.length,
    submittedProjects: projects.filter(p => p.status === 'submitted').length,
    averageTeamSize: teams.length > 0 ? Math.round(participants.length / teams.length) : 0,
    completionRate: projects.length > 0 ? Math.round((projects.filter(p => p.status === 'submitted').length / projects.length) * 100) : 0
  }

  const navigationItems: { id: NavigationSection; label: string; icon: React.ElementType }[] = [
    { id: 'participants', label: 'Participants', icon: Users },
    { id: 'teams', label: 'Teams', icon: GitBranch },
    { id: 'projects', label: 'Projects', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-72 min-h-screen bg-white border-r border-gray-200 sticky top-0">
          <div className="p-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="mb-6 w-full justify-start"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            {/* Hackathon Overview */}
            <div className="mb-8">
              <h2 className="text-xl mb-2">{hackathon.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{hackathon.description}</p>
              <div className="flex flex-col gap-2">
                <Badge 
                  variant={hackathon.status === 'ongoing' ? 'default' : 'secondary'}
                  className="w-fit"
                >
                  {hackathon.status}
                </Badge>
                <Badge variant="outline" className="w-fit">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(hackathon.startDate).toLocaleDateString()}
                </Badge>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={() => navigate(`/hackathon/${id}`)}
                  className="flex-1"
                  variant="outline"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button 
                  onClick={() => navigate(`/hackathon/${id}/edit`)}
                  className="flex-1"
                  variant="outline"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 p-8">
          {/* Participants Section */}
          {activeSection === 'participants' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Participants Management</CardTitle>
                    <CardDescription>Manage all registered participants</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => exportData('participants')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search participants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {participants.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No participants registered yet</p>
                    </div>
                  ) : (
                    participants
                      .filter(p => 
                        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((participant) => (
                        <div key={participant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback>{participant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{participant.name}</p>
                              <p className="text-sm text-gray-600">{participant.email}</p>
                              {participant.teamId && (
                                <Badge variant="outline" className="mt-1">
                                  Team Member
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{participant.role}</Badge>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Teams Section */}
          {activeSection === 'teams' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Teams Management</CardTitle>
                    <CardDescription>View and manage hackathon teams</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => exportData('teams')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teams.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No teams formed yet</p>
                    </div>
                  ) : (
                    teams.map((team) => (
                      <div key={team.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{team.name}</h3>
                            <p className="text-sm text-gray-600">{team.members.length} members</p>
                          </div>
                          <Badge>{team.status}</Badge>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {team.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{member.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Project Submissions</CardTitle>
                    <CardDescription>Review and evaluate submitted projects</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => exportData('projects')}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No projects submitted yet</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project.id} className="border rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge variant={project.status === 'submitted' ? 'default' : 'secondary'}>
                                {project.status}
                              </Badge>
                              {project.submittedAt && (
                                <Badge variant="outline">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {new Date(project.submittedAt).toLocaleDateString()}
                                </Badge>
                              )}
                              {project.score && (
                                <Badge variant="outline">
                                  <Award className="h-3 w-3 mr-1" />
                                  Score: {project.score}/100
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {project.githubUrl && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <GitBranch className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                            {project.demoUrl && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl">Analytics Overview</h2>
                  <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
                </div>
                <Button variant="outline" onClick={() => exportData('analytics')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Users className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-purple-700 mb-1">Participants</p>
                        <p className="text-3xl text-purple-900">{stats.totalParticipants}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <GitBranch className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-blue-700 mb-1">Teams</p>
                        <p className="text-3xl text-blue-900">{stats.totalTeams}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                        <Code className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-green-700 mb-1">Projects</p>
                        <p className="text-3xl text-green-900">{stats.totalProjects}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-yellow-500 rounded-2xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                        <TrendingUp className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-yellow-700 mb-1">Completion</p>
                        <p className="text-3xl text-yellow-900">{stats.completionRate}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Registration Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-purple-600" />
                      Registration Trend
                    </CardTitle>
                    <CardDescription>Daily participant registrations over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={[
                          { day: 'Day 1', participants: 5 },
                          { day: 'Day 2', participants: 12 },
                          { day: 'Day 3', participants: 18 },
                          { day: 'Day 4', participants: 25 },
                          { day: 'Day 5', participants: 32 },
                          { day: 'Day 6', participants: 38 },
                          { day: 'Day 7', participants: stats.totalParticipants || 45 },
                        ]}
                      >
                        <defs>
                          <linearGradient id="colorParticipants" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Area type="monotone" dataKey="participants" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorParticipants)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Team Size Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Team Size Distribution
                    </CardTitle>
                    <CardDescription>Number of teams by member count</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { size: '1-2', teams: 8 },
                          { size: '3-4', teams: 15 },
                          { size: '5-6', teams: 12 },
                          { size: '7+', teams: 5 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="size" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar dataKey="teams" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 2 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Project Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-green-600" />
                      Project Status
                    </CardTitle>
                    <CardDescription>Current project states</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'In Progress', value: projects.filter(p => p.status === 'active').length || 15 },
                            { name: 'Submitted', value: stats.submittedProjects || 8 },
                            { name: 'Under Review', value: 3 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Engagement Metrics */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-orange-600" />
                      Engagement Metrics
                    </CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Registration Progress</span>
                        <span className="text-sm font-medium">{stats.totalParticipants} registered</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Team Formation Rate</span>
                        <span className="text-sm font-medium">{stats.totalTeams} teams formed</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Project Submission Rate</span>
                        <span className="text-sm font-medium">{stats.submittedProjects} submitted</span>
                      </div>
                      <Progress value={stats.completionRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Overall Engagement</span>
                        <span className="text-sm font-medium">78% active</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Row 3 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-600" />
                      Activity Timeline
                    </CardTitle>
                    <CardDescription>Recent hackathon milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium">Hackathon Started</p>
                          <p className="text-sm text-gray-600">{new Date(hackathon.startDate).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium">{stats.totalParticipants} Participants Registered</p>
                          <p className="text-sm text-gray-600">Current total registrations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium">{stats.totalTeams} Teams Formed</p>
                          <p className="text-sm text-gray-600">Teams are collaborating</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium">{stats.submittedProjects} Projects Submitted</p>
                          <p className="text-sm text-gray-600">Awaiting evaluation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Performance Insights
                    </CardTitle>
                    <CardDescription>Detailed statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-purple-700">Average Team Size</p>
                          <p className="text-xl text-purple-900">{stats.averageTeamSize}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-700">Active Projects</p>
                          <p className="text-xl text-blue-900">{projects.filter(p => p.status === 'active').length}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-green-700">Messages Sent</p>
                          <p className="text-xl text-green-900">{messages.length}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600" />
                    Daily Activity Overview
                  </CardTitle>
                  <CardDescription>Participant engagement throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        { day: 'Mon', active: 28, submissions: 5, teams: 3 },
                        { day: 'Tue', active: 32, submissions: 8, teams: 5 },
                        { day: 'Wed', active: 35, submissions: 12, teams: 6 },
                        { day: 'Thu', active: 38, submissions: 15, teams: 8 },
                        { day: 'Fri', active: 42, submissions: 18, teams: 10 },
                        { day: 'Sat', active: 40, submissions: 20, teams: 12 },
                        { day: 'Sun', active: 36, submissions: 22, teams: 14 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="active" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Active Users" />
                      <Bar dataKey="submissions" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Submissions" />
                      <Bar dataKey="teams" fill="#10b981" radius={[8, 8, 0, 0]} name="Teams" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Communication Section */}
          {activeSection === 'communication' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Send Announcement</CardTitle>
                  <CardDescription>Broadcast messages to all participants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Type your announcement here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button onClick={sendAnnouncement} className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Announcement
                    </Button>
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Email All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite Participants
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Announcement history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No messages sent yet</p>
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div key={message.id} className="border-l-4 border-purple-500 pl-4 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant="outline">{message.type}</Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
