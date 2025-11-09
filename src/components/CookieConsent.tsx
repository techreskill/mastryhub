import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { X, Cookie } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setIsVisible(false)
  }

  const handleAcceptMandatory = () => {
    localStorage.setItem('cookie-consent', 'mandatory')
    setIsVisible(false)
  }

  const handleClose = () => {
    // Treat close as accepting mandatory only
    localStorage.setItem('cookie-consent', 'mandatory')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black/95 border border-gray-800 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-blue-600/5 to-purple-600/5 animate-pulse" style={{ animationDuration: '3s' }} />
              
              <div className="relative p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <Cookie className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl text-white mb-2">
                      We value your privacy
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                      We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                      By clicking "Accept All", you consent to our use of cookies.{' '}
                      <a href="#" className="text-purple-400 hover:text-purple-300 underline transition-colors">
                        Learn more
                      </a>
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      onClick={handleAcceptMandatory}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-white/10 hover:text-white hover:border-gray-600 whitespace-nowrap transition-all"
                    >
                      Mandatory Only
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 whitespace-nowrap shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all"
                    >
                      Accept All
                    </Button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
