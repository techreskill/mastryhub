import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { 
  Smartphone, 
  Wallet, 
  Award, 
  Share2, 
  Trophy, 
  Calendar,
  Zap,
  Image as ImageIcon,
  Infinity,
  Sparkles,
  CheckCircle
} from 'lucide-react'
import { motion } from 'motion/react'
import { WalletConnect } from './WalletConnect'
import { NFTCertificate } from './NFTCertificate'
import { SocialShare } from './SocialShare'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function FeaturesShowcase() {
  const features = [
    {
      category: 'PWA',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      items: [
        { name: 'Installable App', status: 'active', description: 'Install as native app on any device' },
        { name: 'Offline Support', status: 'active', description: 'Access cached content without internet' },
        { name: 'Push Notifications', status: 'ready', description: 'Real-time updates (setup required)' },
        { name: 'Background Sync', status: 'active', description: 'Auto-sync when back online' },
      ]
    },
    {
      category: 'Web3',
      icon: Wallet,
      color: 'from-purple-500 to-pink-500',
      items: [
        { name: 'Wallet Connection', status: 'active', description: 'Connect MetaMask and Web3 wallets' },
        { name: 'NFT Certificates', status: 'active', description: 'Mint blockchain certificates' },
        { name: 'Balance Display', status: 'active', description: 'View ETH balance in real-time' },
        { name: 'Chain Detection', status: 'active', description: 'Auto-detect network changes' },
      ]
    },
    {
      category: 'Social',
      icon: Share2,
      color: 'from-orange-500 to-red-500',
      items: [
        { name: 'Twitter Sharing', status: 'active', description: 'Share to Twitter with hashtags' },
        { name: 'LinkedIn Sharing', status: 'active', description: 'Professional network sharing' },
        { name: 'Facebook Sharing', status: 'active', description: 'Reach wider audience' },
        { name: 'Copy Link', status: 'active', description: 'Quick clipboard copy' },
      ]
    },
    {
      category: 'Gamification',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-500',
      items: [
        { name: 'Achievement Badges', status: 'active', description: '12 unique achievements to unlock' },
        { name: 'Progress Tracking', status: 'active', description: 'Track towards each goal' },
        { name: 'Rarity System', status: 'active', description: '4 tiers: Common to Legendary' },
        { name: 'Achievement Details', status: 'active', description: 'View unlock dates and tips' },
      ]
    },
    {
      category: 'Calendar',
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      items: [
        { name: 'Monthly View', status: 'active', description: 'Visual calendar grid' },
        { name: 'Event Indicators', status: 'active', description: 'Color-coded event dots' },
        { name: 'Event Details', status: 'active', description: 'Click dates for full info' },
        { name: 'Upcoming List', status: 'active', description: 'Next 3 events preview' },
      ]
    },
    {
      category: 'Performance',
      icon: Zap,
      color: 'from-indigo-500 to-purple-500',
      items: [
        { name: 'Skeleton Loaders', status: 'active', description: 'Content-shaped placeholders' },
        { name: 'Page Transitions', status: 'active', description: 'Smooth route animations' },
        { name: 'Lazy Loading', status: 'active', description: 'Load images on demand' },
        { name: 'Infinite Scroll', status: 'ready', description: 'Auto-load more content' },
      ]
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-sm text-purple-600 dark:text-purple-400">New Features</span>
        </div>
        <h1 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Platform Features
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore all the powerful features that make Mastry Hub the ultimate Web3 hackathon platform
        </p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demo">Try Features</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl mb-3">{feature.category}</h3>
                  <div className="space-y-2">
                    {feature.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-2">
                        <CheckCircle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          item.status === 'active' ? 'text-green-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{item.name}</span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                item.status === 'active' 
                                  ? 'border-green-500 text-green-500' 
                                  : 'border-blue-500 text-blue-500'
                              }`}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Demo Tab */}
        <TabsContent value="demo" className="space-y-6">
          <Card className="p-8">
            <h2 className="text-2xl mb-6">Try Features Live</h2>
            
            <div className="space-y-8">
              {/* Wallet Connect Demo */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg">Web3 Wallet Connection</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Connect your MetaMask wallet to access blockchain features
                </p>
                <WalletConnect />
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              {/* NFT Certificate Demo */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <h3 className="text-lg">NFT Certificate</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View and mint blockchain-based achievement certificates
                </p>
                <NFTCertificate
                  hackathonName="Web3 Innovation Hackathon 2024"
                  participantName="Demo User"
                  achievement="Demo Achievement"
                  date="November 9, 2024"
                  rank={1}
                  projectName="Demo Project"
                />
              </div>

              <div className="h-px bg-gray-200 dark:bg-gray-800" />

              {/* Social Share Demo */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Share2 className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg">Social Sharing</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share hackathons on Twitter, LinkedIn, and Facebook
                </p>
                <SocialShare
                  title="Mastry Hub - Web3 Hackathon Platform"
                  description="Join the ultimate Web3 hackathon platform with NFT certificates, achievement badges, and more!"
                  url="https://mastryhub.com"
                  hashtags={['Web3', 'Hackathon', 'Blockchain']}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
              <div className="text-3xl mb-2">24</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Features</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <div className="text-3xl mb-2">20</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Features</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <div className="text-3xl mb-2">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Ready (Setup Required)</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
              <div className="text-3xl mb-2">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Achievement Badges</div>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-xl mb-4">Feature Categories</h3>
            <div className="space-y-4">
              {features.map((feature) => {
                const activeCount = feature.items.filter(i => i.status === 'active').length
                const percentage = (activeCount / feature.items.length) * 100
                return (
                  <div key={feature.category}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <feature.icon className="h-4 w-4" />
                        <span className="text-sm">{feature.category}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {activeCount}/{feature.items.length}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${feature.color}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Roadmap Tab */}
        <TabsContent value="roadmap" className="space-y-6">
          <Card className="p-8">
            <h3 className="text-2xl mb-6">Feature Roadmap</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phase 1: Foundation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                  </div>
                </div>
                <ul className="ml-14 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    PWA Infrastructure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Web3 Wallet Integration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Performance Optimizations
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phase 2: Engagement</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                  </div>
                </div>
                <ul className="ml-14 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Achievement System
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Social Sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-blue-500" />
                    Real-time Notifications
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phase 3: Advanced Features</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Planned</p>
                  </div>
                </div>
                <ul className="ml-14 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Smart Contract Deployment</li>
                  <li>• IPFS Integration</li>
                  <li>• Advanced Analytics</li>
                  <li>• AI-Powered Features</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
