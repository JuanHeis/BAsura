import type {
  ApiFindingAddressesResponse,
  ApiFindingPhotosResponse,
  ApiFindingsResponse,
  ApiSummaryResponse,
  FetchFindingAddressesParams,
  Finding,
  FindingAddress,
  FindingAddressesResponse,
  SummaryData,
  SummaryRow,
} from '@/types/event'

/**
 * URL base del backend PHP (configurable via env)
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://juanifernandez.com/bacheame/api.php'

/**
 * Tag names that identify basura-related findings.
 * Used to filter all API requests to only show trash reports.
 */
const BASURA_TAG_NAMES = 'DIRTY_AREAS,TRASH_DUMPING'

/**
 * Fetch de direcciones (finding_addresses) usando la API PHP.
 * Soporta: paginación (page, limit) y filtro opcional por finding_id.
 */
export async function fetchFindingAddresses(
  params: FetchFindingAddressesParams,
): Promise<FindingAddressesResponse> {
  const { page, limit, findingId, fixed } = params

  const offset = (page - 1) * limit

  const queryParams = new URLSearchParams({
    table: 'finding_addresses',
    limit: limit.toString(),
    offset: offset.toString(),
    tag_names: BASURA_TAG_NAMES,
    ...(findingId && { finding_id: findingId }),
    ...(fixed !== undefined && { fixed: fixed.toString() }),
  })

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Error HTTP al consultar direcciones: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as ApiFindingAddressesResponse

  const mapped: FindingAddress[] = payload.data.map((item) => ({
    id: item.id,
    findingId: item.finding_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    street: item.street,
    number: item.number,
    city: item.city,
    province: item.province,
    country: item.country,
    municipality: item.municipality,
    neighborhood: item.neighborhood,
    latitude: Number(item.latitude ?? 0),
    longitude: Number(item.longitude ?? 0),
  }))

  const total = payload.count
  const totalPages = Math.ceil(total / limit)
  return {
    data: mapped,
    total,
    page,
    limit,
    totalPages,
  }
}

/**
 * Fetch de findings usando la API PHP.
 * Los findings incluyen tags enriquecidos con name y description.
 */
export async function fetchFindings(ids?: string[]): Promise<Map<string, Finding>> {
  const queryParams = new URLSearchParams({
    table: 'findings',
    limit: '1000',
    tag_names: BASURA_TAG_NAMES,
  })

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Error HTTP al consultar findings: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as ApiFindingsResponse

  const findingsMap = new Map<string, Finding>()

  for (const item of payload.data) {
    if (ids && !ids.includes(item.id)) continue

    findingsMap.set(item.id, {
      id: item.id,
      userId: item.user_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      fixed: Boolean(item.fixed),
      fixedAt: item.fixed_at,
      finish: Boolean(item.finish),
      disable: Boolean(item.disable),
      dangerRange: item.danger_range,
      tags: item.tags ?? [],
      type: item.type,
      municipalityNotified: Boolean(item.municipality_notified),
      municipalityNotifiedAt: item.municipality_notified_at,
    })
  }

  return findingsMap
}

/**
 * Fetch finding photos from the API.
 * Returns a Map where key=findingId, value=photoId (latest photo per finding).
 */
export async function fetchFindingPhotos(): Promise<Map<string, string>> {
  const queryParams = new URLSearchParams({
    table: 'finding_photos',
    limit: '1000',
  })

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Error HTTP al consultar finding photos: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as ApiFindingPhotosResponse

  const photosMap = new Map<string, string>()

  for (const item of payload.data) {
    // Keep only the first entry per findingId (data ordered by created_at DESC = latest first)
    if (!photosMap.has(item.finding_id)) {
      photosMap.set(item.finding_id, item.photo_id)
    }
  }

  return photosMap
}

/**
 * Enriquecer direcciones con datos de findings (tags, fixed, dangerRange) and photos
 */
export function enrichAddressesWithFindings(
  addresses: FindingAddress[],
  findings: Map<string, Finding>,
  photos?: Map<string, string>,
): FindingAddress[] {
  return addresses.map((address) => {
    const finding = findings.get(address.findingId)
    const photoId = photos?.get(address.findingId)
    if (finding) {
      return {
        ...address,
        tags: finding.tags,
        fixed: finding.fixed,
        dangerRange: finding.dangerRange,
        type: finding.type,
        ...(photoId && { photoId }),
      }
    }
    if (photoId) {
      return { ...address, photoId }
    }
    return address
  })
}

/**
 * Fetch summary data from the backend summary endpoint.
 */
export async function fetchSummary(): Promise<SummaryData> {
  const queryParams = new URLSearchParams({ table: 'summary' })

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`)

  if (!response.ok) {
    throw new Error(`Error HTTP al consultar summary: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as ApiSummaryResponse

  return {
    totals: payload.data.totals,
    porTipo: payload.data.por_tipo.map((row): SummaryRow => ({
      label: row.tipo,
      total: row.total,
      arreglados: row.arreglados,
      pendientes: row.pendientes,
    })),
    porEtiqueta: payload.data.por_etiqueta.map((row): SummaryRow => ({
      label: row.etiqueta,
      total: row.total,
      arreglados: row.arreglados,
      pendientes: row.pendientes,
    })),
  }
}

