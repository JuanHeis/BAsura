import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/Header'
import { EventFilters } from '@/components/EventFilters'
import { EventsTable } from '@/components/EventsTable'
import { EventDetailDialog } from '@/components/EventDetailDialog'
import { EventsPagination } from '@/components/EventsPagination'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { fetchFindingAddresses, fetchFindings, fetchFindingPhotos, enrichAddressesWithFindings, fetchSummary } from '@/api/events'
import { Advertisement } from '@/components/Advertisement'
import { SummaryView } from '@/components/SummaryView'
import type { FindingAddress, FindingAddressesResponse, SummaryData } from '@/types/event'

const ITEMS_PER_PAGE = 15

type TabValue = 'pendientes' | 'arreglados' | 'resumen'

function App(): React.ReactElement {
  // Filter state
  const [findingId, setFindingId] = useState('')

  // Active tab
  const [activeTab, setActiveTab] = useState<TabValue>('pendientes')

  // Per-tab pagination
  const [pendientesPage, setPendientesPage] = useState(1)
  const [arregladosPage, setArregladosPage] = useState(1)

  // Per-tab data
  const [pendientesData, setPendientesData] = useState<FindingAddressesResponse | null>(null)
  const [arregladosData, setArregladosData] = useState<FindingAddressesResponse | null>(null)

  // Per-tab loading
  const [pendientesLoading, setPendientesLoading] = useState(false)
  const [arregladosLoading, setArregladosLoading] = useState(false)

  // Summary data
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null)

  // Dialog state
  const [selectedAddress, setSelectedAddress] = useState<FindingAddress | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [autoOpenLightbox, setAutoOpenLightbox] = useState(false)

  // Load pendientes data
  const loadPendientes = useCallback(async (): Promise<void> => {
    setPendientesLoading(true)
    try {
      const response = await fetchFindingAddresses({
        page: pendientesPage,
        limit: ITEMS_PER_PAGE,
        fixed: 0,
        findingId: findingId || undefined,
      })

      const findingIds = [...new Set(response.data.map((a) => a.findingId))]
      const findingsMap = await fetchFindings(findingIds)
      const photosMap = await fetchFindingPhotos()
      const enrichedData = enrichAddressesWithFindings(response.data, findingsMap, photosMap)

      setPendientesData({
        ...response,
        data: enrichedData,
      })
    } catch (error) {
      console.error('Error fetching pendientes:', error)
    } finally {
      setPendientesLoading(false)
    }
  }, [pendientesPage, findingId])

  // Load arreglados data
  const loadArreglados = useCallback(async (): Promise<void> => {
    setArregladosLoading(true)
    try {
      const response = await fetchFindingAddresses({
        page: arregladosPage,
        limit: ITEMS_PER_PAGE,
        fixed: 1,
        findingId: findingId || undefined,
      })

      const findingIds = [...new Set(response.data.map((a) => a.findingId))]
      const findingsMap = await fetchFindings(findingIds)
      const photosMap = await fetchFindingPhotos()
      const enrichedData = enrichAddressesWithFindings(response.data, findingsMap, photosMap)

      setArregladosData({
        ...response,
        data: enrichedData,
      })
    } catch (error) {
      console.error('Error fetching arreglados:', error)
    } finally {
      setArregladosLoading(false)
    }
  }, [arregladosPage, findingId])

  // Load pendientes on page/filter change
  useEffect(() => {
    loadPendientes()
  }, [loadPendientes])

  // Load arreglados on page/filter change
  useEffect(() => {
    loadArreglados()
  }, [loadArreglados])

  // Load summary data
  useEffect(() => {
    fetchSummary()
      .then(setSummaryData)
      .catch((error) => console.error('Error fetching summary:', error))
  }, [])

  // Reset pages when filter changes
  useEffect(() => {
    setPendientesPage(1)
    setArregladosPage(1)
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

  const handleClearFilters = (): void => {
    setFindingId('')
    setPendientesPage(1)
    setArregladosPage(1)
  }

  const handleTabChange = (value: string): void => {
    setActiveTab(value as TabValue)
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

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="pendientes">
                Pendientes{pendientesData ? ` (${pendientesData.total})` : ''}
              </TabsTrigger>
              <TabsTrigger value="arreglados">
                Arreglados{arregladosData ? ` (${arregladosData.total})` : ''}
              </TabsTrigger>
              <TabsTrigger value="resumen">Resumen</TabsTrigger>
            </TabsList>

            <TabsContent value="pendientes">
              <div className="space-y-6 pt-4">
                <EventsTable
                  addresses={pendientesData?.data ?? []}
                  onSelectAddress={handleSelectAddress}
                  onPhotoClick={handlePhotoClick}
                  isLoading={pendientesLoading}
                />
                {pendientesData && (
                  <EventsPagination
                    currentPage={pendientesData.page}
                    totalPages={pendientesData.totalPages}
                    onPageChange={setPendientesPage}
                    total={pendientesData.total}
                    limit={pendientesData.limit}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="arreglados">
              <div className="space-y-6 pt-4">
                <EventsTable
                  addresses={arregladosData?.data ?? []}
                  onSelectAddress={handleSelectAddress}
                  onPhotoClick={handlePhotoClick}
                  isLoading={arregladosLoading}
                />
                {arregladosData && (
                  <EventsPagination
                    currentPage={arregladosData.page}
                    totalPages={arregladosData.totalPages}
                    onPageChange={setArregladosPage}
                    total={arregladosData.total}
                    limit={arregladosData.limit}
                  />
                )}
              </div>
            </TabsContent>

            <TabsContent value="resumen">
              <div className="pt-4">
                <SummaryView data={summaryData} />
              </div>
            </TabsContent>
          </Tabs>
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
    </div>
  )
}

export default App
