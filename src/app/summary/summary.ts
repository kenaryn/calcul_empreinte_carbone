import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CarbonFootprint } from '../carbon-footprint/carbon-footprint';
import {ActivatedRoute, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'eni-summary',
  imports: [
    FormsModule,
    Header,
    Footer,
    CarbonFootprint
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {

  protected router: Router = inject(Router);

  canActivate(route: ActivatedRoute, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/'], { queryParams: { message: 'You shall not pass you bandit!' } })
        .then(() => false)
    }
    return true;
  }

  private isAuthenticated(): boolean {
    return false;
  }
}
