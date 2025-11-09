import { motion } from 'motion/react'
import { Calendar, MapPin, Trophy, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import mastryLogo from 'figma:asset/16e7b499ec18ef7688190dd04429645b08d3e021.png'

export interface Hackathon {
  id: string
  title: string
  blockchain: string
  description: string
  coverImage: string
  logo: string
  startDate: string
  endDate: string
  location: string
  prizePool: string
  participants: number
  maxParticipants: number
  status: 'upcoming' | 'ongoing' | 'ended'
  tags: string[]
  organizer: {
    name: string
    logo: string
  }
  gradient: string
}

export const hackathons: Hackathon[] = [
  {
    id: 'eth-defi-2025',
    title: 'Ethereum DeFi Revolution 2025',
    blockchain: 'Ethereum',
    description: 'Build the next generation of decentralized finance applications on Ethereum. Create innovative DeFi protocols, lending platforms, or yield optimization strategies.',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    startDate: '2025-02-15',
    endDate: '2025-02-17',
    location: 'San Francisco, CA',
    prizePool: '$150,000',
    participants: 234,
    maxParticipants: 500,
    status: 'upcoming',
    tags: ['DeFi', 'Smart Contracts', 'Web3', 'Ethereum'],
    organizer: {
      name: 'Ethereum Foundation',
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 'solana-speed-2025',
    title: 'Solana Speed & Scale Hackathon',
    blockchain: 'Solana',
    description: 'Leverage Solana\'s high-speed blockchain to build lightning-fast dApps. Focus on scalability, gaming, NFTs, and real-time applications.',
    coverImage: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&h=600&fit=crop',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    startDate: '2025-03-01',
    endDate: '2025-03-03',
    location: 'Austin, TX',
    prizePool: '$100,000',
    participants: 189,
    maxParticipants: 400,
    status: 'upcoming',
    tags: ['Solana', 'Gaming', 'NFTs', 'High Performance'],
    organizer: {
      name: 'Solana Foundation',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.png'
    },
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'polygon-sustainability-2025',
    title: 'Polygon Green Tech Challenge',
    blockchain: 'Polygon',
    description: 'Build sustainable and eco-friendly blockchain solutions on Polygon. Create carbon-neutral dApps, green NFT marketplaces, or climate-focused DeFi.',
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    startDate: '2025-03-20',
    endDate: '2025-03-22',
    location: 'Virtual',
    prizePool: '$75,000',
    participants: 156,
    maxParticipants: 300,
    status: 'upcoming',
    tags: ['Polygon', 'Sustainability', 'Green Tech', 'Climate'],
    organizer: {
      name: 'Polygon Labs',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
    },
    gradient: 'from-purple-600 to-blue-600'
  }
]

export function HackathonList() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={mastryLogo} alt="Mastry Hub" className="h-12 w-12" />
              <h1 className="text-5xl md:text-7xl text-gray-900">
                Explore{' '}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Web3 Hackathons
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join innovative blockchain hackathons and build the future of decentralized technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hackathons Grid */}
      <section className="py-12 relative bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {hackathons.map((hackathon, index) => (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Link to={`/hackathon/${hackathon.id}`}>
                  <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg">
                    {/* Cover Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={hackathon.coverImage}
                        alt={hackathon.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Blockchain Logo */}
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-lg">
                          <img src={hackathon.logo} alt={hackathon.blockchain} className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl mb-2 text-gray-900 group-hover:text-purple-600 transition-colors">
                          {hackathon.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {hackathon.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {hackathon.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          <span className="text-gray-700">{hackathon.prizePool}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">{hackathon.participants} joined</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span className="text-gray-700">{new Date(hackathon.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{hackathon.location}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button 
                        className={`w-full bg-gradient-to-r ${hackathon.gradient} hover:opacity-90 text-white border-0 group/btn`}
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
