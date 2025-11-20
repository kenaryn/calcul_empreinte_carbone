import { Component, inject } from '@angular/core';
import {UserService} from '../services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'eni-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

    protected userService: UserService = inject(UserService);

    protected title: string = 'calcul-empreinte-carbone';

    login(): void {
      this.userService.login('Ibrahim');
    }
}
