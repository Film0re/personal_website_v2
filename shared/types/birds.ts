export interface EBirdObservation {
  speciesCode: string
  comName: string
  sciName: string
  locId: string
  locName: string
  obsDt: string
  howMany?: number
  lat: number
  lng: number
  obsValid: boolean
  obsReviewed: boolean
  locationPrivate: boolean
  subId: string
}

export interface BirdsResponse {
  date: string
  location: string
  count: number
  sightings: EBirdObservation[]
}
