import { Routes } from '@angular/router';
import { Summary } from './summary/summary';
import { Home } from './home/home';
import {Profile} from './profile/profile';
import {userGuard} from './guards/user-guard';

export const routes: Routes = [
  /*
   First-match win strategy:
   1. empty path
   2. static, most specific
   3. dynamic
   4. static, less specific
   5. wildcard
   */
  { path: '', component: Home },
  { path: 'profile/:username', component: Profile, canActivate: [userGuard] },
  { path: 'summary', component: Summary, canActivate: [userGuard] }
];
