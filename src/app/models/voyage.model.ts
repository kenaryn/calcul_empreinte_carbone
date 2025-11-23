export interface Voyage {
  id: number;
  distanceKm: number;
  consommationPour100Km: number;
  quantiteCO2: number;
}

export interface VoyageResume {
  distanceKm: number;
  consommationPour100Km: number;
  quantiteCO2: number;
}
