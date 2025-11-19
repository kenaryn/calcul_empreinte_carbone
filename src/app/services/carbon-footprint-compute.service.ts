import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {

  public voyages: WritableSignal<{ id: number, distanceKm: number, consommationPour100Km: number }[]> = signal([
    { id: 1, distanceKm: 50,  consommationPour100Km: 5},
    { id: 2, distanceKm: 150, consommationPour100Km: 6},
    { id: 3, distanceKm: 250, consommationPour100Km: 7},
    { id: 4, distanceKm: 350, consommationPour100Km: 8},
    { id: 5, distanceKm: 450, consommationPour100Km: 9},
  ]);
}
