import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private _utilisateurActuel: WritableSignal<string> = signal('');

  public set utilisateurActuel(nomUtilisateur: string) {
    console.info('Service setter utilisateurActuel');
    this._utilisateurActuel.set(nomUtilisateur);
  }

  public get utilisateurActuel(): string {
    console.info('Service getter utilisateurActuel');
    return this._utilisateurActuel();
  }
}
