import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  protected readonly _version: WritableSignal<string> = signal('0.1.0');

  public get version(): string {
    return this._version();
  }

  public set version(nouvelleVersion: string) {
    this._version.set(nouvelleVersion);
  }
}
