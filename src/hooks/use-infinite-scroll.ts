import { useEffect, useRef } from "react"

type UseInfiniteScrollProps = {
    hasNextPage: boolean
    isFetchingNextPage: boolean
    fetchNextPage: () => void
    disabled?: boolean
}

/**
 * Hook personalizado para manejar infinite scroll con Intersection Observer
 */
export function useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    disabled = false,
}: UseInfiniteScrollProps) {
    const observerTarget = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !disabled) {
                    fetchNextPage()
                }
            },
            { threshold: 1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => observer.disconnect()
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, disabled])

    return { observerTarget }
}
