import { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar, Camera, CheckCircle2, MapPin, Navigation, ExternalLink, Tag, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { PhotoLightbox } from '@/components/PhotoLightbox'
import type { FindingAddress } from '@/types/event'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface EventDetailDialogProps {
  address: FindingAddress | null
  open: boolean
  onOpenChange: (open: boolean) => void
  autoOpenLightbox?: boolean
  onLightboxConsumed?: () => void
}

const CLOUDFLARE_IMAGES_BASE = 'https://imagedelivery.net/UTskp2fJ6thzbs9Ecx9dvQ'

export function EventDetailDialog({ address, open, onOpenChange, autoOpenLightbox, onLightboxConsumed }: EventDetailDialogProps): React.ReactElement | null {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const consumeLightbox = useCallback((): void => {
    onLightboxConsumed?.()
  }, [onLightboxConsumed])

  useEffect(() => {
    if (open && autoOpenLightbox && address?.photoId) {
      setLightboxOpen(true)
      consumeLightbox()
    }
  }, [open, autoOpenLightbox, address?.photoId, consumeLightbox])

  if (!address) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detalle de la dirección
          </DialogTitle>
          <DialogDescription>
            Información disponible desde Bacheame
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Estado del bache */}
          <div className="rounded-lg p-4" style={{ backgroundColor: address.fixed ? 'rgba(22, 163, 74, 0.15)' : 'rgba(220, 38, 38, 0.15)' }}>
            <div className="flex items-center gap-3">
              {address.fixed ? (
                <>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-lg font-bold text-green-600">Arreglado</p>
                    <p className="text-sm text-muted-foreground">Este bache ya fue solucionado</p>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-lg font-bold text-red-600">Pendiente</p>
                    <p className="text-sm text-muted-foreground">Este bache aún no ha sido arreglado</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Photo section */}
          <div className="rounded-lg bg-muted/50 p-4">
            {address.photoId ? (
              <div>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="h-16 w-16 cursor-pointer overflow-hidden rounded border border-border"
                >
                  <img
                    src={address.photoId.startsWith('http') ? address.photoId : `${CLOUDFLARE_IMAGES_BASE}/${address.photoId}/public`}
                    alt="Foto del hallazgo"
                    className="h-full w-full object-cover"
                  />
                </button>
                <p className="mt-1 text-xs text-muted-foreground">Click para ampliar</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Camera className="h-5 w-5" />
                <span className="text-sm">Sin foto</span>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">Dirección</h4>
            <p className="text-lg font-semibold">
              {address.street} {address.number}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{address.municipality}</Badge>
              <Badge variant="outline">{address.neighborhood}</Badge>
            </div>
          </div>

          {/* Etiquetas */}
          {address.tags && address.tags.length > 0 && (
            <div className="rounded-lg bg-muted/50 p-4">
              <div className="mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-muted-foreground">Etiquetas</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {address.tags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="outline"
                  >
                    {tag.description ?? tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2 rounded-lg bg-muted/50 p-3 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-muted-foreground">
                  Municipio: {address.municipality} / Barrio: {address.neighborhood}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Navigation className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Coordenadas</p>
                <p className="text-muted-foreground">
                  {address.latitude}, {address.longitude}
                </p>
              </div>
            </div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 gap-2"
                asChild
              >
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${address.latitude},${address.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver en Google Maps
                </a>
              </Button>
            </div>
          </div>

          {/* Fechas */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Creado:</span>
              <span>
                {formatDistanceToNow(new Date(address.createdAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Actualizado:</span>
              <span>
                {formatDistanceToNow(new Date(address.updatedAt), {
                  addSuffix: true,
                  locale: es,
                })}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>

      <PhotoLightbox
        photoId={address.photoId ?? null}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </Dialog>
  )
}
