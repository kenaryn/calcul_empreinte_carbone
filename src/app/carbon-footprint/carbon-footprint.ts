import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import {CarbonFootprintComputeService} from '../services/carbon-footprint-compute.service';
import {CarbonFootprintForm} from '../carbon-footprint-form/carbon-footprint-form';

@Component({
  selector: 'eni-carbon-footprint',
  imports: [
    CarbonFootprintForm
  ],
  templateUrl: './carbon-footprint.html',
  styleUrl: './carbon-footprint.css',
})
export class CarbonFootprint implements OnInit {

  /* Injection de dépendances */
  protected carbonFootprintComputeService: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);


  /* Propriétés */
  protected _distanceKm: WritableSignal<number> = signal(50);
  protected _consommationPour100Km: WritableSignal<number> = signal(3.5);
  protected _quantiteCO2Totale: WritableSignal<number> = signal(15);

  /* La propriété du composant copie la référence du signal du service pour réagir automatiquement aux changements dudit signal */
  protected _voyages = this.carbonFootprintComputeService._voyages;


  /* Accesseurs */
  public get voyages(): { id: number, distanceKm: number, consommationPour100Km: number, quantiteCO2: number }[] {
    return this._voyages();
  }

  public get consommationPour100Km(): number {
    return this._consommationPour100Km();
  }

  public set consommationPour100Km(consommation: number) {
    if (consommation > 0) {
      this._consommationPour100Km.set(consommation);
    }
  }

  public get distanceKm(): number {
    return this._distanceKm();
  }

  public set distanceKm(km: number) {
    if (this.distanceKm >= 0) {
      this._distanceKm.set(km);
    }
  }

  public get quantiteCO2Totale(): number {
    return this._quantiteCO2Totale();
  }


  /* Cycle de vie du composant */
    ngOnInit(): void {
      console.info('Le composant est initialisé avec les données d\'un service API');
      // this.recupererVoyages();
      this.calculerTotalEtMoyenne().then(() => console.warn('Problème de résolution asynchrone avec \'calculerTotalEtMoyenne()\''));
    }


  /* Méthodes · logique métier */
  public async calculerTotalEtMoyenne(): Promise<void> {
    let resume = await this.carbonFootprintComputeService.getResumeVoyages();
    this._distanceKm.set(resume.distanceKmTotale);
    this._consommationPour100Km.set(resume.consommationPour100KmTotale);
    this._quantiteCO2Totale.set(resume.quantiteCO2Totale);
  }


  public isLowOrHigh = (): string => (this.consommationPour100Km > 7) ? 'high' : (this.consommationPour100Km < 4) ? 'low' : 'normal';

  public isFartherOrCloser  = (): string => (this.distanceKm > 500) ? 'haute-distance' : (this.distanceKm < 100) ? 'basse-distance' : 'normal';

  /**
   * `ajouter100Km()` actualise le signal lui-même, et non sa valeur. Il n'est donc pas possible d'utiliser son getter
   * (qui retourne un number; la méthode update() n'existant pas sur ce type primitif.
   */
  public ajouter100Km(): void {
    this._distanceKm.update((distance: number): number => (distance + 100));
  }


  public async genererVoyage(): Promise<void> {
    // Générer un nouvel identifiant de voyage
    const nouveauId = this.voyages.length > 0 ? Math.max(...this.voyages.map(val => val.id)) + 1 : 1;

    const nouveauVoyage = {
      id: nouveauId,
      distanceKm: this.genererNombreAleatoire(30, 600, 5),
      consommationPour100Km: this.genererNombreAleatoire(3, 11, 1),
      quantiteCO2: this.genererNombreAleatoire(100, 400, 2)
    };

    // Ajoute le voyage au service
    await this.carbonFootprintComputeService.ajouterVoyage(nouveauVoyage);

    // Recalculer les totaux APRES que les données du service soient mises à jour
    await this.calculerTotalEtMoyenne();
  }


  /* Méthodes · utilitaires */
  private genererNombreAleatoire(min: number, max: number, pas: number): number {
    const paliers = Math.floor((max - min) / pas) + 1;
    return Math.floor(Math.random() * paliers) * pas + min;
  }


  protected tronquerAffichageNombre(nombreDecimal: number): number {
    let nombreTronque: string =  nombreDecimal.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return Number(nombreTronque);
  }
}
