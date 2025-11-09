import { motion, useScroll, useTransform } from 'motion/react'
import { Calendar, Users, Trophy, Activity, Zap, Globe, CheckCircle, MapPin, Clock, Award } from 'lucide-react'
import { useRef } from 'react'

const features = [
  {
    icon: Calendar,
    title: 'Event Management',
    subtitle: 'Intuitive event creation',
    description: 'Create and manage hackathons with complete control over every detail',
    gradient: 'from-purple-500 to-pink-500',
    color: '#8B5CF6',
    content: [
      { label: 'Web3 Innovation Challenge', detail: 'Dec 15-17, 2024' },
      { label: 'DeFi Builders Hackathon', detail: 'Jan 8-10, 2025' },
      { label: 'NFT Creator Summit', detail: 'Jan 22-24, 2025' }
    ]
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    subtitle: 'Seamless teamwork',
    description: 'Connect participants, mentors, and judges in one seamless platform',
    gradient: 'from-blue-500 to-cyan-500',
    color: '#3B82F6',
    content: [
      { label: '1,247 Participants', detail: 'Active developers' },
      { label: '89 Mentors', detail: 'Industry experts' },
      { label: '34 Judges', detail: 'Evaluating projects' }
    ]
  },
  {
    icon: Trophy,
    title: 'Prize Distribution',
    subtitle: 'Smart rewards system',
    description: 'Manage prize pools and automate distribution with transparency',
    gradient: 'from-yellow-500 to-orange-500',
    color: '#F59E0B',
    content: [
      { label: '1st Place', detail: '$50,000' },
      { label: '2nd Place', detail: '$25,000' },
      { label: '3rd Place', detail: '$10,000' }
    ]
  },
  {
    icon: Activity,
    title: 'Project Tracking',
    subtitle: 'Real-time monitoring',
    description: 'Track submissions and progress with advanced analytics',
    gradient: 'from-green-500 to-emerald-500',
    color: '#10B981',
    content: [
      { label: '156 Projects', detail: 'Submitted' },
      { label: '89 Projects', detail: 'In review' },
      { label: '12 Projects', detail: 'Winners selected' }
    ]
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    subtitle: 'Quick launch',
    description: 'Launch your hackathon in minutes with our streamlined process',
    gradient: 'from-violet-500 to-purple-500',
    color: '#8B5CF6',
    content: [
      { label: 'Event Details', detail: 'Completed' },
      { label: 'Team Setup', detail: 'Completed' },
      { label: 'Go Live', detail: 'Ready' }
    ]
  },
  {
    icon: Globe,
    title: 'Global Reach',
    subtitle: 'Worldwide events',
    description: 'Host virtual or hybrid events accessible to participants globally',
    gradient: 'from-pink-500 to-rose-500',
    color: '#EC4899',
    content: [
      { label: 'San Francisco, USA', detail: '247 participants' },
      { label: 'London, UK', detail: '189 participants' },
      { label: 'Singapore', detail: '156 participants' }
    ]
  }
]

function FeatureCard({ feature, index, isMobile }: { feature: typeof features[0], index: number, isMobile?: boolean }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-3 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`w-full ${isMobile ? 'max-w-xs' : 'max-w-2xl'} bg-gradient-to-br ${feature.gradient} rounded-xl md:rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col`}
      >
        {/* Icon and Title - Vertical Layout */}
        <div className="flex flex-col items-center text-center mb-4 md:mb-6">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 mb-3 md:mb-4">
            <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-2xl lg:text-3xl text-white">{feature.subtitle}</h3>
        </div>

        {/* Content Items */}
        <div className="space-y-2.5 md:space-y-3 mb-4 md:mb-6 flex-1">
          {feature.content.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white/80 flex-shrink-0" />
                  <span className="text-white text-xs md:text-sm lg:text-base truncate">{item.label}</span>
                </div>
                <span className="text-white/70 text-[10px] md:text-xs lg:text-sm flex-shrink-0">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="flex items-start gap-2 md:gap-3 justify-center text-center pt-3 md:pt-4 border-t border-white/20">
          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/80 flex-shrink-0 mt-0.5" />
          <p className="text-white/90 text-[11px] md:text-xs lg:text-sm leading-tight">{feature.description}</p>
        </div>
      </motion.div>
    </div>
  )
}

function MacBookScreen({ scrollProgress, isMobile }: { scrollProgress: any, isMobile?: boolean }) {
  const totalFeatures = features.length
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {features.map((feature, index) => {
        // Calculate timing for sequential appearance
        const start = index / totalFeatures
        const fadeInEnd = (index + 0.3) / totalFeatures
        const fadeOutStart = (index + 0.7) / totalFeatures
        const end = (index + 1) / totalFeatures
        
        const opacity = useTransform(
          scrollProgress,
          [start, fadeInEnd, fadeOutStart, end],
          [0, 1, 1, 0]
        )
        
        const y = useTransform(
          scrollProgress,
          [start, fadeInEnd, fadeOutStart, end],
          ['20%', '0%', '0%', '-20%']
        )

        return (
          <motion.div
            key={index}
            style={{ opacity, y }}
            className="absolute inset-0"
          >
            <FeatureCard feature={feature} index={index} isMobile={isMobile} />
          </motion.div>
        )
      })}
    </div>
  )
}

function MacBookMockup({ scrollProgress }: { scrollProgress: any }) {
  return (
    <>
      {/* Desktop MacBook */}
      <div className="relative w-full max-w-6xl mx-auto hidden md:block">
        {/* MacBook Pro Frame */}
        <div className="relative bg-gray-900 rounded-2xl p-2 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-xl overflow-hidden relative" style={{ aspectRatio: '16/10' }}>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-gray-900 rounded-b-2xl z-20" />
            
            {/* Screen Content */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-black">
              <MacBookScreen scrollProgress={scrollProgress} isMobile={false} />
            </div>

            {/* Screen glare effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom notch */}
          <div className="h-0.5 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-full mx-auto mt-1.5 w-1/3" />
        </div>

        {/* MacBook Base */}
        <div className="relative h-1.5 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl -mt-0.5 mx-3" />
        <div className="relative h-0.5 bg-gradient-to-b from-gray-900 to-black rounded-b-lg mx-6" />

        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/50 blur-2xl rounded-full" />
      </div>

      {/* Mobile Phone Mockup */}
      <div className="relative w-full max-w-[320px] mx-auto md:hidden">
        {/* Phone Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-[2.5rem] overflow-hidden relative" style={{ aspectRatio: '9/19.5' }}>
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-8 bg-gray-950 rounded-full z-20 shadow-xl" />
            
            {/* Screen Content */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-black">
              <MacBookScreen scrollProgress={scrollProgress} isMobile={true} />
            </div>

            {/* Screen glare effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Power button */}
        <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l-sm" />
        
        {/* Volume buttons */}
        <div className="absolute left-0 top-28 w-1 h-12 bg-gray-800 rounded-r-sm" />
        <div className="absolute left-0 top-44 w-1 h-12 bg-gray-800 rounded-r-sm" />

        {/* Shadow */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/50 blur-2xl rounded-full" />
      </div>
    </>
  )
}

export function AppleStyleFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Total scroll height - just enough for all features
  const scrollHeight = features.length * 100

  // Calculate opacity - fade out quickly at the very end
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    [1, 1, 0]
  )

  // Calculate translateY - slide up and out at the end
  const y = useTransform(
    scrollYProgress,
    [0, 0.95, 1],
    ['0vh', '0vh', '-20vh']
  )

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight}vh` }} className="relative bg-black pt-16 md:pt-32 pb-0">
      <motion.div 
        style={{ opacity, y }}
        className="sticky top-0 left-0 right-0 min-h-screen flex flex-col items-center justify-center bg-black py-8 md:py-12"
      >
        
        {/* Header */}
        <div className="w-full text-center px-4 md:px-6 mb-6 md:mb-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-3 md:mb-4">
              <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-purple-400" />
              <span className="text-xs md:text-sm text-purple-300">Why Mastry Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 md:mb-4 text-white px-2">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                run amazing hackathons
              </span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-2">
              From event creation to participant management
            </p>
          </motion.div>
        </div>

        {/* Device Mockup */}
        <div className="w-full px-4 md:px-6 flex-1 flex items-center justify-center max-w-5xl mx-auto min-h-0">
          <MacBookMockup scrollProgress={scrollYProgress} />
        </div>
      </motion.div>
    </div>
  )
}
