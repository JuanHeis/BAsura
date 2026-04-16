import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface EventFiltersProps {
  findingId: string
  onFindingIdChange: (value: string) => void
  onClearFilters: () => void
}

export function EventFilters({
  findingId,
  onFindingIdChange,
  onClearFilters,
}: EventFiltersProps) {
  const hasFilters = Boolean(findingId)
  return <></>
  return (
    <section className="rounded-lg border border-border bg-card/70 p-4 shadow-sm">
      <div className="mb-3 flex flex-col gap-1">
        <p className="text-sm font-medium text-foreground">Filtros</p>

      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            placeholder="Ej: 12345"
            value={findingId}
            onChange={(e) => onFindingIdChange(e.target.value)}
            className="pl-9"
            aria-label="Filtrar por finding id"
          />
        </div>

        {hasFilters && (
          <Button variant="outline" size="sm" onClick={onClearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Limpiar
          </Button>
        )}
      </div>
    </section>
  )
}

