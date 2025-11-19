import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {

  public _voyages: WritableSignal<{ id: number, distanceKm: number, consommationPour100Km: number }[]> = signal([
    { id: 1, distanceKm: 50,  consommationPour100Km: 5},
    { id: 2, distanceKm: 150, consommationPour100Km: 6},
    { id: 3, distanceKm: 250, consommationPour100Km: 7},
    { id: 4, distanceKm: 350, consommationPour100Km: 8},
    { id: 5, distanceKm: 450, consommationPour100Km: 9},
  ]);

  public get voyages(): { id: number, distanceKm: number, consommationPour100Km: number }[] {
    return this._voyages();
  }

  public getResumeVoyages() {
    let distanceKmTotale: number = 0;
    let consommationPour100Km: number = 0;

    this.voyages.forEach((voyage) => {
      distanceKmTotale += voyage.distanceKm;
      consommationPour100Km += voyage.consommationPour100Km;
    });
    // Les parenthèses requièrent l'ajout d'une propriété calculée
    // return { distanceKmTotale, consommationMoyenne: (consommationPour100Km / this.voyages.length) };
    return { distanceKmTotale, consommationPour100Km };
  }
}
