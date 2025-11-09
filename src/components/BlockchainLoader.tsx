import { motion } from 'motion/react'
import { Loader2 } from 'lucide-react'

interface BlockchainLoaderProps {
  message?: string
  fullScreen?: boolean
}

export function BlockchainLoader({ message = 'Loading...', fullScreen = true }: BlockchainLoaderProps) {
  const containerClass = fullScreen 
    ? 'min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900'
    : 'flex items-center justify-center py-20 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl'
  
  const textColorClass = fullScreen ? 'text-white' : 'text-gray-900'
  const subtextColorClass = fullScreen ? 'text-gray-400' : 'text-gray-600'

  return (
    <div className={containerClass}>
      <div className="text-center">
        {/* Blockchain Animation */}
        <div className="relative w-80 h-32 mb-8 mx-auto">
          {/* Block 1 */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              {/* Block */}
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(139, 92, 246, 0.5)',
                    '0 0 40px rgba(139, 92, 246, 0.8)',
                    '0 0 20px rgba(139, 92, 246, 0.5)',
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg border-2 border-purple-400 flex items-center justify-center"
              >
                <div className="text-white text-xs">Block</div>
              </motion.div>
              {/* Hash indicator */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-500 h-1 w-12 rounded-full"
              />
            </div>
          </motion.div>

          {/* Connection Line 1 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="absolute left-20 top-1/2 -translate-y-1/2 origin-left"
          >
            <div className="relative w-20 h-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500" />
              <motion.div
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"
              />
            </div>
          </motion.div>

          {/* Block 2 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                    '0 0 40px rgba(59, 130, 246, 0.8)',
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg border-2 border-blue-400 flex items-center justify-center"
              >
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-blue-500 h-1 w-12 rounded-full"
              />
            </div>
          </motion.div>

          {/* Connection Line 2 */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 origin-right"
          >
            <div className="relative w-20 h-0.5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <motion.div
                animate={{ x: [0, 80, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear", delay: 0.4 }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"
              />
            </div>
          </motion.div>

          {/* Block 3 */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                    '0 0 40px rgba(6, 182, 212, 0.8)',
                    '0 0 20px rgba(6, 182, 212, 0.5)',
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-cyan-800 rounded-lg border-2 border-cyan-400 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="text-white text-xs"
                >
                  ⛓
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: 1 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-cyan-500 h-1 w-12 rounded-full"
              />
            </div>
          </motion.div>

          {/* Particle Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
              }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut"
              }}
              className="absolute left-1/2 top-1/2 w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${40 + i * 8}%`,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className={`text-2xl ${textColorClass}`}>
            {message}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
              className="w-2 h-2 bg-blue-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
              className="w-2 h-2 bg-cyan-400 rounded-full"
            />
          </div>
          <p className={`text-sm ${subtextColorClass}`}>
            Mining blocks and validating data...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 w-64 mx-auto"
        >
          <div className={`h-2 ${fullScreen ? 'bg-gray-800' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
