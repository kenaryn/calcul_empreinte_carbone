import {Injectable, signal, WritableSignal} from '@angular/core';
import { Voyage } from '../models/voyage.model';
import { VoyageResume } from '../models/voyage.model';

@Injectable({
  providedIn: 'root',
})
export class CarbonFootprintComputeService {

  public _voyages: WritableSignal<Voyage[]> = signal([
    { id: 1, distanceKm: 50,  consommationPour100Km: 5, quantiteCO2: 300},
    { id: 2, distanceKm: 150, consommationPour100Km: 6, quantiteCO2: 118},
    { id: 3, distanceKm: 250, consommationPour100Km: 7, quantiteCO2: 145},
    { id: 4, distanceKm: 350, consommationPour100Km: 8, quantiteCO2: 245},
    { id: 5, distanceKm: 450, consommationPour100Km: 9, quantiteCO2: 340},
  ]);

  // public get voyages(): Promise<Voyage[]> {
  //   return Promise.resolve(this._voyages());
  // }
  public get voyages(): Promise<Voyage[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this._voyages());
      }, 5_000);
    });
  }

  // public async getResumeVoyages(): Promise<{ distanceKmTotale: number, consommationPour100KmTotale: number, quantiteCO2Totale: number }> {
  public async getResumeVoyages(): Promise<VoyageResume> {
    let distanceKmTotale: number = 0;
    let consommationPour100KmTotale: number = 0;
    let quantiteCO2Totale: number = 0;

    (await this.voyages).forEach((voyage: VoyageResume) => {
      distanceKmTotale += voyage.distanceKm;
      consommationPour100KmTotale += voyage.consommationPour100Km;
      quantiteCO2Totale += voyage.quantiteCO2;
    });
    return { distanceKm: distanceKmTotale, consommationPour100Km: consommationPour100KmTotale, quantiteCO2: quantiteCO2Totale };
  }

  public async ajouterVoyage(voyage: Partial<Voyage> & { locomotion?: string; dateVoyage?: Date }): Promise<void> {
    return new Promise((resolve) => {

      const newVoyage = {...voyage} as Voyage & { locomotion?: string };

      if (!newVoyage.locomotion) {
        newVoyage.locomotion = 'voiture';
      }

      if (newVoyage.locomotion === 'voiture') {
        newVoyage.quantiteCO2 = (newVoyage.distanceKm * newVoyage.consommationPour100Km) / 100 * 2.3;
      } else if (newVoyage.locomotion === 'train') {
        newVoyage.quantiteCO2 = newVoyage.distanceKm * 0.03;
      } else if (newVoyage.locomotion === 'avion') {
        newVoyage.quantiteCO2 = newVoyage.distanceKm * 0.2;
      }
      this._voyages.update(v => ([...v, newVoyage]));
      resolve();
    });
  }
}
