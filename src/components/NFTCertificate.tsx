import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Award, Download, Share2, Loader2, CheckCircle, ExternalLink } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { motion } from 'motion/react'
import { Badge } from './ui/badge'

interface NFTCertificateProps {
  hackathonName: string
  participantName: string
  achievement: string
  date: string
  rank?: number
  projectName?: string
}

export function NFTCertificate({
  hackathonName,
  participantName,
  achievement,
  date,
  rank,
  projectName,
}: NFTCertificateProps) {
  const [isMinting, setIsMinting] = useState(false)
  const [isMinted, setIsMinted] = useState(false)
  const [tokenId, setTokenId] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const mintNFT = async () => {
    if (!window.ethereum) {
      toast.error('Wallet not connected', {
        description: 'Please connect your wallet to mint NFT certificate',
      })
      return
    }

    try {
      setIsMinting(true)

      // Get connected account
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length === 0) {
        toast.error('No wallet connected')
        return
      }

      // Create certificate metadata
      const metadata = {
        name: `${hackathonName} - ${achievement}`,
        description: `Certificate of ${achievement} awarded to ${participantName} for participation in ${hackathonName}`,
        image: await generateCertificateImage(),
        attributes: [
          { trait_type: 'Event', value: hackathonName },
          { trait_type: 'Achievement', value: achievement },
          { trait_type: 'Participant', value: participantName },
          { trait_type: 'Date', value: date },
          ...(rank ? [{ trait_type: 'Rank', value: rank.toString() }] : []),
          ...(projectName ? [{ trait_type: 'Project', value: projectName }] : []),
        ],
      }

      // TODO: In production, this would:
      // 1. Upload metadata to IPFS
      // 2. Interact with smart contract to mint NFT
      // 3. Return transaction hash and token ID

      // Simulating blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock transaction data
      const mockTokenId = Math.floor(Math.random() * 10000).toString()
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 64)

      setTokenId(mockTokenId)
      setTransactionHash(mockTxHash)
      setIsMinted(true)

      toast.success('NFT Certificate Minted!', {
        description: `Token ID: ${mockTokenId}`,
      })
    } catch (error: any) {
      console.error('Error minting NFT:', error)
      toast.error('Minting Failed', {
        description: error.message || 'Failed to mint NFT certificate',
      })
    } finally {
      setIsMinting(false)
    }
  }

  const generateCertificateImage = async (): Promise<string> => {
    // In production, this would generate an actual certificate image
    // For now, return a placeholder
    return 'ipfs://QmPlaceholderCertificateImage'
  }

  const downloadCertificate = () => {
    // Create a canvas and draw certificate
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 1200, 800)
      gradient.addColorStop(0, '#1e1b4b')
      gradient.addColorStop(1, '#312e81')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, 1200, 800)

      // Border
      ctx.strokeStyle = '#fbbf24'
      ctx.lineWidth = 8
      ctx.strokeRect(40, 40, 1120, 720)

      // Title
      ctx.fillStyle = '#fbbf24'
      ctx.font = 'bold 60px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 600, 150)

      // Hackathon name
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 40px Arial'
      ctx.fillText(hackathonName, 600, 250)

      // Achievement text
      ctx.font = '30px Arial'
      ctx.fillText(`This certifies that`, 600, 330)

      // Participant name
      ctx.font = 'bold 50px Arial'
      ctx.fillStyle = '#60a5fa'
      ctx.fillText(participantName, 600, 410)

      // Achievement
      ctx.fillStyle = '#ffffff'
      ctx.font = '28px Arial'
      ctx.fillText(`has achieved ${achievement}`, 600, 480)

      if (projectName) {
        ctx.fillText(`for the project: ${projectName}`, 600, 530)
      }

      if (rank) {
        ctx.fillStyle = '#fbbf24'
        ctx.font = 'bold 35px Arial'
        ctx.fillText(`Rank: ${rank}`, 600, rank && projectName ? 590 : 560)
      }

      // Date
      ctx.fillStyle = '#9ca3af'
      ctx.font = '22px Arial'
      ctx.fillText(date, 600, 680)

      // NFT info
      if (isMinted && tokenId) {
        ctx.fillStyle = '#10b981'
        ctx.font = 'bold 18px Arial'
        ctx.fillText(`NFT Token ID: ${tokenId}`, 600, 730)
      }
    }

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${hackathonName}-certificate.png`
        a.click()
        URL.revokeObjectURL(url)
        toast.success('Certificate downloaded!')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Award className="h-4 w-4" />
          View Certificate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>NFT Certificate</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Preview */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-4 border-yellow-500/50">
              {isMinted && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-green-500 gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Minted
                  </Badge>
                </div>
              )}
              
              <div className="p-8 md:p-12 text-center space-y-6">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl text-yellow-400 mb-2">
                    CERTIFICATE OF ACHIEVEMENT
                  </h2>
                  <div className="h-1 w-32 bg-yellow-400 mx-auto rounded-full" />
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-xl text-white/80">{hackathonName}</p>
                  
                  <div>
                    <p className="text-sm text-white/60 mb-2">This certifies that</p>
                    <p className="text-3xl md:text-4xl text-blue-300">{participantName}</p>
                  </div>

                  <p className="text-lg text-white/80">
                    has achieved <span className="text-yellow-300">{achievement}</span>
                  </p>

                  {projectName && (
                    <p className="text-md text-white/70">
                      for the project: <span className="text-purple-300">{projectName}</span>
                    </p>
                  )}

                  {rank && (
                    <div className="inline-block">
                      <Badge className="bg-yellow-500 text-black text-lg px-4 py-2">
                        Rank: {rank}
                      </Badge>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-sm text-white/50">{date}</p>
                  {isMinted && tokenId && (
                    <p className="text-xs text-green-400 mt-2 font-mono">
                      Token ID: {tokenId}
                    </p>
                  )}
                </motion.div>
              </div>

              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-yellow-500/50" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-yellow-500/50" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-yellow-500/50" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-yellow-500/50" />
            </Card>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3">
            {!isMinted ? (
              <Button
                onClick={mintNFT}
                disabled={isMinting}
                className="w-full gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isMinting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Minting NFT...
                  </>
                ) : (
                  <>
                    <Award className="h-4 w-4" />
                    Mint as NFT Certificate
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => window.open(`https://testnets.opensea.io/assets/token/${tokenId}`, '_blank')}
                className="w-full gap-2 bg-green-600 hover:bg-green-700"
              >
                <ExternalLink className="h-4 w-4" />
                View on OpenSea
              </Button>
            )}

            <div className="flex gap-2">
              <Button
                onClick={downloadCertificate}
                variant="outline"
                className="flex-1 gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Info */}
          <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>About NFT Certificates:</strong>
              <br />
              Your certificate will be minted as an NFT on the blockchain, providing permanent, verifiable proof of your achievement. NFTs can be viewed in your wallet and on platforms like OpenSea.
            </p>
          </Card>

          {transactionHash && (
            <Card className="p-3 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <p className="text-xs text-green-700 dark:text-green-300">
                <strong>Transaction Hash:</strong>
                <br />
                <span className="font-mono break-all">{transactionHash}</span>
              </p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
