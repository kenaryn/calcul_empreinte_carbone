import { Component, signal, WritableSignal, inject, OnInit } from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'eni-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  protected userService: UserService = inject(UserService);

  protected nomUtilisateur: string = '';
  protected readonly title: WritableSignal<string> = signal('Calcul de l\'empreinte carbone');

    ngOnInit() : void {
      this.nomUtilisateur =  this.userService.getUsername();
    }
}
