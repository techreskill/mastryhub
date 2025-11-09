import { motion } from 'motion/react'
import { Card, CardContent } from './ui/card'
import { Award, Building2, Users2, Handshake, Trophy, Globe2 } from 'lucide-react'

const partnerships = [
  {
    name: 'Polygon',
    icon: Building2,
    description: 'Organized developer events and training sessions to foster innovation in the Polygon ecosystem.',
    gradient: 'from-purple-500 to-purple-700',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-400'
  },
  {
    name: 'Coinbase',
    icon: Award,
    description: 'Supported hackathons and educational initiatives to expand Web3 adoption.',
    gradient: 'from-blue-500 to-blue-700',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400'
  },
  {
    name: 'WazirX',
    icon: Users2,
    description: 'Collaborated on community-building activities to promote blockchain and cryptocurrency.',
    gradient: 'from-cyan-500 to-cyan-700',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400'
  },
  {
    name: 'CoinDCX',
    icon: Handshake,
    description: 'Facilitated workshops and meetups to upskill developers and build blockchain projects.',
    gradient: 'from-indigo-500 to-indigo-700',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400'
  },
  {
    name: 'HackOn',
    icon: Trophy,
    description: 'Successfully hosted multiple hackathons with thousands of participants.',
    gradient: 'from-pink-500 to-pink-700',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-400'
  },
  {
    name: 'Web3 Community Meetups',
    icon: Globe2,
    description: 'Partnered with various Web3 brands to organize large-scale networking and knowledge-sharing events.',
    gradient: 'from-orange-500 to-orange-700',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400'
  }
]

export function Web3Expertise() {
  return (
    <section className="py-16 md:py-24 lg:py-32 relative bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Award className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">Trusted by Industry Leaders</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-6xl mb-4 md:mb-6 px-4">
            Our{' '}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Web3 Expertise
            </span>
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-4">
            We have partnered with some of the biggest names in the Web3 ecosystem to deliver 
            world-class events and training programs.
          </p>
        </motion.div>

        {/* Partnership Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {partnerships.map((partner, index) => {
            const Icon = partner.icon
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full bg-gradient-to-br from-gray-900/50 to-gray-950/50 border-gray-800 hover:border-gray-700 transition-all duration-300 group hover:scale-[1.02]">
                  <CardContent className="p-6 md:p-8">
                    {/* Icon */}
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl ${partner.iconBg} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-7 w-7 md:h-8 md:w-8 ${partner.iconColor}`} />
                    </div>

                    {/* Partner Name */}
                    <h3 className={`text-xl md:text-2xl mb-3 md:mb-4 bg-gradient-to-r ${partner.gradient} bg-clip-text text-transparent`}>
                      {partner.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                      {partner.description}
                    </p>

                    {/* Decorative gradient line */}
                    <div className={`mt-4 md:mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${partner.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm md:text-base text-gray-400">Events Organized</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  10,000+
                </div>
                <div className="text-sm md:text-base text-gray-400">Participants Trained</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  25+
                </div>
                <div className="text-sm md:text-base text-gray-400">Partner Organizations</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
