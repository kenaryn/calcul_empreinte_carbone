import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  AfterViewInit,
  AfterContentChecked,
  AfterViewChecked,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarbonFootprintForm } from '../carbon-footprint-form/carbon-footprint-form';
import { CarbonFootprintResult } from '../carbon-footprint-result/carbon-footprint-result';

@Component({
  selector: 'eni-carbon-footprint',
  imports: [
    CarbonFootprintForm,
    CarbonFootprintResult,
  ],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.css',
})
export class CarbonFootprint implements OnInit, OnDestroy, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {

  protected _distanceKm: WritableSignal<number> = signal(50);
  protected _consommationPour100km: WritableSignal<number> = signal(3.5);

  protected _voyages: WritableSignal<{ id: number, distanceKm: number, consommationPour100Km: number }[]> = signal([
    { id: 1, distanceKm: 50,  consommationPour100Km: 5},
    { id: 2, distanceKm: 150, consommationPour100Km: 6},
    { id: 3, distanceKm: 250, consommationPour100Km: 7},
    { id: 4, distanceKm: 350, consommationPour100Km: 8},
    { id: 5, distanceKm: 450, consommationPour100Km: 9},
  ]);

  public get voyages(): { id: number, distanceKm: number, consommationPour100Km: number }[] {
    return this._voyages();
  }

  public get consommationPour100km(): number {
    return this._consommationPour100km();
  }

  public get distanceKm(): number {
    return this._distanceKm();
  }

  public set distanceKm(km: number) {
    if (this.distanceKm >= 0) {
      this._distanceKm.set(km);
    }
  }

    ngOnInit(): void {
      // console.info('Le composant CarbonFootprint est initialisé.')
    }

    ngOnDestroy(): void {
      // console.info('Le composant CarbonFootprint est détruit.');
    }

    ngAfterContentInit(): void {
      // console.info('Le contenu du composant a été initialisé.');
    }

    ngAfterContentChecked(): void {
      // console.info('Le contenu du composant a été vérifié');
    }

    ngAfterViewInit(): void {
      // console.info('La vue du composant a été initialisée')
    }

    ngAfterViewChecked(): void {
      // console.info('La vue du composant a été vérifiée');
    }

  public isLowOrHigh = (): string => (this.consommationPour100km > 7) ? 'high' : (this.consommationPour100km < 4) ? 'low' : 'normal';

  public isFartherOrCloser  = (): string => (this.distanceKm > 500) ? 'haute-distance' : (this.distanceKm < 100) ? 'basse-distance' : 'normal';

  /**
   * `ajouter100Km()` actualise le signal lui-même, et non sa valeur. Il n'est donc pas possible d'utiliser son getter
   * (qui retourne un number; la méthode update() n'existant pas sur ce type primitif.
   */
  public ajouter100Km(): void {
    this._distanceKm.update((distance: number): number => (distance += 100));
  }

  public genererVoyage(): void {
    if (this.voyages) {
      // Générer un nouvel identifiant
      const nouveauId = this.voyages.length > 0 ? Math.max(...this.voyages.map(val => val.id)) + 1 : 1;

      this._voyages.update(v =>
        ([ ...v,
          { id: 6, distanceKm: this.genererNombreAleatoire(30, 600, 5), consommationPour100Km: this.genererNombreAleatoire(3, 11, 1) }
        ]));
    }
  }

  private genererNombreAleatoire(min: number, max: number, pas: number): number {
    const paliers = Math.floor((max - min) / pas) + 1;
    return Math.floor(Math.random() * paliers) * pas + min;
  }
}
