import { useEffect, useRef, useState } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading: boolean,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 0.5, rootMargin = '100px' } = options
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (isLoading || !hasMore) return

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    // Observe the load more element
    const currentLoadMoreRef = loadMoreRef.current
    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef)
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [onLoadMore, hasMore, isLoading, threshold, rootMargin])

  return loadMoreRef
}
