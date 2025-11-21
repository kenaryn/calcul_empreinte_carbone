import { Component, inject } from '@angular/core';
import {UserService} from '../services/user.service';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'eni-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

    protected userService: UserService = inject(UserService);

    protected title: string = 'calcul-empreinte-carbone';
    protected identifier: string = '';
    protected password: string = '';
    protected erreurSaisieFormulaire: string = '';
    public error = "";

    // public login(): void {
    //   this.userService.login('Ibrahim');
    // }

    public loginUser(): void {
      this.erreurSaisieFormulaire = '';

      if (this.identifier.length < 3) {
        this.erreurSaisieFormulaire = 'L\'identifiant doit être constitué d\'au moins 3 caractères';
      } else if (this.password.length < 6) {
        this.erreurSaisieFormulaire = 'Le mot de passe doit être constitué d\'au moins 6 caractères';
      } else {
        this.userService.login('Myriam')
      }
    }
}
