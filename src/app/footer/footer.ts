import { Component, signal, WritableSignal, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VersionService } from '../services/version.service';

@Component({
  selector: 'eni-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly author: WritableSignal<string> = signal('Aurèle');

  // protected readonly creationDate: WritableSignal<string> = signal(new Date('2025-11-17').toLocaleDateString());
  protected readonly creationDate: WritableSignal<Date> = signal(new Date('2025-11-17'));


  private versionService: VersionService = inject(VersionService);
  protected version: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.version.set(this.versionService.version);
  }
}
