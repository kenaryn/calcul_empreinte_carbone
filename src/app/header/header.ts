import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'eni-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly title: WritableSignal<string> = signal('Calcul de l\'empreinte carbone');
}
