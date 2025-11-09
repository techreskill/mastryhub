import { motion } from 'motion/react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Trophy, Users, Share2, Heart, CheckCircle2, Sun, Moon, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { hackathons } from './HackathonList'
import { useState, useEffect } from 'react'
import { RegistrationForm } from './RegistrationForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import mastryLogo from 'figma:asset/16e7b499ec18ef7688190dd04429645b08d3e021.png'
import { apiCall } from '../utils/api'
import { toast } from 'sonner@2.0.3'
import { BlockchainLoader } from './BlockchainLoader'

export function HackathonDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [hackathon, setHackathon] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    checkUser()
    loadHackathon()
  }, [id])

  const checkUser = async () => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      try {
        const userData = await apiCall('/me')
        setUser(userData)
        
        // Check if user is already registered
        try {
          await apiCall(`/hackathons/${id}/my-registration`)
          setIsRegistered(true)
        } catch (error) {
          setIsRegistered(false)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }
  }

  const loadHackathon = async () => {
    try {
      setLoading(true)
      // First try to find in static hackathons
      const staticHackathon = hackathons.find(h => h.id === id)
      
      if (staticHackathon) {
        setHackathon(staticHackathon)
      } else {
        // Try to fetch from API
        try {
          const data = await apiCall('/hackathons')
          const apiHackathon = data.find((h: any) => h.id === id)
          
          if (apiHackathon) {
            // Map API data to match expected structure
            setHackathon({
              ...apiHackathon,
              logo: apiHackathon.organizerLogo || mastryLogo,
              blockchain: apiHackathon.blockchain || 'Web3',
              participants: apiHackathon.participants?.length || 0,
              maxParticipants: apiHackathon.maxParticipants || 500,
              status: apiHackathon.status || 'upcoming',
              tags: apiHackathon.tags || ['Web3', 'Blockchain'],
              organizer: {
                name: apiHackathon.organizerName || 'Mastry Hub',
                logo: apiHackathon.organizerLogo || mastryLogo
              },
              gradient: apiHackathon.gradient || 'from-purple-600 to-blue-600'
            })
          } else {
            setHackathon(null)
          }
        } catch (error) {
          console.error('Error fetching hackathon from API:', error)
          setHackathon(null)
        }
      }
    } catch (error) {
      console.error('Error loading hackathon:', error)
      toast.error('Failed to load hackathon details')
    } finally {
      setLoading(false)
    }
  }

  const handleRegistrationSuccess = () => {
    setIsRegistrationOpen(false)
    // Redirect to hackathon participant dashboard after successful registration
    setTimeout(() => {
      navigate(`/hackathon/${id}/dashboard`)
    }, 1000)
  }

  if (loading) {
    return <BlockchainLoader message="Loading Hackathon Details" />
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-gray-900">Hackathon Not Found</h1>
          <p className="text-gray-600 mb-6">The hackathon you're looking for doesn't exist or has been removed.</p>
          <Link to="/hackathons">
            <Button>Back to Hackathons</Button>
          </Link>
        </div>
      </div>
    )
  }

  const schedule = [
    { day: 'Day 1', date: hackathon.startDate, events: [
      { time: '09:00 AM', title: 'Registration & Welcome', description: 'Check-in and opening ceremony' },
      { time: '10:00 AM', title: 'Keynote Speech', description: 'Industry leaders share insights' },
      { time: '11:00 AM', title: 'Team Formation', description: 'Network and form teams' },
      { time: '12:00 PM', title: 'Hacking Begins', description: 'Start building your project' },
    ]},
    { day: 'Day 2', date: new Date(new Date(hackathon.startDate).getTime() + 86400000).toISOString().split('T')[0], events: [
      { time: '09:00 AM', title: 'Morning Stand-up', description: 'Share progress with mentors' },
      { time: '12:00 PM', title: 'Workshop: Smart Contracts', description: 'Deep dive into development' },
      { time: '03:00 PM', title: 'Mentor Sessions', description: 'One-on-one guidance' },
      { time: '06:00 PM', title: 'Networking Dinner', description: 'Connect with other builders' },
    ]},
    { day: 'Day 3', date: hackathon.endDate, events: [
      { time: '09:00 AM', title: 'Final Sprint', description: 'Last hours of development' },
      { time: '12:00 PM', title: 'Submissions Due', description: 'Submit your project' },
      { time: '02:00 PM', title: 'Judging & Demos', description: 'Present to judges' },
      { time: '05:00 PM', title: 'Awards Ceremony', description: 'Winners announcement' },
    ]},
  ]

  const judges = [
    { name: 'Dr. Sarah Chen', role: 'CTO, BlockChain Labs', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop' },
    { name: 'Michael Rodriguez', role: 'Lead Developer, Web3 Foundation', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop' },
    { name: 'Emily Zhang', role: 'Founder, DeFi Innovations', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop' },
  ]

  const mentors = [
    { name: 'Alex Kumar', expertise: 'Smart Contract Security', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
    { name: 'Lisa Thompson', expertise: 'DeFi Architecture', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop' },
    { name: 'James Park', expertise: 'Frontend Development', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop' },
    { name: 'Nina Patel', expertise: 'Blockchain Infrastructure', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop' },
  ]

  const prizes = [
    { place: '1st Place', amount: '$50,000', description: 'Grand Prize + Mentorship' },
    { place: '2nd Place', amount: '$30,000', description: 'Runner-up Prize' },
    { place: '3rd Place', amount: '$20,000', description: 'Third Prize' },
    { place: 'Best Innovation', amount: '$15,000', description: 'Special Category' },
    { place: 'Best Design', amount: '$15,000', description: 'Special Category' },
    { place: 'Community Choice', amount: '$10,000', description: 'Voted by participants' },
  ]

  const sponsors = [
    { name: 'Web3 Foundation', logo: 'https://via.placeholder.com/150x60/8B5CF6/FFFFFF?text=Web3' },
    { name: 'Blockchain Capital', logo: 'https://via.placeholder.com/150x60/3B82F6/FFFFFF?text=Capital' },
    { name: 'DeFi Alliance', logo: 'https://via.placeholder.com/150x60/EC4899/FFFFFF?text=DeFi' },
    { name: 'Crypto Ventures', logo: 'https://via.placeholder.com/150x60/10B981/FFFFFF?text=Ventures' },
  ]

  const faqs = [
    {
      question: 'Who can participate in this hackathon?',
      answer: 'Anyone aged 18 or above with an interest in blockchain technology can participate. You can join as an individual or form teams of up to 4 members.'
    },
    {
      question: 'Do I need to have a team before registering?',
      answer: 'No, you can register as an individual and form teams during the team formation session on Day 1. We also have a dedicated Discord channel for team matching before the event.'
    },
    {
      question: 'What should I bring to the hackathon?',
      answer: 'Bring your laptop, chargers, and any development tools you prefer. We provide WiFi, workspace, meals, and refreshments throughout the event.'
    },
    {
      question: 'Is there any cost to participate?',
      answer: 'No, participation is completely free! We cover venue, meals, and even provide swag bags to all participants.'
    },
    {
      question: 'What are the judging criteria?',
      answer: 'Projects will be judged based on innovation (30%), technical implementation (30%), design & UX (20%), presentation (10%), and potential impact (10%).'
    },
    {
      question: 'Can I work on an existing project?',
      answer: 'No, all projects must be started from scratch during the hackathon. However, you can use existing open-source libraries and frameworks.'
    },
    {
      question: 'Will there be mentors available?',
      answer: 'Yes! We have experienced mentors available throughout the hackathon to help with technical challenges, provide guidance, and answer questions.'
    },
    {
      question: 'What happens after I win?',
      answer: 'Winners receive their prize money, potential funding opportunities, mentorship from industry leaders, and a chance to showcase their project to our partner VCs.'
    }
  ]

  const themeClasses = {
    bg: isDarkTheme ? 'bg-black' : 'bg-white',
    text: isDarkTheme ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkTheme ? 'text-gray-400' : 'text-gray-600',
    card: isDarkTheme ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200',
    border: isDarkTheme ? 'border-gray-800' : 'border-gray-200',
    hover: isDarkTheme ? 'hover:border-gray-700' : 'hover:border-gray-300',
    tabsList: isDarkTheme ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100',
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text}`}>
      {/* Theme Toggle */}
      <div className="fixed top-24 right-6 z-50">
        <Button
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          variant="outline"
          size="sm"
          className={`rounded-full ${isDarkTheme ? 'bg-gray-900 border-gray-700 text-white hover:bg-gray-800' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'}`}
        >
          {isDarkTheme ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={hackathon.coverImage}
          alt={hackathon.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-lg">
                  <img src={hackathon.logo} alt={hackathon.blockchain} className="w-full h-full object-contain" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-7xl mb-4 text-white">{hackathon.title}</h1>
              <p className="text-xl text-gray-300 max-w-3xl mb-6">{hackathon.description}</p>
              
              <div className="flex flex-wrap gap-4 items-center">
                {isRegistered ? (
                  <Button 
                    size="lg"
                    onClick={() => navigate(`/hackathon/${id}/dashboard`)}
                    className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-8 py-6 text-lg`}
                  >
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                ) : user ? (
                  <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg"
                        className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-8 py-6 text-lg`}
                      >
                        Register Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={`${isDarkTheme ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'} max-w-2xl max-h-[90vh] overflow-y-auto`}>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Register for {hackathon.title}</DialogTitle>
                      </DialogHeader>
                      <RegistrationForm 
                        hackathonId={hackathon.id} 
                        onSuccess={handleRegistrationSuccess} 
                        isDark={isDarkTheme}
                        user={user}
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button 
                    size="lg"
                    onClick={() => navigate('/signup')}
                    className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-8 py-6 text-lg`}
                  >
                    Sign Up to Register
                  </Button>
                )}
                
                <Button size="lg" variant="outline" className="bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-white/10">
                  <Heart className="mr-2 h-5 w-5" />
                  Save
                </Button>
                <Button size="lg" variant="outline" className="bg-black/50 backdrop-blur-sm border-gray-700 text-white hover:bg-white/10">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className={`py-8 border-b ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className={`text-sm ${themeClasses.textSecondary}`}>Start Date</p>
              <p className="text-lg">{new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className={`text-sm ${themeClasses.textSecondary}`}>Location</p>
              <p className="text-lg">{hackathon.location}</p>
            </div>
            <div className="text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <p className={`text-sm ${themeClasses.textSecondary}`}>Prize Pool</p>
              <p className="text-lg">{hackathon.prizePool}</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className={`text-sm ${themeClasses.textSecondary}`}>Participants</p>
              <p className="text-lg">{hackathon.participants} / {hackathon.maxParticipants}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={`grid w-full max-w-2xl mx-auto grid-cols-5 mb-12 ${themeClasses.tabsList}`}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="prizes">Prizes</TabsTrigger>
              <TabsTrigger value="judges">Judges</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6">About This Hackathon</h3>
                  <div className="prose prose-lg max-w-none">
                    <p className={themeClasses.textSecondary}>
                      {hackathon.about || hackathon.description}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6">Why Participate?</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className={`w-16 h-16 ${isDarkTheme ? 'bg-purple-900/50' : 'bg-purple-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Trophy className="h-8 w-8 text-purple-600" />
                      </div>
                      <h4 className="text-xl mb-2">Win Prizes</h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        Compete for {hackathon.prizePool} in prizes and recognition
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 ${isDarkTheme ? 'bg-blue-900/50' : 'bg-blue-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h4 className="text-xl mb-2">Network</h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        Connect with industry leaders and like-minded builders
                      </p>
                    </div>
                    <div className="text-center">
                      <div className={`w-16 h-16 ${isDarkTheme ? 'bg-green-900/50' : 'bg-green-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="text-xl mb-2">Learn & Build</h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>
                        Gain hands-on experience with cutting-edge technology
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6">Meet Our Mentors</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    {mentors.map((mentor, index) => (
                      <div key={index} className="text-center">
                        <img src={mentor.image} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                        <h4 className="mb-1">{mentor.name}</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>{mentor.expertise}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule">
              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6">Event Schedule</h3>
                  <div className="space-y-8">
                    {schedule.map((day, dayIndex) => (
                      <div key={dayIndex}>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className={`bg-gradient-to-r ${hackathon.gradient} text-white`}>{day.day}</Badge>
                          <span className={themeClasses.textSecondary}>
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                          </span>
                        </div>
                        <div className="space-y-4 pl-4">
                          {day.events.map((event, eventIndex) => (
                            <div key={eventIndex} className={`flex gap-4 p-4 ${isDarkTheme ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg ${themeClasses.hover} transition-colors`}>
                              <div className="text-sm font-medium min-w-24">{event.time}</div>
                              <div className="flex-1">
                                <h4 className="mb-1">{event.title}</h4>
                                <p className={`text-sm ${themeClasses.textSecondary}`}>{event.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prizes">
              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6 text-center">Prize Pool: {hackathon.prizePool}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {prizes.map((prize, index) => (
                      <div 
                        key={index} 
                        className={`p-6 rounded-xl border-2 ${
                          index === 0 ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' :
                          index === 1 ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/50' :
                          index === 2 ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20' :
                          `border-gray-300 ${isDarkTheme ? 'bg-gray-800/30' : 'bg-gray-50'}`
                        }`}
                      >
                        <div className="text-center">
                          <h4 className="text-2xl mb-2">{prize.place}</h4>
                          <p className="text-3xl mb-2">{prize.amount}</p>
                          <p className={`text-sm ${themeClasses.textSecondary}`}>{prize.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="judges">
              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6 text-center">Meet Our Judges</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {judges.map((judge, index) => (
                      <div key={index} className="text-center">
                        <img src={judge.image} alt={judge.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                        <h4 className="text-xl mb-2">{judge.name}</h4>
                        <p className={`${themeClasses.textSecondary}`}>{judge.role}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sponsors">
              <Card className={themeClasses.card}>
                <CardContent className="p-8">
                  <h3 className="text-3xl mb-6 text-center">Our Sponsors</h3>
                  <div className="grid md:grid-cols-4 gap-8">
                    {sponsors.map((sponsor, index) => (
                      <div key={index} className={`flex items-center justify-center p-6 ${isDarkTheme ? 'bg-gray-800/50 hover:bg-gray-800' : 'bg-gray-50 hover:bg-gray-100'} rounded-xl transition-colors`}>
                        <img src={sponsor.logo} alt={sponsor.name} className="max-w-full h-12 object-contain" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 border-t ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-4xl mb-4">Frequently Asked Questions</h3>
              <p className={`text-xl ${themeClasses.textSecondary}`}>
                Everything you need to know about the hackathon
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className={`${themeClasses.card} px-6 rounded-lg border`}
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className={`${themeClasses.textSecondary} pb-4`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 border-t ${themeClasses.border}`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <img src={mastryLogo} alt="Mastry Hub" className="h-16 w-16 mx-auto mb-6" />
            <h3 className="text-4xl mb-4">Ready to Join?</h3>
            <p className={`text-xl ${themeClasses.textSecondary} mb-8`}>
              Don't miss this opportunity to build, learn, and win amazing prizes
            </p>
            {isRegistered ? (
              <Button 
                size="lg"
                onClick={() => navigate(`/hackathon/${id}/dashboard`)}
                className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-12 py-7 text-xl`}
              >
                <CheckCircle2 className="mr-2 h-6 w-6" />
                Go to Your Dashboard
              </Button>
            ) : user ? (
              <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg"
                    className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-12 py-7 text-xl`}
                  >
                    Register for {hackathon.title}
                  </Button>
                </DialogTrigger>
                <DialogContent className={`${isDarkTheme ? 'bg-gray-950 border-gray-800 text-white' : 'bg-white border-gray-200 text-gray-900'} max-w-2xl max-h-[90vh] overflow-y-auto`}>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Register for {hackathon.title}</DialogTitle>
                  </DialogHeader>
                  <RegistrationForm 
                    hackathonId={hackathon.id} 
                    onSuccess={handleRegistrationSuccess} 
                    isDark={isDarkTheme}
                    user={user}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className={`bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 px-12 py-7 text-xl`}
              >
                Sign Up to Register
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
