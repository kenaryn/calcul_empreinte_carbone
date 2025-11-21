import {
  Component,
  signal,
  WritableSignal,
  AfterViewInit,
  ElementRef,
  ViewChild,
  inject,
  Injectable,
  OnInit
} from '@angular/core';
import {FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {UtilisateurService} from '../services/utilisateur.service';
import {CarbonFootprintComputeService} from '../services/carbon-footprint-compute.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'eni-carbon-footprint-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.css',
})
export class CarbonFootprintForm implements AfterViewInit, OnInit {

  private utilisateurService: UtilisateurService = inject(UtilisateurService);
  private carbonFootprintComputeService: CarbonFootprintComputeService = inject(CarbonFootprintComputeService);

  protected isVoiture: boolean = false;
  protected readonly utilisateur: WritableSignal<{ nom: string }> = signal({ nom: 'Entrez votre nom' });
  protected _utilisateurs: WritableSignal<{ nom: string }[]> = signal([]);

  protected distanceKm: number = 0;
  protected consommationPour100Km: number = 0;
  protected dateVoyage: Date = new Date(Date.now());
  protected myForm!: FormGroup;

  public onSelectType(event: Event): void {
    const transport: string = (event.target as HTMLSelectElement).value;
    if (transport === 'voiture') {
      this.isVoiture = true;
      this.myForm.get('consommationPour100Km')?.setValidators([Validators.required, Validators.min(3), Validators.max(25)]);
      this.myForm.get('consommationPour100Km')?.updateValueAndValidity();
    } else {
      this.isVoiture = false;
      this.myForm.get('consommationPour100Km')?.clearValidators();
      this.myForm.get('consommationPour100Km')?.updateValueAndValidity();
    }
  }

  /**
   * Ajoute un voyage dans le service CarbonFootprintService
   */
  public ajouterUnVoyage(): void {
    if (this.myForm.valid) {
      // Récupérer le dernier ID pour générer le suivant
      const dernierVoyage = this.carbonFootprintComputeService
        .voyages.reduce((max, v) => Math.max(max, v.id), 0);
      const nouveauId = dernierVoyage + 1;

      this.carbonFootprintComputeService.ajouterVoyage({
        id: nouveauId,
        distanceKm: this.myForm.value.distanceKm,
        consommationPour100Km: this.myForm.value.consommationPour100Km,
        dateVoyage: this.myForm.value.dateVoyage,
        locomotion: this.myForm.value.locomotion
      });

      // réinitialiser le formulaire après l'ajout
      this.myForm.reset();
    } else {
      console.warn('Le formulaire n\'est pas valide');
    }
  }

  ngOnInit() {
    // Obtient la donnée sur le nom de l'utilisateur grâce au service initialisé AVANT le présent composant.
    this.utilisateurConnecte();

    this.myForm = new FormGroup({
      distanceKm: new FormControl(0, [Validators.required, Validators.min(30), Validators.max(600)]),
      consommationPour100Km: new FormControl(0, [Validators.required, Validators.min(3), Validators.max(25)]),
      dateVoyage: new FormControl('', [Validators.required, this.validateDateVoyage]),
      locomotion: new FormControl('', [Validators.required])
      });
  }

  // Initialise une requête de vue enfant pour que le composant puisse référencer un élement du DOM
  @ViewChild('nomInput', { static: false })
  nomInput!: ElementRef<HTMLInputElement>;

  public get nom(): string {
    return this.utilisateur().nom;
  }

  public set nom(nouveauNom: string) {
    this.utilisateur.update(d => ({ ...d, nom: nouveauNom }));
  }

  public reset(): void {
    this.utilisateur.set({ nom: '' });
  }

  public getNomSiNonVide(): string | null {
    const val = this.nom;
    return val && (val.trim().length > 0) ? val : null;
  }

  public isAdmin(): boolean {
    return this.nom.toLowerCase() === 'administrateur';
  }

  public ajouterUtilisateur(): void {
    if (this.getNomSiNonVide()) {
      this._utilisateurs.update(users => ([...users, { nom: this.nom }]));
    }
    this.reset();
    // Assure que focus() soit appelé après le cycle de détection des changements car le DOM n'est pas immédiatement mis à jour après l'appel à `reset()`
    setTimeout(() => {
      if (this.nomInput) {
        this.nomInput?.nativeElement.focus();
      }
    }, 0);

    // this.utilisateur.focus();  // C'est un signal inscriptible, pas un élement du DOM. Il n'a donc pas de méthode `focus()`
  }

  public get utilisateurs(): Array<{ nom: string }> {
    return this._utilisateurs();
  }

  public supprimerUtilisateur(utilisateur: { nom: string }) {
    const idx: number = this.utilisateurs.indexOf(utilisateur);
    if (idx !== -1) {
      this.utilisateurs.splice(idx, 1);
    }
  }

  ngAfterViewInit(): void {
    this.nomInput?.nativeElement.focus();
  }

  public login(): void {
    console.info('Composant login');
    // setter_du_service = getter_du_composant
    this.utilisateurService.utilisateurActuel = this.nom;
  }

  public utilisateurConnecte(): void {
    console.info('Composant utilisateurConnecte');
    /*
    Grâce à la liaison bi-directionnelle, je mets à jour le champ de saisie du formulaire avec le nom de l'utilisateur connecté
     */
    this.nom = this.utilisateurService.utilisateurActuel;
  }

  protected validateDateVoyage(control: AbstractControl) {
    if (control && control.value) {
      const dateDuVoyage = new Date(control.value);
      const today = new Date(Date.now());
      today.setHours(0);

      if (dateDuVoyage <= today) {
        return { beforeToday: true };
      }
    }
    return null;
  }
}
