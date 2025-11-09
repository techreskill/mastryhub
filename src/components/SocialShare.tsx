import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'
import { toast } from 'sonner@2.0.3'
import { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'

interface SocialShareProps {
  title: string
  description: string
  url: string
  hashtags?: string[]
}

export function SocialShare({ title, description, url, hashtags = [] }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareOnTwitter = () => {
    const text = `${title}\n\n${description}`
    const hashtagString = hashtags.length > 0 ? `&hashtags=${hashtags.join(',')}` : ''
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}${hashtagString}`
    window.open(twitterUrl, '_blank', 'width=550,height=420')
  }

  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'width=550,height=420')
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, '_blank', 'width=550,height=420')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (error) {
        // User cancelled share
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Hackathon</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview Card */}
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {hashtags.map((tag) => (
                  <span key={tag} className="text-xs text-purple-600 dark:text-purple-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Share Buttons */}
          <div className="space-y-2">
            <Button
              onClick={shareOnTwitter}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <div className="h-8 w-8 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                <Twitter className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span>Share on Twitter</span>
            </Button>

            <Button
              onClick={shareOnLinkedIn}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <div className="h-8 w-8 rounded-full bg-[#0A66C2] flex items-center justify-center">
                <Linkedin className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span>Share on LinkedIn</span>
            </Button>

            <Button
              onClick={shareOnFacebook}
              variant="outline"
              className="w-full justify-start gap-3 h-12"
            >
              <div className="h-8 w-8 rounded-full bg-[#1877F2] flex items-center justify-center">
                <Facebook className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span>Share on Facebook</span>
            </Button>

            {navigator.share && (
              <Button
                onClick={shareNative}
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                  <Share2 className="h-4 w-4 text-white" />
                </div>
                <span>More Options</span>
              </Button>
            )}
          </div>

          {/* Copy Link */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Or copy link</p>
            <div className="flex gap-2">
              <Input value={url} readOnly className="flex-1" />
              <Button onClick={copyLink} variant="outline" className="gap-2">
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
