import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Rocket, Users, Trophy, Calendar, Code, Globe2, Sparkles, ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { Globe } from './Globe'
import { BlockchainStats } from './BlockchainStats'
import { AppleStyleFeatures } from './AppleStyleFeatures'
import { Web3Expertise } from './Web3Expertise'
import { CookieConsent } from './CookieConsent'
import { motion } from 'motion/react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-12 text-center lg:text-left"
            >
              {/* Small Globe for Mobile Only */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="lg:hidden relative h-[200px] w-[200px] mx-auto mb-4"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-[90%] h-[90%] bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute w-[75%] h-[75%] bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full blur-xl" />
                </div>
                <Globe />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-5xl lg:text-6xl leading-tight"
              >
                Where Web3{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Innovators
                </span>{' '}
                Connect
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base md:text-lg text-gray-400 leading-relaxed"
              >
                Build the future of blockchain, Bitcoin, and decentralized technologies with global hackathons and collaborative innovation.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex gap-3 md:gap-4 flex-col sm:flex-row justify-center lg:justify-start"
              >
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg group"
                  >
                    <span className="text-white">Get Started Free</span>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/hackathons" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto bg-white border-white text-gray-900 hover:bg-gray-100 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg"
                  >
                    <span className="text-gray-900">Explore Events</span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="pt-2 md:pt-4 flex justify-center lg:justify-start"
              >
                <Link to="/host-hackathon">
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-white hover:bg-purple-500/20 border border-purple-400/50 hover:border-purple-400 px-4 md:px-6 py-4 md:py-5 group text-sm md:text-base"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    <span>Want to host a hackathon?</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center gap-4 md:gap-8 pt-6 md:pt-8 pb-12 md:pb-16 text-xs md:text-sm text-gray-400 flex-wrap justify-center lg:justify-start"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Global community</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>$1M+ in prizes</span>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right - Globe (Hidden on mobile) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden lg:block relative h-[500px] lg:h-[600px]"
            >
              {/* Enhanced multi-layer glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[85%] h-[85%] bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute w-[70%] h-[70%] bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full blur-2xl" />
                <div className="absolute w-[60%] h-[60%] bg-gradient-to-tl from-purple-400/30 to-blue-400/30 rounded-full blur-xl" />
              </div>
              <Globe />
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar - Blockchain Style */}
      <BlockchainStats />

      {/* Apple-Style Features Section */}
      <AppleStyleFeatures />

      {/* Web3 Expertise Section */}
      <Web3Expertise />

      {/* How It Works */}
      <section className="py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-6xl mb-4 md:mb-6 px-4">
              Get started in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                three simple steps
              </span>
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-400 px-4">
              Join thousands of innovators building the future of Web3
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up in seconds with email or Google. Choose your role as a participant or organizer.',
                gradient: 'from-purple-500/20 to-purple-500/10',
                hoverGradient: 'from-purple-500/40 to-purple-500/20'
              },
              {
                step: '02',
                title: 'Join or Create Events',
                description: 'Browse upcoming hackathons and register, or create your own event with our powerful tools.',
                gradient: 'from-blue-500/20 to-blue-500/10',
                hoverGradient: 'from-blue-500/40 to-blue-500/20'
              },
              {
                step: '03',
                title: 'Build & Collaborate',
                description: 'Connect with mentors, collaborate with teammates, and build innovative Web3 solutions.',
                gradient: 'from-pink-500/20 to-pink-500/10',
                hoverGradient: 'from-pink-500/40 to-pink-500/20'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex gap-4 md:gap-6 lg:gap-8 items-start group"
              >
                <div className={`text-4xl md:text-6xl lg:text-8xl bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent group-hover:${item.hoverGradient} transition-all duration-300 flex-shrink-0`}>
                  {item.step}
                </div>
                <div className="flex-1 pt-1 md:pt-2 lg:pt-4">
                  <h3 className="text-xl md:text-2xl lg:text-4xl mb-2 md:mb-3 lg:mb-4 text-white">{item.title}</h3>
                  <p className="text-sm md:text-base lg:text-xl text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-pink-600/10" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 border border-gray-800 rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl md:rounded-2xl mb-6 md:mb-8 rotate-3 hover:rotate-0 transition-transform duration-300">
                <Rocket className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-6xl mb-4 md:mb-6">
                Ready to build the
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  {' '}future of Web3?
                </span>
              </h2>
              
              <p className="text-sm md:text-base lg:text-xl text-gray-400 mb-8 md:mb-10 max-w-2xl mx-auto">
                Join Mastry Hub today and connect with a global community of innovators, 
                builders, and visionaries shaping the decentralized future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 md:px-10 py-5 md:py-7 text-base md:text-lg group"
                  >
                    <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Start Building Now
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/host-hackathon" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full sm:w-auto border-gray-600 text-white hover:bg-white/10 hover:text-white hover:border-gray-500 px-8 md:px-10 py-5 md:py-7 text-base md:text-lg group"
                  >
                    <Rocket className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Host a Hackathon
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
                No credit card required • Join 500+ builders
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/50 backdrop-blur-sm py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-gray-400 text-sm md:text-base">
              Empowering Web3 Innovation
            </div>
            <div className="flex items-center gap-6">
              <Link to="/past-events" className="text-gray-400 hover:text-purple-400 transition-colors text-sm md:text-base">
                Past Events
              </Link>
              <Link to="/hackathons" className="text-gray-400 hover:text-purple-400 transition-colors text-sm md:text-base">
                Hackathons
              </Link>
            </div>
            <div className="text-gray-500 text-xs md:text-sm">
              © 2025 Mastry Hub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  )
}
