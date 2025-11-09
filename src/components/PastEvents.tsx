import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Calendar, MapPin, Users, Trophy, Award, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'
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

export function PastEvents() {
  const navigate = useNavigate()

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`)
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Our Track Record</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl mb-6">
              Past{' '}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Events & Success Stories
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our journey of empowering thousands of developers and building thriving Web3 communities across the globe.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-950/30 border-purple-500/20">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    100+
                  </div>
                  <div className="text-gray-400">Events Organized</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-950/30 border-blue-500/20">
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    10M+
                  </div>
                  <div className="text-gray-400">Participants Reached</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-pink-900/30 to-pink-950/30 border-pink-500/20">
                <CardContent className="p-6 text-center">
                  <Building2 className="h-10 w-10 text-pink-400 mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    25+
                  </div>
                  <div className="text-gray-400">Partner Institutions</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 group h-full flex flex-col cursor-pointer"
                    onClick={() => handleEventClick(event.id)}
                  >
                    {/* Image Section with Shadow Overlay */}
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={event.eventCover || eventImages[event.id as keyof typeof eventImages]}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dark overlay with gradient for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      
                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className={`bg-${event.accentColor}-500/90 text-white border-0 text-xs`}>
                          {event.partner}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-5 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className={`text-xl mb-3 bg-gradient-to-r ${event.gradient} bg-clip-text text-transparent line-clamp-2`}>
                          {event.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Event Details - Compact */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Calendar className="h-3.5 w-3.5 text-purple-400" />
                            <span className="truncate">{formatDate(event.date, event.endDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <MapPin className="h-3.5 w-3.5 text-blue-400" />
                            <span className="truncate">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Users className="h-3.5 w-3.5 text-pink-400" />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>

                        {/* Quick Highlights */}
                        <div className="space-y-1.5 mb-4">
                          {event.highlights.slice(0, 1).map((highlight, idx) => (
                            <div key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-gray-400 line-clamp-2">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* View Details Button */}
                      <Button
                        className={`w-full bg-gradient-to-r ${event.gradient} hover:opacity-90 text-white border-0 group/btn text-sm mt-auto`}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
