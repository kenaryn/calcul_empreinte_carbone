import {inject} from '@angular/core';
import {CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const userGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  if (!userService.getUsername()) {
    router.navigate(['/']).then(() => false);
  }

  return true;
};
