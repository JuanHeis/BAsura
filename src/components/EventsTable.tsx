import { Camera, ExternalLink, Info, Map, MapPin, Navigation } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge, type BadgeProps } from '@/components/ui/badge'
import type { FindingAddress } from '@/types/event'

interface EventsTableProps {
  addresses: FindingAddress[]
  onSelectAddress: (address: FindingAddress) => void
  onPhotoClick?: (address: FindingAddress) => void
  isLoading?: boolean
}

export function EventsTable({ addresses, onSelectAddress, onPhotoClick, isLoading }: EventsTableProps) {
  const badgeVariantForMunicipality = (municipality: string): BadgeProps['variant'] => {
    // Mapa de colores por comuna (ajustable si aparecen nuevas)
    const normalized = municipality.toLowerCase()
    if (normalized.includes('1')) return 'comuna1'
    if (normalized.includes('3')) return 'comuna3'
    if (normalized.includes('7')) return 'comuna7'
    if (normalized.includes('13')) return 'comuna13'
    return 'secondary'
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-border bg-card">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span>Cargando direcciones...</span>
        </div>
      </div>
    )
  }

  if (addresses.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-border bg-card">
        <Info className="mb-3 h-12 w-12 text-muted-foreground/50" />
        <p className="text-lg font-medium text-muted-foreground">No hay direcciones</p>
        <p className="text-sm text-muted-foreground/70">
          No se encontraron registros con los filtros seleccionados
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="w-10 font-semibold">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Foto</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Direccion</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Municipio / Barrio</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Mapa</span>
              </div>
            </TableHead>
            <TableHead className="text-center font-semibold">
              <div className="flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Mas Info</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => {
            return (
              <TableRow key={address.id} className="group">
                <TableCell className="w-10">
                  {address.photoId ? (
                    <button
                      type="button"
                      onClick={() => (onPhotoClick ?? onSelectAddress)(address)}
                      className="h-8 w-8 overflow-hidden rounded border border-border"
                    >
                      <img
                        src={address.photoId.startsWith('http') ? address.photoId : `https://imagedelivery.net/UTskp2fJ6thzbs9Ecx9dvQ/${address.photoId}/public`}
                        alt="Foto"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onSelectAddress(address)}
                      className="flex h-8 w-8 items-center justify-center rounded border border-border bg-muted/50"
                    >
                      <Camera className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {address.street} {address.number}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-sm">
                    {address.municipality !== "CABA" && address.municipality !== "caba" && address.municipality !== "Ciudad Autonoma de Buenos Aires" && address.municipality !== "ciudad autonoma de buenos aires" && address.municipality !== "Caba" && address.municipality !== "ciudad autonoma de buenos aires" ? address.municipality && (
                      <Badge variant={badgeVariantForMunicipality(address.municipality)}>
                        {address.municipality}
                      </Badge>
                    ) : <></>}
                    <p className="text-xs text-muted-foreground">{address.neighborhood}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="default"
                    size="sm"
                    className="gap-2"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${address.latitude},${address.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver mapa
                    </a>
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectAddress(address)}
                    className="gap-2 font-medium"
                  >
                    <Info className="h-4 w-4" />
                    Detalles
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
