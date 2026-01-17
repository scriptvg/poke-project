import { useEffect, useState } from "react"

/**
 * Hook personalizado para aplicar debounce a un valor
 * @param value - El valor a aplicar debounce
 * @param delay - El tiempo de espera en milisegundos (por defecto 300ms)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        // Establecer un timer para actualizar el valor después del delay
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        // Limpiar el timeout si el valor cambia antes de que se cumpla el delay
        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}
