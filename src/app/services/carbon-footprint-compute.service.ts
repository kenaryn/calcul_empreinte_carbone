import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {

  public _voyages: WritableSignal<{ id: number, distanceKm: number, consommationPour100Km: number, quantiteCO2: number }[]> = signal([
    { id: 1, distanceKm: 50,  consommationPour100Km: 5, quantiteCO2: 300},
    { id: 2, distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 118},
    { id: 3, distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 145},
    { id: 4, distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 245},
    { id: 5, distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 340},
  ]);

  public get voyages(): Promise<{ id: number, distanceKm: number, consommationPour100Km: number, quantiteCO2: number }[]> {
    return new Promise((resolve, reject) => {
      resolve(this._voyages());
    })
  }

  public async getResumeVoyages(): Promise<{ distanceKmTotale: number, consommationPour100KmTotale: number, quantiteCO2Totale: number }> {
    let distanceKmTotale: number = 0;
    let consommationPour100KmTotale: number = 0;
    let quantiteCO2Totale: number = 0;

    (await this.voyages).forEach((voyage) => {
      distanceKmTotale += voyage.distanceKm;
      consommationPour100KmTotale += voyage.consommationPour100Km;
      quantiteCO2Totale += voyage.quantiteCO2;
    });
    return { distanceKmTotale, consommationPour100KmTotale, quantiteCO2Totale };
  }

  public async ajouterVoyage(voyage: any): Promise<void> {
    return new Promise((resolve, reject) => {

      if (!voyage.locomotion) {
        voyage.locomotion = 'voiture';
      }

      if (voyage.locomotion === 'voiture') {
        voyage.quantiteCO2 = (voyage.distanceKm * voyage.consommationPour100Km) / 100 * 2.3;
      } else if (voyage.locomotion === 'train') {
        voyage.quantiteCO2 = voyage.distanceKm * 0.03;
      } else if (voyage.locomotion === 'avion') {
        voyage.quantiteCO2 = voyage.distanceKm * 0.2;
      }
      this._voyages.update(v => ([...v, voyage]));
      resolve();
    });
  }
}
