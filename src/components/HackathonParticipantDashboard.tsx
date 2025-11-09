import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { 
  Users, Trophy, Calendar, MapPin, Clock, FileText, 
  Upload, Rocket, CheckCircle2, AlertCircle, PlusCircle,
  UserPlus, Home, ExternalLink
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { BlockchainLoader } from './BlockchainLoader'

interface Team {
  id: string
  name: string
  leader: string
  members: string[]
  memberDetails?: Array<{ id: string; name: string; email: string }>
  createdAt: string
}

interface Submission {
  id: string
  projectName: string
  description: string
  repoUrl?: string
  demoUrl?: string
  videoUrl?: string
  submittedAt: string
  status: string
}

export function HackathonParticipantDashboard() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [hackathon, setHackathon] = useState<any>(null)
  const [registration, setRegistration] = useState<any>(null)
  const [team, setTeam] = useState<Team | null>(null)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const [allTeams, setAllTeams] = useState<Team[]>([])
  
  // Team creation
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false)
  const [teamName, setTeamName] = useState('')
  
  // Submission form
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [id])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load hackathon details
      const hackathonData = await apiCall(`/hackathons/${id}`)
      setHackathon(hackathonData)
      
      // Load user's registration
      try {
        const regData = await apiCall(`/hackathons/${id}/my-registration`)
        setRegistration(regData)
      } catch (error) {
        console.log('No registration found')
      }
      
      // Load user's team
      try {
        const teamData = await apiCall(`/hackathons/${id}/my-team`)
        setTeam(teamData)
      } catch (error) {
        console.log('No team found')
      }
      
      // Load user's submission
      try {
        const submissionData = await apiCall(`/hackathons/${id}/my-submission`)
        setSubmission(submissionData)
      } catch (error) {
        console.log('No submission found')
      }
      
      // Load all teams
      try {
        const teamsData = await apiCall(`/hackathon/${id}/teams`)
        setAllTeams(teamsData)
      } catch (error) {
        console.log('No teams found')
      }
      
    } catch (error: any) {
      console.error('Failed to load dashboard data:', error)
      toast.error('Failed to load dashboard')
      navigate('/hackathons')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const teamData = await apiCall(`/hackathons/${id}/teams`, {
        method: 'POST',
        body: JSON.stringify({ teamName })
      })
      
      setTeam(teamData)
      setIsCreateTeamOpen(false)
      setTeamName('')
      toast.success('Team created successfully!')
      loadDashboardData()
    } catch (error: any) {
      console.error('Failed to create team:', error)
      toast.error(error.message || 'Failed to create team')
    }
  }

  const handleJoinTeam = async (teamId: string) => {
    try {
      const teamData = await apiCall(`/hackathons/${id}/teams/${teamId}/join`, {
        method: 'POST'
      })
      
      setTeam(teamData)
      toast.success('Joined team successfully!')
      loadDashboardData()
    } catch (error: any) {
      console.error('Failed to join team:', error)
      toast.error(error.message || 'Failed to join team')
    }
  }

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const submissionData = await apiCall(`/hackathons/${id}/submissions`, {
        method: 'POST',
        body: JSON.stringify({
          projectName,
          description: projectDescription,
          repoUrl,
          demoUrl,
          videoUrl
        })
      })
      
      setSubmission(submissionData)
      setIsSubmitOpen(false)
      toast.success('Project submitted successfully!')
      
      // Clear form
      setProjectName('')
      setProjectDescription('')
      setRepoUrl('')
      setDemoUrl('')
      setVideoUrl('')
      
      loadDashboardData()
    } catch (error: any) {
      console.error('Failed to submit project:', error)
      toast.error(error.message || 'Failed to submit project')
    }
  }

  if (loading) {
    return <BlockchainLoader message="Loading Your Dashboard" />
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Hackathon Not Found</h1>
          <Link to="/hackathons">
            <Button>Back to Hackathons</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/hackathons" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <Home className="h-4 w-4" />
            Back to Hackathons
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl mb-2">{hackathon.title}</h1>
              <p className="text-xl text-gray-600">Your Participant Dashboard</p>
            </div>
            
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              Registered
            </Badge>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold">{new Date(hackathon.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{hackathon.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Prize Pool</p>
                    <p className="font-semibold">${hackathon.prizePool?.toLocaleString() || 'TBA'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-semibold">{hackathon.participants?.length || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="submission">Project Submission</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Registration Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Your Registration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {registration ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-600">Registered At</p>
                        <p className="font-medium">{new Date(registration.registeredAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <Badge className="bg-green-500">Confirmed</Badge>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600">Loading registration details...</p>
                  )}
                </CardContent>
              </Card>

              {/* Team Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Team Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {team ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Team Name</p>
                        <p className="font-semibold text-lg">{team.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Members</p>
                        <p className="font-medium">{team.members?.length || 0} members</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-600 mb-4">You haven't joined a team yet</p>
                      <Button 
                        onClick={() => setIsCreateTeamOpen(true)}
                        className="w-full"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Team
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Submission Status */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-purple-500" />
                    Project Submission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submission ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-lg">{submission.projectName}</p>
                          <p className="text-sm text-gray-600">Submitted {new Date(submission.submittedAt).toLocaleString()}</p>
                        </div>
                        <Badge className="bg-green-500">Submitted</Badge>
                      </div>
                      
                      {submission.repoUrl && (
                        <a 
                          href={submission.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700"
                        >
                          View Repository
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                      
                      <Button 
                        variant="outline"
                        onClick={() => setIsSubmitOpen(true)}
                      >
                        Update Submission
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium mb-1">No submission yet</p>
                        <p className="text-sm text-gray-600">Submit your project to participate in judging</p>
                      </div>
                      <Button 
                        onClick={() => setIsSubmitOpen(true)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Submit Project
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Hackathon Details */}
            <Card>
              <CardHeader>
                <CardTitle>About This Hackathon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{hackathon.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            {team ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Team: {team.name}</CardTitle>
                  <CardDescription>
                    Created {new Date(team.createdAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Team Members ({team.members?.length || 0})</h4>
                      <div className="space-y-2">
                        {team.memberDetails?.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                                <span className="text-white font-semibold">
                                  {member.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{member.name}</p>
                                <p className="text-sm text-gray-600">{member.email}</p>
                              </div>
                            </div>
                            {member.id === team.leader && (
                              <Badge variant="outline">Team Leader</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Your Team</CardTitle>
                    <CardDescription>
                      Form a team to collaborate on your hackathon project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => setIsCreateTeamOpen(true)}
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Create New Team
                    </Button>
                  </CardContent>
                </Card>

                {allTeams.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Teams</CardTitle>
                      <CardDescription>
                        Join an existing team or create your own
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {allTeams.map((t) => (
                          <div key={t.id} className="flex items-center justify-between p-4 border rounded-lg hover:border-purple-300 transition-colors">
                            <div>
                              <p className="font-semibold">{t.name}</p>
                              <p className="text-sm text-gray-600">{t.members?.length || 0} members</p>
                            </div>
                            <Button 
                              variant="outline"
                              onClick={() => handleJoinTeam(t.id)}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Join Team
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </TabsContent>

          {/* Submission Tab */}
          <TabsContent value="submission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Submission</CardTitle>
                <CardDescription>
                  Submit your hackathon project for judging
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submission ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 mb-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <p className="font-semibold">Project Submitted</p>
                      </div>
                      <p className="text-sm text-green-600">
                        Your project has been successfully submitted and is under review
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label>Project Name</Label>
                        <p className="text-lg font-semibold mt-1">{submission.projectName}</p>
                      </div>
                      
                      <div>
                        <Label>Description</Label>
                        <p className="text-gray-700 mt-1">{submission.description}</p>
                      </div>
                      
                      {submission.repoUrl && (
                        <div>
                          <Label>Repository URL</Label>
                          <a 
                            href={submission.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mt-1"
                          >
                            {submission.repoUrl}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                      
                      {submission.demoUrl && (
                        <div>
                          <Label>Demo URL</Label>
                          <a 
                            href={submission.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-700 flex items-center gap-2 mt-1"
                          >
                            {submission.demoUrl}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </div>

                    <Button 
                      variant="outline"
                      onClick={() => setIsSubmitOpen(true)}
                    >
                      Update Submission
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Submission Yet</h3>
                    <p className="text-gray-600 mb-6">
                      Submit your project to participate in the hackathon judging
                    </p>
                    <Button 
                      onClick={() => setIsSubmitOpen(true)}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Submit Your Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hackathon Resources</CardTitle>
                <CardDescription>
                  Important information and resources for participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hackathon.schedule && hackathon.schedule.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Schedule</h4>
                      <div className="space-y-2">
                        {hackathon.schedule.map((item: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-600">{item.time}</p>
                              {item.description && (
                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hackathon.judges && hackathon.judges.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Judges</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {hackathon.judges.map((judge: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Trophy className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{judge.name}</p>
                              <p className="text-sm text-gray-600">{judge.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hackathon.mentors && hackathon.mentors.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Mentors</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {hackathon.mentors.map((mentor: any, index: number) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <Users className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <p className="font-medium">{mentor.name}</p>
                              <p className="text-sm text-gray-600">{mentor.expertise}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Team Dialog */}
        <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Your Team</DialogTitle>
              <DialogDescription>
                Give your team a name. You can invite members later.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g., Code Ninjas"
                  required
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsCreateTeamOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Team</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Submit Project Dialog */}
        <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Submit Your Project</DialogTitle>
              <DialogDescription>
                Provide details about your hackathon project
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmitProject} className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="projectDescription">Description *</Label>
                <Textarea
                  id="projectDescription"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe what your project does..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>
              
              <div>
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://your-demo.com"
                />
              </div>
              
              <div>
                <Label htmlFor="videoUrl">Video Demo URL (YouTube, Loom, etc.)</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                />
              </div>
              
              <div className="flex gap-3 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setIsSubmitOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Submit Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
