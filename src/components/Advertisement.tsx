import { BadgeAlert, ExternalLink, Smartphone } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const APP_STORE_URL = 'https://apps.apple.com/ar/app/bacheame/id6744586468'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bacheame'

export function Advertisement() {
  return (
    <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Colaborá con tu comunidad</p>
          <h2 className="text-base font-semibold sm:text-lg">Ayudá a mejorar tu barrio con Bacheame</h2>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full gap-2 sm:w-auto">
              <BadgeAlert className="h-4 w-4" />
              Denunciá una Incidencia en tu Barrio
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Descargá Bacheame y hacé tu denuncia</DialogTitle>
              <DialogDescription>
                Las incidencias se reportan desde la app móvil. Elegí tu store y empezá a colaborar.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 pt-2">
              <Button asChild className="justify-between">
                <a href={APP_STORE_URL} target="_blank" rel="noreferrer">
                  <span className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Descargar en App Store
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>

              <Button asChild variant="outline" className="justify-between">
                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer">
                  <span className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Descargar en Google Play
                  </span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
