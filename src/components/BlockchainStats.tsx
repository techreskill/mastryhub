import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

interface Stat {
  value: string
  label: string
  color: string
}

const stats: Stat[] = [
  { value: '500+', label: 'Active Builders', color: '#8B5CF6' },
  { value: '50+', label: 'Hackathons', color: '#3B82F6' },
  { value: '$1M+', label: 'Prize Pool', color: '#EC4899' },
  { value: '25+', label: 'Countries', color: '#10B981' },
]

export function BlockchainStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let animationFrame: number
    let pulseOffset = 0

    const drawConnections = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)
      
      pulseOffset += 0.02
      const pulse = Math.sin(pulseOffset) * 0.5 + 0.5

      // Calculate positions for 4 nodes in a row
      const spacing = rect.width / 5
      const y = rect.height / 2
      const positions = [
        { x: spacing, y },
        { x: spacing * 2, y },
        { x: spacing * 3, y },
        { x: spacing * 4, y },
      ]

      // Draw connection lines between nodes
      for (let i = 0; i < positions.length - 1; i++) {
        const from = positions[i]
        const to = positions[i + 1]
        
        // Animated flowing line
        const flowProgress = (pulseOffset * 0.5 + i * 0.25) % 1
        
        const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
        gradient.addColorStop(0, `${stats[i].color}20`)
        gradient.addColorStop(Math.max(0, flowProgress - 0.1), `${stats[i].color}20`)
        gradient.addColorStop(flowProgress, `${stats[i].color}`)
        gradient.addColorStop(Math.min(1, flowProgress + 0.1), `${stats[i + 1].color}20`)
        gradient.addColorStop(1, `${stats[i + 1].color}20`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.stroke()

        // Draw data packet moving along line
        const packetX = from.x + (to.x - from.x) * flowProgress
        const packetY = from.y + (to.y - from.y) * flowProgress
        
        ctx.fillStyle = stats[i].color
        ctx.shadowBlur = 10
        ctx.shadowColor = stats[i].color
        ctx.beginPath()
        ctx.arc(packetX, packetY, 3, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Draw hexagon nodes
      positions.forEach((pos, index) => {
        const size = 8 + pulse * 2
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 3)
        glowGradient.addColorStop(0, `${stats[index].color}60`)
        glowGradient.addColorStop(0.5, `${stats[index].color}20`)
        glowGradient.addColorStop(1, `${stats[index].color}00`)
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, size * 3, 0, Math.PI * 2)
        ctx.fill()

        // Hexagon
        drawHexagon(ctx, pos.x, pos.y, size, stats[index].color)
      })

      animationFrame = requestAnimationFrame(drawConnections)
    }

    drawConnections()

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const drawHexagon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string
  ) => {
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6
      const px = x + size * Math.cos(angle)
      const py = y + size * Math.sin(angle)
      if (i === 0) {
        ctx.moveTo(px, py)
      } else {
        ctx.lineTo(px, py)
      }
    }
    ctx.closePath()
    
    // Fill
    ctx.fillStyle = color
    ctx.fill()
    
    // Stroke
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return (
    <section className="border-y border-gray-800 bg-black/50 backdrop-blur-sm relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#8B5CF610_12%,transparent_12.5%,transparent_87%,#8B5CF610_87.5%,#8B5CF610),linear-gradient(150deg,#8B5CF610_12%,transparent_12.5%,transparent_87%,#8B5CF610_87.5%,#8B5CF610),linear-gradient(30deg,#8B5CF610_12%,transparent_12.5%,transparent_87%,#8B5CF610_87.5%,#8B5CF610),linear-gradient(150deg,#8B5CF610_12%,transparent_12.5%,transparent_87%,#8B5CF610_87.5%,#8B5CF610)] bg-[length:80px_140px] bg-[position:0_0,0_0,40px_70px,40px_70px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        {/* Connection lines canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
          style={{ width: '100%', height: '100%' }}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 relative">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative"
            >
              {/* Hexagon container */}
              <div className="relative group">
                {/* Hexagon background */}
                <div 
                  className="absolute inset-0 -inset-y-8 -inset-x-4"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}15, transparent)`,
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                    filter: 'blur(20px)',
                  }}
                />
                
                {/* Hexagon border */}
                <div 
                  className="absolute inset-0 -inset-y-6 -inset-x-2 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`,
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
                  }}
                />

                {/* Content */}
                <div className="relative text-center py-4 md:py-6">
                  {/* Stat value */}
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5, type: 'spring' }}
                    className="text-3xl md:text-4xl lg:text-5xl mb-1 md:mb-2 relative"
                    style={{
                      background: `linear-gradient(135deg, ${stat.color}, ${stat.color}CC)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {stat.value}
                  </motion.div>

                  {/* Label */}
                  <div className="text-gray-400 text-xs md:text-sm lg:text-base px-1 md:px-2">
                    {stat.label}
                  </div>

                  {/* Animated dot */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                    className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 w-1.5 md:w-2 h-1.5 md:h-2 rounded-full"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blockchain hash effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-6 md:mt-8 text-center"
        >
          <div className="inline-flex items-center gap-1.5 md:gap-2 bg-gray-900/50 border border-gray-800 rounded-full px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-xs text-gray-500 font-mono">
            <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="hidden sm:inline">Block #</span>
            <span className="text-purple-400">0x{Math.floor(Date.now() / 1000).toString(16)}</span>
            <span className="text-gray-600 hidden sm:inline">•</span>
            <span className="text-blue-400 hidden sm:inline">Verified Network</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
