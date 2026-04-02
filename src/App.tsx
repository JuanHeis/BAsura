import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/Header'
import { EventFilters } from '@/components/EventFilters'
import { EventsTable } from '@/components/EventsTable'
import { EventDetailDialog } from '@/components/EventDetailDialog'
import { MapDialog } from '@/components/MapDialog'
import { EventsPagination } from '@/components/EventsPagination'
import { fetchFindingAddresses, fetchFindings, fetchFindingPhotos, enrichAddressesWithFindings } from '@/api/events'
import { Advertisement } from '@/components/Advertisement'
import type { FindingAddress, FindingAddressesResponse } from '@/types/event'

const ITEMS_PER_PAGE = 15

function App(): React.ReactElement {
  // Filter state
  const [findingId, setFindingId] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)

  // Data
  const [addressesData, setAddressesData] = useState<FindingAddressesResponse | null>(null)

  // Loading
  const [isLoading, setIsLoading] = useState(false)

  // Dialog state
  const [selectedAddress, setSelectedAddress] = useState<FindingAddress | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [autoOpenLightbox, setAutoOpenLightbox] = useState(false)

  // Map dialog state
  const [mapDialogOpen, setMapDialogOpen] = useState(false)
  const [mapSelectedAddress, setMapSelectedAddress] = useState<FindingAddress | null>(null)

  // Load addresses data
  const loadAddresses = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetchFindingAddresses({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        findingId: findingId || undefined,
      })

      const findingIds = [...new Set(response.data.map((a) => a.findingId))]
      const findingsMap = await fetchFindings(findingIds)
      const photosMap = await fetchFindingPhotos()
      const enrichedData = enrichAddressesWithFindings(response.data, findingsMap, photosMap)

      setAddressesData({
        ...response,
        data: enrichedData,
      })
    } catch (error) {
      console.error('Error fetching addresses:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, findingId])

  // Load addresses on page/filter change
  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [findingId])

  // Handlers
  const handleSelectAddress = (address: FindingAddress): void => {
    setSelectedAddress(address)
    setAutoOpenLightbox(false)
    setDialogOpen(true)
  }

  const handlePhotoClick = (address: FindingAddress): void => {
    setSelectedAddress(address)
    setAutoOpenLightbox(true)
    setDialogOpen(true)
  }

  const handleMapClick = (address: FindingAddress): void => {
    setMapSelectedAddress(address)
    setMapDialogOpen(true)
  }

  const handleClearFilters = (): void => {
    setFindingId('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Advertisement banner */}
          <Advertisement />

          {/* Filters */}
          <EventFilters
            findingId={findingId}
            onFindingIdChange={setFindingId}
            onClearFilters={handleClearFilters}
          />

          {/* Single list of all reports */}
          <div className="space-y-6">
            <EventsTable
              addresses={addressesData?.data ?? []}
              onSelectAddress={handleSelectAddress}
              onPhotoClick={handlePhotoClick}
              onMapClick={handleMapClick}
              isLoading={isLoading}
            />
            {addressesData && (
              <EventsPagination
                currentPage={addressesData.page}
                totalPages={addressesData.totalPages}
                onPageChange={setCurrentPage}
                total={addressesData.total}
                limit={addressesData.limit}
              />
            )}
          </div>
        </div>
      </main>

      {/* Detail dialog */}
      <EventDetailDialog
        address={selectedAddress}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        autoOpenLightbox={autoOpenLightbox}
        onLightboxConsumed={() => setAutoOpenLightbox(false)}
      />

      {/* Map dialog */}
      <MapDialog
        open={mapDialogOpen}
        onOpenChange={setMapDialogOpen}
        selectedAddress={mapSelectedAddress}
        allAddresses={addressesData?.data ?? []}
      />
    </div>
  )
}

export default App
