import { useEffect, useRef, useState } from 'react'
import { Users } from 'lucide-react'

interface Point {
  x: number
  y: number
  z: number
  lat: number
  lon: number
}

interface City {
  name: string
  lat: number
  lon: number
  color: string
  users: number
}

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef<number>()
  const pulseRef = useRef(0)

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

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(rect.width, rect.height) * 0.35

    // Cities with user communities
    const cities: City[] = [
      { name: 'San Francisco', lat: 37.7749, lon: -122.4194, color: '#8B5CF6', users: 85 },
      { name: 'New York', lat: 40.7128, lon: -74.0060, color: '#3B82F6', users: 72 },
      { name: 'London', lat: 51.5074, lon: -0.1278, color: '#EC4899', users: 68 },
      { name: 'Berlin', lat: 52.5200, lon: 13.4050, color: '#10B981', users: 54 },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, color: '#F59E0B', users: 91 },
      { name: 'Singapore', lat: 1.3521, lon: 103.8198, color: '#06B6D4', users: 63 },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093, color: '#8B5CF6', users: 47 },
      { name: 'São Paulo', lat: -23.5505, lon: -46.6333, color: '#3B82F6', users: 56 },
      { name: 'Dubai', lat: 25.2048, lon: 55.2708, color: '#EC4899', users: 42 },
      { name: 'Toronto', lat: 43.6532, lon: -79.3832, color: '#10B981', users: 51 },
    ]

    // Simplified country/continent borders (lat, lon pairs)
    const countryBorders = [
      // North America outline
      { name: 'North America', coords: [
        [71, -156], [70, -141], [69, -137], [60, -141], [58, -137], [54, -130], [49, -123], [48, -123], [45, -74], [47, -53], [52, -56], [60, -65], [65, -62], [70, -70], [72, -80], [74, -95], [75, -120], [73, -140], [71, -156]
      ]},
      // South America outline
      { name: 'South America', coords: [
        [12, -72], [11, -61], [5, -52], [0, -51], [-5, -35], [-23, -43], [-33, -53], [-41, -65], [-47, -70], [-54, -68], [-55, -67], [-53, -70], [-33, -71], [-18, -70], [-5, -80], [0, -79], [9, -79], [12, -72]
      ]},
      // Europe outline
      { name: 'Europe', coords: [
        [71, 26], [70, 59], [69, 33], [60, 25], [60, 5], [55, -5], [52, -5], [50, 2], [43, -8], [36, -5], [36, 12], [40, 20], [42, 43], [45, 40], [48, 30], [55, 38], [60, 50], [65, 40], [71, 26]
      ]},
      // Africa outline
      { name: 'Africa', coords: [
        [37, -6], [35, 10], [32, 32], [30, 35], [15, 43], [12, 43], [5, 40], [-5, 40], [-10, 33], [-15, 35], [-20, 35], [-25, 32], [-30, 28], [-33, 27], [-34, 19], [-28, 16], [-22, 14], [-15, 12], [-5, 10], [5, 9], [10, 15], [15, 20], [20, 33], [30, 32], [35, 32], [37, 10], [37, -6]
      ]},
      // Asia outline
      { name: 'Asia', coords: [
        [77, 104], [73, 80], [70, 73], [66, 40], [43, 48], [40, 60], [36, 58], [25, 57], [20, 72], [10, 100], [1, 104], [-10, 110], [-8, 123], [1, 125], [8, 140], [20, 136], [35, 138], [42, 143], [46, 142], [51, 156], [60, 165], [65, 170], [70, 180], [73, 180], [77, 104]
      ]},
      // Australia outline
      { name: 'Australia', coords: [
        [-10, 142], [-11, 130], [-20, 114], [-26, 113], [-34, 115], [-35, 117], [-38, 140], [-39, 145], [-43, 147], [-39, 148], [-34, 151], [-28, 153], [-20, 149], [-15, 145], [-10, 142]
      ]},
      // India subcontinent
      { name: 'India', coords: [
        [35, 74], [30, 70], [23, 68], [20, 70], [16, 73], [10, 77], [8, 77], [8, 92], [13, 97], [20, 88], [22, 88], [26, 83], [28, 78], [30, 78], [32, 75], [35, 74]
      ]},
      // Japan
      { name: 'Japan', coords: [
        [45, 142], [43, 144], [41, 140], [38, 140], [35, 136], [34, 136], [33, 130], [31, 131], [33, 135], [35, 140], [38, 142], [42, 145], [45, 142]
      ]},
      // UK
      { name: 'UK', coords: [
        [59, -3], [57, -7], [55, -6], [52, -5], [50, -5], [50, 1], [51, 1], [53, 0], [55, -2], [57, -2], [59, -3]
      ]},
      // Scandinavia
      { name: 'Scandinavia', coords: [
        [71, 26], [70, 31], [68, 29], [65, 24], [62, 17], [60, 11], [58, 11], [56, 12], [58, 18], [60, 25], [65, 28], [68, 31], [71, 26]
      ]},
      // China
      { name: 'China', coords: [
        [53, 124], [50, 119], [46, 124], [42, 131], [40, 124], [35, 107], [32, 104], [28, 102], [23, 100], [20, 110], [23, 116], [28, 122], [35, 125], [40, 127], [45, 135], [48, 134], [53, 124]
      ]},
      // Brazil
      { name: 'Brazil', coords: [
        [5, -60], [2, -52], [-5, -35], [-10, -36], [-15, -39], [-20, -40], [-23, -44], [-28, -48], [-33, -53], [-30, -57], [-25, -54], [-20, -50], [-10, -50], [-5, -55], [0, -60], [5, -60]
      ]},
      // Greenland
      { name: 'Greenland', coords: [
        [83, -35], [81, -30], [78, -18], [76, -18], [70, -22], [66, -35], [60, -43], [60, -51], [63, -50], [68, -53], [72, -55], [76, -68], [79, -70], [81, -60], [83, -45], [83, -35]
      ]},
      // New Zealand
      { name: 'New Zealand', coords: [
        [-34, 172], [-37, 174], [-41, 174], [-43, 171], [-46, 167], [-47, 168], [-45, 170], [-41, 173], [-38, 178], [-35, 174], [-34, 172]
      ]},
      // Madagascar
      { name: 'Madagascar', coords: [
        [-12, 49], [-14, 50], [-19, 47], [-23, 44], [-25, 45], [-23, 48], [-19, 49], [-15, 50], [-12, 49]
      ]},
      // Italy
      { name: 'Italy', coords: [
        [47, 12], [45, 7], [44, 8], [41, 9], [38, 16], [37, 15], [40, 18], [41, 15], [43, 13], [45, 11], [47, 12]
      ]},
      // Iberian Peninsula (Spain/Portugal)
      { name: 'Iberia', coords: [
        [43, -8], [42, -9], [39, -9], [37, -7], [36, -6], [36, 0], [38, 0], [40, 3], [43, -2], [43, -8]
      ]},
    ]

    // Convert country borders to 3D points
    const countryBorder3D = countryBorders.map(country => ({
      name: country.name,
      points: country.coords.map(([lat, lon]) => {
        const phi = (lat * Math.PI) / 180
        const theta = (lon * Math.PI) / 180
        return {
          x: radius * Math.cos(phi) * Math.cos(theta),
          y: radius * Math.cos(phi) * Math.sin(theta),
          z: radius * Math.sin(phi),
          lat,
          lon
        }
      })
    }))

    // Generate Earth-like globe mesh
    const globePoints: Point[] = []
    const latLines = 36
    const lonLines = 72

    for (let lat = -90; lat <= 90; lat += 180 / latLines) {
      for (let lon = -180; lon <= 180; lon += 360 / lonLines) {
        const phi = (lat * Math.PI) / 180
        const theta = (lon * Math.PI) / 180
        
        globePoints.push({
          x: radius * Math.cos(phi) * Math.cos(theta),
          y: radius * Math.cos(phi) * Math.sin(theta),
          z: radius * Math.sin(phi),
          lat,
          lon
        })
      }
    }

    // Convert cities to 3D points
    const cityPoints = cities.map(city => {
      const phi = (city.lat * Math.PI) / 180
      const theta = (city.lon * Math.PI) / 180
      return {
        x: radius * Math.cos(phi) * Math.cos(theta),
        y: radius * Math.cos(phi) * Math.sin(theta),
        z: radius * Math.sin(phi),
        lat: city.lat,
        lon: city.lon,
        city
      }
    })

    // Create connection lines between major cities
    const connections: { from: typeof cityPoints[0]; to: typeof cityPoints[0] }[] = []
    for (let i = 0; i < cityPoints.length; i++) {
      for (let j = i + 1; j < cityPoints.length; j++) {
        if (Math.random() > 0.6) {
          connections.push({
            from: cityPoints[i],
            to: cityPoints[j]
          })
        }
      }
    }

    const rotatePoint = (point: { x: number; y: number; z: number }, rotX: number, rotY: number) => {
      // Rotate around Y axis
      let x = point.x * Math.cos(rotY) - point.z * Math.sin(rotY)
      let z = point.x * Math.sin(rotY) + point.z * Math.cos(rotY)
      let y = point.y

      // Rotate around X axis
      const y2 = y * Math.cos(rotX) - z * Math.sin(rotX)
      const z2 = y * Math.sin(rotX) + z * Math.cos(rotX)

      return { x, y: y2, z: z2 }
    }

    const project = (point: { x: number; y: number; z: number }) => {
      const perspective = 600
      const scale = perspective / (perspective + point.z)
      return {
        x: point.x * scale + centerX,
        y: point.y * scale + centerY,
        scale,
        z: point.z
      }
    }

    let autoRotation = 0

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height)

      if (!isDragging && !isHovering) {
        autoRotation += 0.002
      }

      pulseRef.current += 0.015
      const pulse = Math.sin(pulseRef.current) * 0.5 + 0.5

      const currentRotX = rotation.x
      const currentRotY = rotation.y + autoRotation

      // Draw Earth sphere background
      const earthGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        Math.max(0, radius * 0.1),
        centerX,
        centerY,
        Math.max(1, radius)
      )
      earthGradient.addColorStop(0, '#1a1f3a')
      earthGradient.addColorStop(0.3, '#0f172a')
      earthGradient.addColorStop(0.7, '#020617')
      earthGradient.addColorStop(1, '#000000')

      ctx.fillStyle = earthGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fill()

      // Draw atmospheric glow around the sphere
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        Math.max(0, radius * 0.95),
        centerX,
        centerY,
        Math.max(1, radius * 1.15)
      )
      glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)')
      glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)')
      glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
      
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2)
      ctx.fill()

      // Draw country borders
      countryBorder3D.forEach(country => {
        const rotatedPoints = country.points.map(p => rotatePoint(p, currentRotX, currentRotY))
        const projectedPoints = rotatedPoints
          .map((p, i) => ({ ...project(p), z: p.z, index: i }))
          .filter(p => p.z > -radius * 0.7) // Show countries on front hemisphere
        
        if (projectedPoints.length > 2) {
          // Draw glow effect first
          ctx.shadowBlur = 8
          ctx.shadowColor = 'rgba(139, 92, 246, 0.6)'
          
          ctx.beginPath()
          ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'
          ctx.lineWidth = 2
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          
          let started = false
          projectedPoints.forEach((p, i) => {
            // Check if the next point is continuous
            const nextIndex = (p.index + 1) % country.points.length
            const hasNext = projectedPoints.some(pt => pt.index === nextIndex)
            
            if (!started) {
              ctx.moveTo(p.x, p.y)
              started = true
            } else {
              ctx.lineTo(p.x, p.y)
            }
            
            // If next point is not visible, restart the path
            if (!hasNext && i < projectedPoints.length - 1) {
              ctx.stroke()
              ctx.beginPath()
              started = false
            }
          })
          
          ctx.stroke()
          
          // Reset shadow
          ctx.shadowBlur = 0
        }
      })

      // Draw connection lines with animation
      connections.forEach((conn, index) => {
        const fromRotated = rotatePoint(conn.from, currentRotX, currentRotY)
        const toRotated = rotatePoint(conn.to, currentRotX, currentRotY)
        
        if (fromRotated.z > -radius * 0.3 && toRotated.z > -radius * 0.3) {
          const fromProj = project(fromRotated)
          const toProj = project(toRotated)
          
          // Animated flow effect - slowed down significantly
          const flowOffset = (pulseRef.current * 0.5 + index * 0.1) % 1
          
          const gradient = ctx.createLinearGradient(fromProj.x, fromProj.y, toProj.x, toProj.y)
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)')
          gradient.addColorStop(Math.max(0, flowOffset - 0.1), 'rgba(139, 92, 246, 0.1)')
          gradient.addColorStop(flowOffset, 'rgba(139, 92, 246, 0.6)')
          gradient.addColorStop(Math.min(1, flowOffset + 0.1), 'rgba(139, 92, 246, 0.1)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(fromProj.x, fromProj.y)
          
          // Draw curved line
          const midX = (fromProj.x + toProj.x) / 2
          const midY = (fromProj.y + toProj.y) / 2
          const distance = Math.sqrt(Math.pow(toProj.x - fromProj.x, 2) + Math.pow(toProj.y - fromProj.y, 2))
          const curveHeight = distance * 0.2
          
          ctx.quadraticCurveTo(midX, midY - curveHeight, toProj.x, toProj.y)
          ctx.stroke()
        }
      })

      // Draw latitude/longitude grid
      const projectedPoints = globePoints
        .map(p => {
          const rotated = rotatePoint(p, currentRotX, currentRotY)
          return { ...project(rotated), lat: p.lat, lon: p.lon }
        })
        .filter(p => p.z > -radius)

      // Draw grid lines
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.1)'
      ctx.lineWidth = 0.5

      for (let lat = -90; lat <= 90; lat += 30) {
        ctx.beginPath()
        let first = true
        projectedPoints
          .filter(p => Math.abs(p.lat - lat) < 5)
          .sort((a, b) => a.lon - b.lon)
          .forEach(p => {
            if (p.z > -radius * 0.5) {
              if (first) {
                ctx.moveTo(p.x, p.y)
                first = false
              } else {
                ctx.lineTo(p.x, p.y)
              }
            }
          })
        ctx.stroke()
      }

      // Draw dots on grid points
      projectedPoints.forEach(p => {
        if (p.z > -radius * 0.3) {
          const opacity = Math.max(0, (p.z + radius) / (2 * radius))
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.2})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw city points with user icons
      cityPoints.forEach(city => {
        const rotated = rotatePoint(city, currentRotX, currentRotY)
        if (rotated.z > -radius * 0.5) {
          const proj = project(rotated)
          const opacity = Math.max(0.3, (rotated.z + radius) / (2 * radius))
          
          // Outer glow (pulsing) - enhanced
          const glowSize = Math.max(1, 24 + pulse * 10)
          const glowGradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, glowSize)
          glowGradient.addColorStop(0, `${city.city.color}90`)
          glowGradient.addColorStop(0.4, `${city.city.color}60`)
          glowGradient.addColorStop(0.7, `${city.city.color}20`)
          glowGradient.addColorStop(1, `${city.city.color}00`)
          
          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, glowSize, 0, Math.PI * 2)
          ctx.fill()
          
          // Ring around city - enhanced
          ctx.strokeStyle = `${city.city.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = 2.5
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, 13, 0, Math.PI * 2)
          ctx.stroke()
          
          // Inner white glow
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.6})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, 10, 0, Math.PI * 2)
          ctx.stroke()
          
          // Center dot - brighter
          const dotGradient = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, Math.max(1, 7))
          dotGradient.addColorStop(0, '#ffffff')
          dotGradient.addColorStop(0.5, city.city.color)
          dotGradient.addColorStop(1, city.city.color)
          
          ctx.fillStyle = dotGradient
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, 7, 0, Math.PI * 2)
          ctx.fill()
          
          // User count badge
          if (rotated.z > 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
            ctx.beginPath()
            ctx.roundRect(proj.x + 16, proj.y - 8, 32, 16, 8)
            ctx.fill()
            
            ctx.fillStyle = city.city.color
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '10px sans-serif'
            ctx.fillText(`${city.city.users}`, proj.x + 32, proj.y)
          }
        }
      })

      // Draw outer glow ring
      const outerGlow = ctx.createRadialGradient(centerX, centerY, Math.max(0, radius - 10), centerX, centerY, Math.max(1, radius + 20))
      outerGlow.addColorStop(0, 'rgba(139, 92, 246, 0)')
      outerGlow.addColorStop(0.5, 'rgba(139, 92, 246, 0.2)')
      outerGlow.addColorStop(1, 'rgba(139, 92, 246, 0)')
      
      ctx.strokeStyle = outerGlow
      ctx.lineWidth = 30
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2)
      ctx.stroke()

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [rotation, isDragging, isHovering])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastPos.x
    const deltaY = e.clientY - lastPos.y

    setRotation(prev => ({
      x: prev.x + deltaY * 0.01,
      y: prev.y + deltaX * 0.01
    }))

    setLastPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovering(false)
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  return (
    <div className="relative w-full h-full group">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ width: '100%', height: '100%' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      />
      
      {/* Interactive hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-xs text-purple-300 flex items-center gap-2 whitespace-nowrap">
          <Users className="h-3 w-3" />
          <span>Drag to explore • {Math.floor(Math.random() * 50 + 450)}+ global innovators</span>
        </p>
      </div>
    </div>
  )
}
