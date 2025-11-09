import { useState, useEffect, useRef } from 'react'
import { Skeleton } from './ui/skeleton'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  placeholder?: React.ReactNode
}

export function LazyImage({
  src,
  alt,
  className = '',
  fallbackSrc,
  placeholder,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const [error, setError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setError(true)
    setIsLoading(false)
  }

  const imageSrc = error && fallbackSrc ? fallbackSrc : src

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0">
          {placeholder || <Skeleton className="w-full h-full" />}
        </div>
      )}
      <img
        ref={imgRef}
        src={isInView ? imageSrc : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading="lazy"
      />
    </div>
  )
}
