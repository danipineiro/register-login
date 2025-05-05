import { Routes } from '@angular/router';
import { isLoggedGuard } from '../core/guards/is-logged.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const settingsRoutes: Routes = [
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [isLoggedGuard],
    title: 'Change Password',
  },
];
