import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { 
  Code, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  ExternalLink,
  Lightbulb
} from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner@2.0.3'
import { useState } from 'react'

export function IntegrationGuide() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    toast.success('Code copied to clipboard!')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    walletConnect: `import { WalletConnect } from './components/WalletConnect'

// Add anywhere in your component
<WalletConnect />`,

    nftCertificate: `import { NFTCertificate } from './components/NFTCertificate'

// Add to participant dashboard
<NFTCertificate
  hackathonName={hackathon.name}
  participantName={user.name}
  achievement="Participant"
  date={hackathon.completedDate}
  rank={hackathon.rank}
  projectName={hackathon.projectName}
/>`,

    socialShare: `import { SocialShare } from './components/SocialShare'

// Add to hackathon detail page
<SocialShare
  title={hackathon.name}
  description={hackathon.description}
  url={window.location.href}
  hashtags={['Web3', 'Hackathon', hackathon.category]}
/>`,

    achievements: `import { AchievementBadges } from './components/AchievementBadges'

// Create new route in App.tsx
<Route 
  path="/achievements" 
  element={<AchievementBadges />} 
/>

// Or add to dashboard
<AchievementBadges />`,

    calendar: `import { CalendarView } from './components/CalendarView'

// Create new route
<Route 
  path="/calendar" 
  element={<CalendarView />} 
/>`,

    skeletonLoaders: `import { 
  HackathonListSkeleton,
  DashboardStatsSkeleton 
} from './components/SkeletonLoaders'

// Replace loading states
{isLoading ? (
  <HackathonListSkeleton />
) : (
  <HackathonList data={hackathons} />
)}`,

    pageTransition: `import { PageTransition } from './components/PageTransition'

// Wrap your page components
<Route 
  path="/hackathons" 
  element={
    <PageTransition>
      <HackathonList />
    </PageTransition>
  } 
/>`,

    lazyImage: `import { LazyImage } from './components/LazyImage'

// Replace img tags
<LazyImage
  src={hackathon.coverImage}
  alt={hackathon.name}
  className="w-full h-48 object-cover rounded-lg"
  fallbackSrc="/placeholder.jpg"
/>`,

    infiniteScroll: `import { useInfiniteScroll } from './hooks/useInfiniteScroll'

function HackathonList() {
  const [hackathons, setHackathons] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  
  const loadMore = async () => {
    setIsLoading(true)
    // Fetch more hackathons
    const newData = await fetchHackathons(page)
    setHackathons([...hackathons, ...newData])
    setHasMore(newData.length > 0)
    setIsLoading(false)
  }
  
  const loadMoreRef = useInfiniteScroll(
    loadMore,
    hasMore,
    isLoading
  )
  
  return (
    <div>
      {hackathons.map(h => <HackathonCard key={h.id} {...h} />)}
      <div ref={loadMoreRef} className="py-4">
        {isLoading && <Loader />}
      </div>
    </div>
  )
}`,

    pwaSetup: `<!-- Add to your HTML file -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#8b5cf6">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Mastry Hub">`,
  }

  const CodeBlock = ({ code, id }: { code: string; id: string }) => (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => copyCode(code, id)}
      >
        {copiedCode === id ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Integration Guide</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Step-by-step guide to integrate all new features into Mastry Hub
        </p>
      </div>

      <Alert className="mb-6 border-blue-500 bg-blue-50 dark:bg-blue-950">
        <Lightbulb className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          All components are production-ready. Copy the code examples below and paste into your files.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="wallet" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="nft">NFT</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="gamification">Gamification</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Wallet Connect */}
        <TabsContent value="wallet" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h2 className="text-2xl">Web3 Wallet Connection</h2>
              <Badge className="bg-green-500">Already Integrated</Badge>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The WalletConnect component is already integrated in the Navbar. To add it elsewhere:
            </p>

            <CodeBlock code={codeExamples.walletConnect} id="wallet" />

            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>Status:</strong> Already working in production! Just log in to see it.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* NFT Certificates */}
        <TabsContent value="nft" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5" />
              <h2 className="text-2xl">NFT Certificates</h2>
              <Badge>Ready to Integrate</Badge>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add NFT certificates to completed hackathons in the participant dashboard:
            </p>

            <CodeBlock code={codeExamples.nftCertificate} id="nft" />

            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Note:</strong> Currently simulates minting. To enable real blockchain minting, you'll need to deploy a smart contract and integrate it in the mintNFT function.
              </AlertDescription>
            </Alert>
          </Card>
        </TabsContent>

        {/* Social Sharing */}
        <TabsContent value="social" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5" />
              <h2 className="text-2xl">Social Sharing</h2>
              <Badge>Ready to Integrate</Badge>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add social sharing buttons to hackathon detail pages:
            </p>

            <CodeBlock code={codeExamples.socialShare} id="social" />

            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Supported Platforms:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Twitter</Badge>
                <Badge variant="outline">LinkedIn</Badge>
                <Badge variant="outline">Facebook</Badge>
                <Badge variant="outline">Copy Link</Badge>
                <Badge variant="outline">Native Share API</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Gamification */}
        <TabsContent value="gamification" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Achievement Badges</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add to participant dashboard or create a dedicated achievements page:
            </p>
            <CodeBlock code={codeExamples.achievements} id="achievements" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl mb-4">Calendar View</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a new route for the event calendar:
            </p>
            <CodeBlock code={codeExamples.calendar} id="calendar" />
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Skeleton Loaders</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Replace all loading states with beautiful skeleton placeholders:
            </p>
            <CodeBlock code={codeExamples.skeletonLoaders} id="skeleton" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl mb-4">Page Transitions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add smooth animations between route changes:
            </p>
            <CodeBlock code={codeExamples.pageTransition} id="transition" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl mb-4">Lazy Images</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Improve performance by lazy-loading images:
            </p>
            <CodeBlock code={codeExamples.lazyImage} id="lazyimage" />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl mb-4">Infinite Scroll</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Add infinite scroll to hackathon lists:
            </p>
            <CodeBlock code={codeExamples.infiniteScroll} id="infinite" />
          </Card>
        </TabsContent>
      </Tabs>

      {/* PWA Setup */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl mb-4">PWA Setup</h2>
        <Alert className="mb-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700 dark:text-orange-300">
            <strong>Action Required:</strong> Add these meta tags to your HTML file and create app icons.
          </AlertDescription>
        </Alert>

        <CodeBlock code={codeExamples.pwaSetup} id="pwa" />

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="font-semibold mb-2">Create App Icons:</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
            Generate all required icon sizes using this tool:
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://realfavicongenerator.net', '_blank')}
            className="gap-2"
          >
            Open Icon Generator
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </Card>

      {/* Quick Reference */}
      <Card className="p-6 mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
        <h2 className="text-2xl mb-4">Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Already Integrated
            </h3>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Wallet Connect in Navbar</li>
              <li>• PWA Service Worker</li>
              <li>• PWA Install Prompt</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-blue-500" />
              Ready to Integrate
            </h3>
            <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
              <li>• NFT Certificates</li>
              <li>• Social Sharing</li>
              <li>• Achievement Badges</li>
              <li>• Calendar View</li>
              <li>• Skeleton Loaders</li>
              <li>• Page Transitions</li>
              <li>• Lazy Images</li>
              <li>• Infinite Scroll</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Documentation Links */}
      <Card className="p-6 mt-8">
        <h2 className="text-2xl mb-4">Documentation</h2>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open('/NEW_FEATURES.md', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Complete Feature Documentation
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => window.open('/IMPLEMENTATION_SUMMARY.md', '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Implementation Summary
          </Button>
        </div>
      </Card>
    </div>
  )
}
