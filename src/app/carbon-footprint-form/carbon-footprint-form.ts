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
import { FormsModule } from '@angular/forms';
import { TitleCasePipe, SlicePipe } from '@angular/common';
import {UtilisateurService} from '../services/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'eni-carbon-footprint-form',
  imports: [FormsModule, TitleCasePipe, SlicePipe],
  templateUrl: './carbon-footprint-form.html',
  styleUrl: './carbon-footprint-form.css',
})
export class CarbonFootprintForm implements AfterViewInit, OnInit {

  private utilisateurService: UtilisateurService = inject(UtilisateurService);

  protected readonly utilisateur: WritableSignal<{ nom: string }> = signal({ nom: 'Entrez votre nom' });
  protected _utilisateurs: WritableSignal<{ nom: string }[]> = signal([]);

  ngOnInit() {
    // Obtient la donnée sur le nom de l'utilisateur grâce au service initialisé AVANT le présent composant.
    this.utilisateurConnecte();
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
}
