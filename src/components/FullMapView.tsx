import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { fetchAllFindingAddresses, fetchFindings, fetchFindingPhotos, enrichAddressesWithFindings } from '@/api/events'
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

const CABA_CENTER: [number, number] = [-34.6037, -58.3816]
const FULL_MAP_ZOOM = 12

export function FullMapView(): React.ReactElement {
  const [addresses, setAddresses] = useState<FindingAddress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadAll() {
      try {
        const raw = await fetchAllFindingAddresses()
        const findingIds = [...new Set(raw.map((a) => a.findingId))]
        const findingsMap = await fetchFindings(findingIds)
        const photosMap = await fetchFindingPhotos()
        const enriched = enrichAddressesWithFindings(raw, findingsMap, photosMap)
        if (!cancelled) {
          setAddresses(enriched)
        }
      } catch (error) {
        console.error('Error loading full map data:', error)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadAll()
    return () => { cancelled = true }
  }, [])

  const validAddresses = addresses.filter(
    (addr) => addr.latitude !== 0 && addr.longitude !== 0
  )

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center text-muted-foreground"
        style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}
      >
        Cargando mapa...
      </div>
    )
  }

  return (
    <div style={{ height: 'calc(100vh - 280px)', minHeight: '500px' }}>
      <MapContainer
        center={CABA_CENTER}
        zoom={FULL_MAP_ZOOM}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {validAddresses.map((address) => (
          <Marker
            key={address.id}
            position={[address.latitude, address.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div>
                <strong>{address.street} {address.number}</strong>
                {address.neighborhood && (
                  <div className="text-sm text-muted-foreground">{address.neighborhood}</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
