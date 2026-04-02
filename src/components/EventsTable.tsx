import { useState, useMemo } from 'react'
import { differenceInDays, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowDown, ArrowUp, CalendarClock, Camera, CheckCircle2, ExternalLink, Hourglass, Info, Map, MapPin, Navigation, Tag, XCircle } from 'lucide-react'
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
  const [agingSortDir, setAgingSortDir] = useState<'asc' | 'desc'>('desc')

  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => {
      const agingA = differenceInDays(new Date(), new Date(a.createdAt))
      const agingB = differenceInDays(new Date(), new Date(b.createdAt))
      return agingSortDir === 'desc' ? agingB - agingA : agingA - agingB
    })
  }, [addresses, agingSortDir])

  const getAgingColor = (days: number): string => {
    if (days > 90) return 'text-red-500'
    if (days > 30) return 'text-amber-500'
    return 'text-foreground'
  }

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
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Estado</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <button
                onClick={() => setAgingSortDir(prev => prev === 'desc' ? 'asc' : 'desc')}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Hourglass className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Dias desde el reporte</span>
                {agingSortDir === 'desc' ? (
                  <ArrowDown className="h-3 w-3" />
                ) : (
                  <ArrowUp className="h-3 w-3" />
                )}
              </button>
            </TableHead>
            <TableHead className="w-10 font-semibold">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Foto</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Dirección</span>
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
                <Tag className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Etiquetas</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <Map className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Mapa</span>
              </div>
            </TableHead>
            <TableHead className="font-semibold">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Fechas</span>
              </div>
            </TableHead>
            <TableHead className="text-center font-semibold">
              <div className="flex items-center justify-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
                <span>Más Info</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAddresses.map((address) => {
            return (
              <TableRow key={address.id} className="group">
                <TableCell>
                  {address.fixed ? (
                    <Badge variant="success" className="gap-1 px-3 py-1 text-sm">
                      <CheckCircle2 className="h-4 w-4" />
                      Arreglado
                    </Badge>
                  ) : (
                    <Badge variant="pending" className="gap-1 px-3 py-1 text-sm">
                      <XCircle className="h-4 w-4" />
                      Pendiente
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {(() => {
                    const days = differenceInDays(new Date(), new Date(address.createdAt))
                    return (
                      <div className="text-center">
                        <span className={`text-lg font-bold ${getAgingColor(days)}`}>
                          {days}
                        </span>
                        <p className="text-xs text-muted-foreground">dias</p>
                      </div>
                    )
                  })()}
                </TableCell>
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
                    {address.municipality !== "CABA" && address.municipality !== "caba" && address.municipality !== "Ciudad Autónoma de Buenos Aires" && address.municipality !== "ciudad autónoma de buenos aires" && address.municipality !== "Caba" && address.municipality !== "ciudad autónoma de buenos aires" ? address.municipality && (
                      <Badge variant={badgeVariantForMunicipality(address.municipality)}>
                        {address.municipality}
                      </Badge>
                    ) : <></>}
                    <p className="text-xs text-muted-foreground">{address.neighborhood}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {address.tags && address.tags.length > 0 ? (
                      address.tags.map((tag) => (
                        <Badge
                          key={tag.name}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag.description ?? tag.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
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
                <TableCell>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      Creado:{' '}
                      {formatDistanceToNow(new Date(address.createdAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                    <p>
                      Actualizado:{' '}
                      {formatDistanceToNow(new Date(address.updatedAt), {
                        addSuffix: true,
                        locale: es,
                      })}
                    </p>
                  </div>
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

