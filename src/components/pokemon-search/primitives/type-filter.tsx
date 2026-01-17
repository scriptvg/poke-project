import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ButtonGroup } from "@/components/ui/button-group"

interface TypeFilterProps {
    selectedType: string | null
    onTypeChange: (type: string | null) => void
    uniqueTypes: string[]
}

/**
 * Dropdown filter for Pokemon types
 */
export function TypeFilter({
    selectedType,
    onTypeChange,
    uniqueTypes,
}: TypeFilterProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <ButtonGroup>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        {selectedType ? (
                            <span className="capitalize">{selectedType}</span>
                        ) : (
                            "Tipo"
                        )}
                    </Button>
                </ButtonGroup>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="text-center sticky bg-popover z-10">
                    Filtrar por tipo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTypeChange(null)}>
                    Todos
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="max-h-[200px] overflow-y-auto">
                    {uniqueTypes.map((type) => (
                        <DropdownMenuItem
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className="capitalize"
                        >
                            {type}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
