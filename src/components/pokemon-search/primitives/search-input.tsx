import { Search } from "lucide-react"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
}

/**
 * Text input for searching Pokemon
 */
export function SearchInput({
    value,
    onChange,
    placeholder = "Buscar por nombre o ID...",
}: SearchInputProps) {
    return (
        <InputGroup>
            <InputGroupAddon align="inline-start">
                <Search size={18} />
            </InputGroupAddon>
            <InputGroupInput
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            {value && (
                <InputGroupAddon align="inline-end">
                    <InputGroupButton
                        variant="secondary"
                        onClick={() => onChange("")}
                    >
                        Limpiar
                    </InputGroupButton>
                </InputGroupAddon>
            )}
        </InputGroup>
    )
}
