import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface PhotoLightboxProps {
  photoId: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CLOUDFLARE_IMAGES_BASE = 'https://imagedelivery.net/UTskp2fJ6thzbs9Ecx9dvQ'

export function PhotoLightbox({ photoId, open, onOpenChange }: PhotoLightboxProps): React.ReactElement | null {
  if (!photoId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-black">
        <VisuallyHidden>
          <DialogTitle>Foto del hallazgo</DialogTitle>
        </VisuallyHidden>
        <img
          src={photoId.startsWith('http') ? photoId : `${CLOUDFLARE_IMAGES_BASE}/${photoId}/public`}
          alt="Foto del hallazgo"
          className="w-full h-auto"
        />
      </DialogContent>
    </Dialog>
  )
}
