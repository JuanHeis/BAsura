import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import type { FindingAddress } from '@/types/event'

function makeSvgIcon(color: string) {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
      <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="${color}"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`,
    className: '',
    iconSize: [32, 48],
    iconAnchor: [16, 48],
  })
}

const defaultIcon = makeSvgIcon('#3b82f6')
const highlightedIcon = makeSvgIcon('#ef4444')

// CABA center coordinates (Plaza de Mayo area)
const CABA_CENTER: [number, number] = [-34.6037, -58.3816]
const DEFAULT_ZOOM = 12
const SELECTED_ZOOM = 14

interface MapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedAddress: FindingAddress | null
  allAddresses: FindingAddress[]
}

function MapCenterUpdater({ selectedAddress }: { selectedAddress: FindingAddress | null }) {
  const map = useMap()

  useEffect(() => {
    if (selectedAddress && selectedAddress.latitude !== 0 && selectedAddress.longitude !== 0) {
      map.setView([selectedAddress.latitude, selectedAddress.longitude], SELECTED_ZOOM)
    }
  }, [map, selectedAddress])

  return null
}

export function MapDialog({ open, onOpenChange, selectedAddress, allAddresses }: MapDialogProps) {
  const validAddresses = allAddresses.filter(
    (addr) => addr.latitude !== 0 && addr.longitude !== 0
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Mapa de reportes</DialogTitle>
          <DialogDescription>
            {selectedAddress
              ? [selectedAddress.street, selectedAddress.number, selectedAddress.neighborhood].filter(Boolean).join(' ')
              : 'Todos los reportes en el mapa'}
          </DialogDescription>
        </DialogHeader>
        {open && (
          <div className="rounded-lg overflow-hidden">
            <MapContainer
              center={CABA_CENTER}
              zoom={DEFAULT_ZOOM}
              style={{ height: '500px', width: '100%' }}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
              />
              <MapCenterUpdater selectedAddress={selectedAddress} />
              {validAddresses.map((address) => (
                <Marker
                  key={address.id}
                  position={[address.latitude, address.longitude]}
                  icon={address.id === selectedAddress?.id ? highlightedIcon : defaultIcon}
                />
              ))}
            </MapContainer>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
