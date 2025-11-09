import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Code, 
  Sparkles, 
  Award, 
  Building2, 
  ArrowLeft, 
  CheckCircle2,
  Clock,
  Star,
  Target,
  Zap
} from 'lucide-react'
import { pastEvents } from '../data/pastEvents'
import { ImageWithFallback } from './figma/ImageWithFallback'

const eventImages = {
  'polygon-web3-academy-2023': 'https://images.unsplash.com/photo-1592383010275-b028451b2947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwY29uZmVyZW5jZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyNzAyMTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'polygon-fusion-2023': 'https://images.unsplash.com/photo-1690192308371-122513cbcccc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbWVldHVwJTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NjI3MDIxODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'web3-innovate-build-gurugram-2023': 'https://images.unsplash.com/photo-1523582407565-efee5cf4a353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwbWVldHVwJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjI3MDI2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'web3-innovate-build-noida-2023': 'https://images.unsplash.com/photo-1593080367361-892e1ef63ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjI3MDM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'coindcx-blockchain-builders-2023': 'https://images.unsplash.com/photo-1593080367361-892e1ef63ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjI3MDM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'coindcx-blockchain-insights-2023': 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjB3ZWJpbmFyfGVufDF8fHx8MTc2MjcwMzg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'polygon-innovators-bootcamp-2023': 'https://images.unsplash.com/photo-1580835916901-40770720c505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3Nob3B8ZW58MXx8fHwxNzYyNjk5ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'wazirx-blockchain-meetup-2022': 'https://images.unsplash.com/photo-1633534415766-165181ffdbb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMHRyYWRpbmd8ZW58MXx8fHwxNzYyNjY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  'unocoin-blockchain-meetup-2022': 'https://images.unsplash.com/photo-1593080367361-892e1ef63ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY29uZmVyZW5jZXxlbnwxfHx8fDE3NjI3MDM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080'
}

export function EventDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = pastEvents.find(e => e.id === id)

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/past-events')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr: string, endDateStr?: string) => {
    const date = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    
    if (endDateStr) {
      const endDate = new Date(endDateStr)
      return `${date.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`
    }
    
    return date.toLocaleDateString('en-US', options)
  }

  const coverImage = event.eventCover || eventImages[event.id as keyof typeof eventImages]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Cover Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent`} />
        
        {/* Floating Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Button
            onClick={() => navigate('/past-events')}
            variant="outline"
            className="bg-black/50 backdrop-blur-md border-gray-700 text-white hover:bg-black/70"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className={`bg-${event.accentColor}-500/90 text-white border-0 mb-4`}>
                {event.partner}
              </Badge>
              <h1 className={`text-4xl md:text-5xl lg:text-7xl mb-4 bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent`}>
                {event.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl">
                {event.partnerOrganization}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
            >
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border-purple-500/20">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 text-purple-400 mb-3" />
                  <div className="text-xs text-gray-500 mb-1">Date</div>
                  <div className="text-sm text-gray-300">{formatDate(event.date, event.endDate)}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border-blue-500/20">
                <CardContent className="p-6">
                  <MapPin className="h-8 w-8 text-blue-400 mb-3" />
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="text-sm text-gray-300">{event.location}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-900/30 to-pink-950/30 border-pink-500/20">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-pink-400 mb-3" />
                  <div className="text-xs text-gray-500 mb-1">Participants</div>
                  <div className="text-sm text-gray-300">{event.participants}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-950/30 border-yellow-500/20">
                <CardContent className="p-6">
                  <Trophy className="h-8 w-8 text-yellow-400 mb-3" />
                  <div className="text-xs text-gray-500 mb-1">Rewards</div>
                  <div className="text-sm text-gray-300">{event.prizePool}</div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - 2 columns */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3">
                        <Sparkles className="h-6 w-6 text-purple-400" />
                        About the Event
                      </h2>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Key Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3">
                        <Award className="h-6 w-6 text-purple-400" />
                        Key Highlights
                      </h2>
                      <div className="grid gap-4">
                        {event.highlights.map((highlight: string, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors"
                          >
                            <CheckCircle2 className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-lg">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Technologies Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                    <CardContent className="p-6 md:p-8">
                      <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3">
                        <Code className="h-6 w-6 text-purple-400" />
                        Technologies & Topics
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {event.technologies.map((tech: any, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                            className="p-5 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105"
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <Zap className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                              <div className="text-purple-400">{tech.name}</div>
                            </div>
                            <div className="text-sm text-gray-400 ml-8">{tech.description}</div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Schedule (if available) */}
                {event.schedule && event.schedule.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3">
                          <Clock className="h-6 w-6 text-purple-400" />
                          Event Schedule
                        </h2>
                        <div className="space-y-4">
                          {event.schedule.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex gap-4 p-4 bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg border border-blue-500/10"
                            >
                              <div className="flex-shrink-0 w-32 text-blue-400">{item.time}</div>
                              <div className="text-gray-300">{item.title}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Speakers (if available) */}
                {event.speakers && event.speakers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                      <CardContent className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl mb-6 flex items-center gap-3">
                          <Users className="h-6 w-6 text-purple-400" />
                          Featured Speakers
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {event.speakers.map((speaker: any, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + idx * 0.1 }}
                              className="text-center group"
                            >
                              <div className="relative mb-4">
                                <ImageWithFallback
                                  src={speaker.image}
                                  alt={speaker.name}
                                  className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-purple-500/30 group-hover:border-purple-500 transition-all group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <div className="text-white mb-1">{speaker.name}</div>
                              <div className="text-sm text-gray-500">{speaker.role}</div>
                              <div className="text-sm text-purple-400">{speaker.company}</div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* Sidebar - 1 column */}
              <div className="space-y-8">
                {/* Event Info Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 sticky top-24">
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-4 flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-purple-400" />
                        Event Details
                      </h3>
                      <div className="space-y-4">
                        <div className="pb-4 border-b border-gray-800">
                          <div className="text-xs text-gray-500 mb-2">Organized By</div>
                          <div className="text-gray-300">{event.partnerOrganization}</div>
                        </div>

                        <div className="pb-4 border-b border-gray-800">
                          <div className="text-xs text-gray-500 mb-2">Event Type</div>
                          <div className="text-gray-300">{event.locationType}</div>
                        </div>

                        {event.duration && (
                          <div className="pb-4 border-b border-gray-800">
                            <div className="text-xs text-gray-500 mb-2">Duration</div>
                            <div className="text-gray-300">{event.duration}</div>
                          </div>
                        )}

                        <div className="pb-4 border-b border-gray-800">
                          <div className="text-xs text-gray-500 mb-2">Participants</div>
                          <div className="text-gray-300">{event.participantsDetail || event.participants}</div>
                        </div>

                        {event.sponsorLogo && (
                          <div>
                            <div className="text-xs text-gray-500 mb-3">Sponsored By</div>
                            <ImageWithFallback
                              src={event.sponsorLogo}
                              alt="Sponsor"
                              className="w-32 h-auto mx-auto"
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Benefits (if available) */}
                {event.benefits && event.benefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800">
                      <CardContent className="p-6">
                        <h3 className="text-xl mb-4 flex items-center gap-2">
                          <Star className="h-5 w-5 text-purple-400" />
                          Key Benefits
                        </h3>
                        <div className="space-y-3">
                          {event.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-3">
                              <Target className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-400">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* CTA Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className={`bg-gradient-to-br ${event.gradient} border-0`}>
                    <CardContent className="p-6 text-center">
                      <Award className="h-12 w-12 text-white mx-auto mb-4" />
                      <h3 className="text-xl text-white mb-3">Interested in Our Events?</h3>
                      <p className="text-white/80 text-sm mb-4">
                        Join our upcoming hackathons and meetups
                      </p>
                      <Link to="/hackathons">
                        <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                          Browse Active Events
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Back to Events Button */}
            <div className="mt-12 text-center">
              <Button
                onClick={() => navigate('/past-events')}
                variant="outline"
                className="border-gray-700 text-white hover:bg-white/10"
                size="lg"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                View All Past Events
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
