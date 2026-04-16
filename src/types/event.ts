export type ApiFindingAddress = {
  id: string
  finding_id: string
  created_at: string
  updated_at: string
  street: string
  number: string
  city: string
  province: string
  country: string
  municipality: string
  neighborhood: string
  latitude: number
  longitude: number
}

// Tags enriquecidos del backend
export type EnrichedTag = {
  name: string
  description: string | null
}

// Finding desde el backend
export type ApiFinding = {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  fixed: boolean | number
  fixed_at: string | null
  finish: boolean | number
  disable: boolean | number
  danger_range: number
  tags: EnrichedTag[]
  type: string
  municipality_notified: boolean | number
  municipality_notified_at: string | null
}

export type ApiFindingsResponse = {
  table: 'findings'
  count: number
  limit: number
  offset: number
  data: ApiFinding[]
}

export type ApiFindingAddressesResponse = {
  table: 'finding_addresses'
  count: number
  limit: number
  offset: number
  data: ApiFindingAddress[]
}

export type ApiFindingPhoto = {
  id: string
  finding_id: string
  photo_id: string
  created_at: string
  updated_at: string
}

export type ApiFindingPhotosResponse = {
  table: 'finding_photos'
  count: number
  limit: number
  offset: number
  data: ApiFindingPhoto[]
}

// Finding transformado para el frontend
export type Finding = {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  fixed: boolean
  fixedAt: string | null
  finish: boolean
  disable: boolean
  dangerRange: number
  tags: EnrichedTag[]
  type: string
  municipalityNotified: boolean
  municipalityNotifiedAt: string | null
}

export type FindingAddress = {
  id: string
  findingId: string
  createdAt: string
  updatedAt: string
  street: string
  number: string
  city: string
  province: string
  country: string
  municipality: string
  neighborhood: string
  latitude: number
  longitude: number
  // Tags del finding asociado
  tags?: EnrichedTag[]
  // Info adicional del finding
  fixed?: boolean
  dangerRange?: number
  type?: string
  // Photo from finding_photos
  photoId?: string
}

export type FindingAddressesResponse = {
  data: FindingAddress[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type FetchFindingAddressesParams = {
  page: number
  limit: number
  findingId?: string
}

